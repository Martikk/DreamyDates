// src/lib/api.js
const base = '/api'; // идём через Netlify Function прокси

export async function getCategories() {
  const res = await fetch(`${base}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getExperiences() {
  const res = await fetch(`${base}/experiences`);
  if (!res.ok) throw new Error('Failed to fetch experiences');
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${base}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}