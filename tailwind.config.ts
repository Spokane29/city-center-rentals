import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc", /* slate-50 */
        foreground: "#0f172a", /* slate-900 */
        primary: {
          DEFAULT: "#0f172a", /* slate-900 */
          foreground: "#f8fafc", /* slate-50 */
        },
        accent: {
          DEFAULT: "#f59e0b", /* amber-500 */
          foreground: "#0f172a", /* slate-900 */
        },
        muted: {
          DEFAULT: "#64748b", /* slate-500 */
          foreground: "#64748b", /* slate-500 */
        },
        border: "#e2e8f0", /* slate-200 */
      },
    },
  },
  plugins: [],
};
export default config;

