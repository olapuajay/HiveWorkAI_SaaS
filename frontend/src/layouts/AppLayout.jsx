import React from "react";
import AppHeader from "../components/header/AppHeader";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <AppHeader />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
