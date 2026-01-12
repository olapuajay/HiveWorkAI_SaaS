import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";

import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Landing />{" "}
            </PublicLayout>
          }
        />

        <Route
          path="/auth"
          element={
            <PublicLayout>
              <Auth />
            </PublicLayout>
          }
        />

        <Route
          path="/app"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
