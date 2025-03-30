import React from "react";
import { Route } from "react-router";
import {
  ApiKeyList,
  ApiKeyCreate,
  ApiKeyEdit,
  ApiKeyShow,
} from "../pages/api-key";
import { ProductCreate, ProductEdit, ProductShow } from "../pages/products";

export const AutoGenRoutes: React.FC = () => {
  return (
    <>
      <Route path="/api-key">
        <Route index element={<ApiKeyList />} />
        <Route path="create" element={<ApiKeyCreate />} />
        <Route path="edit/:id" element={<ApiKeyEdit />} />
        <Route path="show/:id" element={<ApiKeyShow />} />
      </Route>
    </>
  );
};
