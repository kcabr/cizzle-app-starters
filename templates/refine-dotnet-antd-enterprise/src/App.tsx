import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "./pages/products";
import { OrderCreate, OrderEdit, OrderList, OrderShow } from "./pages/orders";
import {
  CustomerCreate,
  CustomerEdit,
  CustomerList,
  CustomerShow,
} from "./pages/customers";
import { Dashboard } from "./pages/dashboard";
import { Analytics } from "./pages/analytics";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import resourcesJson from "./refine-resources.autogen.json";
import { useMemo } from "react";
/* IMPORT AUTOGEN START HERE */
import {
  ApiKeyList,
  ApiKeyCreate,
  ApiKeyEdit,
  ApiKeyShow,
} from "./pages/api-key";
import { HomeList, HomeCreate, HomeEdit, HomeShow } from "./pages/home";
/* IMPORT AUTOGEN END HERE */

// Static menu Resources here
const staticResources = [
  // {
  //   name: "home",
  //   list: "/home",
  //   meta: {
  //     label: "Home",
  //     icon: <AppIcon />,
  //   },
  // },
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      label: "Dashboard",
      icon: <AppIcon />,
    },
  },
];

function App() {
  // Merge static and dynamic resources, with static resources taking precedence
  const resources = useMemo(
    () =>
      // Combine arrays (static first, then dynamic) and transform icons
      [
        ...staticResources,
        ...(Array.isArray(resourcesJson) ? resourcesJson : []),
      ],
    []
  );

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("/api/crud")}
                notificationProvider={useNotificationProvider}
                //authProvider={authProvider}
                routerProvider={routerBindings}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "hw1HtQ-7V927x-gmUcR6",
                  title: { text: "XDent Admin Portal", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="dashboard" />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    {/* ROUTE AUTOGEN START HERE */}
                    <Route path="/api-key">
                      <Route index element={<ApiKeyList />} />
                      <Route path="create" element={<ApiKeyCreate />} />
                      <Route path="edit/:id" element={<ApiKeyEdit />} />
                      <Route path="show/:id" element={<ApiKeyShow />} />
                    </Route>
                    <Route path="/home">
                      <Route index element={<HomeList />} />
                      <Route path="create" element={<HomeCreate />} />
                      <Route path="edit/:id" element={<HomeEdit />} />
                      <Route path="show/:id" element={<HomeShow />} />
                    </Route>
                    {/* ROUTE AUTOGEN END HERE */}
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
