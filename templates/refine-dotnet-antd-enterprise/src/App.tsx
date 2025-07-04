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
                resources={[
                  {
                    name: "dashboard",
                    list: "/dashboard",
                    meta: {
                      label: "Dashboard",
                      icon: <AppIcon />,
                    },
                  },
                  {
                    name: "products",
                    list: "/products",
                    create: "/products/create",
                    edit: "/products/edit/:id",
                    show: "/products/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "orders",
                    list: "/orders",
                    create: "/orders/create",
                    edit: "/orders/edit/:id",
                    show: "/orders/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "customers",
                    list: "/customers",
                    create: "/customers/create",
                    edit: "/customers/edit/:id",
                    show: "/customers/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "analytics",
                    list: "/analytics",
                    meta: {
                      label: "Analytics",
                    },
                  },
                  {
                    name: "blog_posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
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
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/products">
                      <Route index element={<ProductList />} />
                      <Route path="create" element={<ProductCreate />} />
                      <Route path="edit/:id" element={<ProductEdit />} />
                      <Route path="show/:id" element={<ProductShow />} />
                    </Route>
                    <Route path="/orders">
                      <Route index element={<OrderList />} />
                      <Route path="create" element={<OrderCreate />} />
                      <Route path="edit/:id" element={<OrderEdit />} />
                      <Route path="show/:id" element={<OrderShow />} />
                    </Route>
                    <Route path="/customers">
                      <Route index element={<CustomerList />} />
                      <Route path="create" element={<CustomerCreate />} />
                      <Route path="edit/:id" element={<CustomerEdit />} />
                      <Route path="show/:id" element={<CustomerShow />} />
                    </Route>
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
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
