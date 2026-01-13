import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          AI-Powered HR, Attendance & Payroll
          <span className="text-primary"> Simplified</span>
        </h1>
        <p className="mt-6 text-textSecondary max-w-2xl mx-auto">
          Manage employees, attendance, leaves, payroll and performance -
          powered by real-time systems and AI Insights.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/auth"
            className="px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-secondary transition"
          >
            Start Free
          </Link>
          <a
            href="#features"
            className="px-6 py-3 rounded-md border border-border text-textPrimary hover:bg-card transition"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
