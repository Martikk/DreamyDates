// netlify/functions/api.js
/* eslint-disable */
const BASE = process.env.BACKEND_BASE_URL; // например: https://your-backend.tld
const KEY  = process.env.BACKEND_API_KEY;  // секрет хранится только в функциях

const CORS = {
  'Access-Control-Allow-Origin': '*', // при необходимости сузить домен
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key, Authorization'
};

exports.handler = async (event) => {
  try {
    // 1) CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers: CORS, body: '' };
    }

    if (!BASE) {
      return {
        statusCode: 500,
        headers: CORS,
        body: JSON.stringify({ error: 'Missing BACKEND_BASE_URL env' })
      };
    }

    // 2) Нормализуем путь
    // /api/xxx (после редиректа станет /.netlify/functions/api/xxx)
    let incomingPath = event.path || '/';
    incomingPath = incomingPath
      .replace(/^\/\.netlify\/functions\/api/, '') // когда запрос уже в функцию
      .replace(/^\/api/, '');                      // когда зовём напрямую /api/...

    if (!incomingPath.startsWith('/')) incomingPath = `/${incomingPath}`;

    // 3) Собираем querystring
    let qs = '';
    if (event.rawQuery && event.rawQuery.length) {
      qs = `?${event.rawQuery}`;
    } else if (event.queryStringParameters && Object.keys(event.queryStringParameters).length) {
      const u = new URL('http://d'); // фиктивный URL ради URLSearchParams
      for (const [k, v] of Object.entries(event.queryStringParameters)) {
        if (typeof v !== 'undefined' && v !== null) u.searchParams.append(k, String(v));
      }
      qs = u.search; // включает ведущий '?'
    }

    const url = `${BASE}${incomingPath}${qs}`;

    // 4) Заголовки к апстриму
    const upstreamHeaders = new Headers();
    // прокидываем content-type если есть
    if (event.headers && event.headers['content-type']) {
      upstreamHeaders.set('content-type', event.headers['content-type']);
    } else {
      upstreamHeaders.set('content-type', 'application/json');
    }
    // наш секрет
    if (KEY) upstreamHeaders.set('x-api-key', KEY);

    // 5) Тело только для методов с телом
    const hasBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(event.httpMethod);
    const body = hasBody && event.body ? event.body : undefined;

    // 6) Запрос к бэкенду
    const res = await fetch(url, {
      method: event.httpMethod || 'GET',
      headers: upstreamHeaders,
      body
    });

    const contentType = res.headers.get('content-type') || 'application/json';
    const text = await res.text();

    // 7) Если не OK — возвращаем тело как есть + статус
    const baseHeaders = { ...CORS, 'content-type': contentType };

    return {
      statusCode: res.status,
      headers: baseHeaders,
      body: text
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: CORS,
      body: JSON.stringify({ error: 'Proxy failed', detail: String(e) })
    };
  }
};