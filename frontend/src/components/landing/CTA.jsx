import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Build smarter HR systems with AI</h2>
        <Link
          to="/auth"
          className="inline-block mt-6 px-6 py-3 bg-white text-primary rounded-md font-medium"
        >
          Start Now
        </Link>
      </div>
    </section>
  );
}

export default CTA;
