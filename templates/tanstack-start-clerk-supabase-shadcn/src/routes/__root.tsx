/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { ClerkProvider } from "@clerk/tanstack-start";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ThemeProvider } from "~/components/ThemeProvider";
import { StripeProvider } from "~/components/StripeProvider";
import { useAppSelector } from "~/store/hooks";
import { createServerFn } from "@tanstack/react-start";
import * as React from "react";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import { AppBar } from "~/components/AppBar";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary.js";
import { NotFound } from "~/components/NotFound.js";
import { store } from "~/store";
import appCss from "~/styles/app.css?url";
import { handleSuccessfulLogin } from "~/utils/auth";
import { ClerkUserSync } from "~/components/ClerkUserSync";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest()!);

  // Call our function to upsert the user in the database
  if (userId) {
    await handleSuccessfulLogin();
  }

  return {
    userId,
  };
});

// Create a client
const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth();

    return {
      userId,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "hsl(263.4, 70%, 50.4%)", // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
            },
          }}
        >
          <StripeProvider>
            <ClerkUserSync />
            <RootDocument>
              <Outlet />
              <ReactQueryDevtools initialIsOpen={false} />
            </RootDocument>
          </StripeProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // For the initial render
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <html className={mode === "dark" ? "dark" : ""}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <ThemeProvider>
          <AppBar />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Toaster position="top-right" />
          <TanStackRouterDevtools position="bottom-right" />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
