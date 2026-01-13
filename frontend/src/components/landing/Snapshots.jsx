import React from "react";

function Snapshots() {
  return (
    <section className="bg-bg py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">
          A glance inside the platform
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-textSecondary"
            >
              Dashboard Preview
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Snapshots;
