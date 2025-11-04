// netlify/functions/api.js
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args))

const BASE = process.env.BACKEND_BASE_URL // <-- задать в Netlify env
const KEY  = process.env.BACKEND_API_KEY  // <-- задать в Netlify env

exports.handler = async (event) => {
  try {
    const path = event.path.replace(/^\/api/, '') || '/'
    const url = `${BASE}${path}${event.rawQuery ? `?${event.rawQuery}` : ''}`

    const res = await fetch(url, {
      method: event.httpMethod,
      headers: {
        'x-api-key': KEY,
        'content-type': 'application/json'
      },
      body: ['POST','PUT','PATCH','DELETE'].includes(event.httpMethod) ? event.body : undefined
    })

    const text = await res.text()
    return {
      statusCode: res.status,
      headers: { 'content-type': res.headers.get('content-type') || 'application/json' },
      body: text
    }
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Proxy failed', detail: String(e) }) }
  }
}