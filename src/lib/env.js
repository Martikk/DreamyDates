// src/lib/env.js
const url = process.env.REACT_APP_API_URL;
const key = process.env.REACT_APP_API_KEY;

if (!url) throw new Error("API base URL is missing. Set REACT_APP_API_URL.");
if (!key) throw new Error("API key is missing. Set REACT_APP_API_KEY.");

export const API_BASE_URL = url.replace(/\/+$/,''); // без хвостового слеша
export const API_KEY = key;