/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",     // azul principal
        secondary: "#FACC15",   // amarillo o contraste
        background: "#F3F4F6",  // gris claro para fondo general
        footer: "#111827",      // fondo de footer
      },
    },
  },
  plugins: [],
};
