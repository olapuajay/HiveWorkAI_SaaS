import React from "react";
import { Link } from "react-router-dom";

function PublicHeader() {
  return (
    <header className="w-full border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">HiveWorkAI</h1>

        <nav className="hidden md:flex gap-6 text-sm text-textSecondary">
          <a href="#features" className="hover:text-primary">
            Features
          </a>
          <a href="#pricing" className="hover:text-primary">
            Pricing
          </a>
          <Link to="/auth" className="hover:text-primary">
            Login
          </Link>
        </nav>

        <Link
          to="/auth"
          className="text-sm py-2 px-4 rounded-md bg-primary text-white hover:bg-secondary transition"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default PublicHeader;
