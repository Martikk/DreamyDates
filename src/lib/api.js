import axios from "axios";
import { API_BASE_URL, API_KEY } from "./env";

export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  if (API_KEY) config.headers["x-api-key"] = API_KEY;
  return config;
});

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}
export async function getExperiences() {
  const { data } = await api.get("/experiences");
  return data;
}
export async function getReviews() {
  const { data } = await api.get("/reviews");
  return data;
}