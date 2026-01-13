import React from "react";
import {
  Building2,
  Clock,
  CheckCircle,
  Receipt,
  Bot,
  Bell,
} from "lucide-react";

const features = [
  {
    title: "Multi-Tenant SaaS Architecture",
    icon: Building2,
  },
  {
    title: "Real-Time Attendance Tracking",
    icon: Clock,
  },
  {
    title: "Leave Approval Workflow",
    icon: CheckCircle,
  },
  {
    title: "Payroll & Payslip Generation",
    icon: Receipt,
  },
  {
    title: "AI-Powered HR Assistant",
    icon: Bot,
  },
  {
    title: "Live Notifications & Insights",
    icon: Bell,
  },
];

function Features() {
  return (
    <section id="features" className="bg-card py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">
          Everything your HR team needs
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={i}
                className="p-6 border border-border rounded-lg hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="mt-3 text-sm text-textSecondary">
                  Designed for modern organizations with scalability and
                  clarity.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
