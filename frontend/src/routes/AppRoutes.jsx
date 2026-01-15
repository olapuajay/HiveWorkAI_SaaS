import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";

import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";
import { connectSocket } from "../app/socket";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : window.location.assign("auth");
}

function AppRoutes() {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      connectSocket(token);
    }
  }, [token]);

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
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
