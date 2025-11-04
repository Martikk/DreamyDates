// netlify/functions/sitemap.js
export async function handler() {
  const base = 'https://dreamydates.ca';
  // серверный доступ к бэку: ключ берём из env на Netlify (НЕ из REACT_APP_*)
  const API = process.env.BACKEND_BASE_URL;       // https://dreamydates-....herokuapp.com
  const KEY = process.env.BACKEND_API_KEY;

  let experiences = [];
  try {
    const res = await fetch(`${API}/experiences`, { headers: { 'x-api-key': KEY }});
    experiences = res.ok ? await res.json() : [];
  } catch { /* ignore */ }

  const staticUrls = [
    '/', '/dates', '/marriage-proposal', '/surprises', '/flowers', '/contact-us'
  ];

  const urls = [
    ...staticUrls.map(u => `<url><loc>${base}${u}</loc></url>`),
    ...experiences.map(e => `<url><loc>${base}/experience/${e.id}</loc></url>`)
  ].join('');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    body: xml
  };
}