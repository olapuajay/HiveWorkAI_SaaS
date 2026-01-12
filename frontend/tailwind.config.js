/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#6366F1",
        accent: "#22C55E",
        danger: "#EF4444",
        warning: "#F59E0B",
        bg: "#F9FAFB",
        card: "#FFFFFF",
        border: "#E5E7EB",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
      },
    },
  },
  plugins: [],
};


