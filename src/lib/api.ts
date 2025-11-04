import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) throw new Error("VITE_API_BASE_URL is not set");

const client = axios.create({ baseURL });

// Optionally attach key if you keep auth for public GETs
client.interceptors.request.use((config) => {
  const key = import.meta.env.VITE_API_KEY;
  if (key) config.headers["x-api-key"] = key;
  return config;
});

export const getCategories = async () => (await client.get("/categories")).data;
export const getExperiences = async () => (await client.get("/experiences")).data;
export const getReviews = async () => (await client.get("/reviews")).data;