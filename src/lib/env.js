// Works with CRA or Vite
const isVite = typeof import.meta !== "undefined" && import.meta.env;
export const API_BASE_URL = (isVite ? import.meta.env.VITE_API_BASE_URL : process.env.REACT_APP_API_URL) || "";
export const API_KEY      = (isVite ? import.meta.env.VITE_API_KEY      : process.env.REACT_APP_API_KEY) || "";

if (!API_BASE_URL) {
  // Don’t crash the app, but make the problem obvious in console
  console.error("API base URL is missing. Set REACT_APP_API_URL (CRA) or VITE_API_BASE_URL (Vite).");
}