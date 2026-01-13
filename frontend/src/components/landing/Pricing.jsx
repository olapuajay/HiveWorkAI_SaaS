import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section id="pricing" className="bg-card py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Simple Pricing</h2>
        <p className="mt-2 text-textSecondary">
          No hidden costs. Scales with your team.
        </p>

        <div className="mt-12 max-w-md mx-auto p-8 border rounded-lg">
          <h3 className="text-xl font-semibold">Starter</h3>
          <p className="mt-4 text-4xl font-bold">₹0</p>
          <p className="text-sm text-textSecondary mt-2">
            Perfect for early teams & demos
          </p>

          <Link
            to="/auth"
            className="block mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
