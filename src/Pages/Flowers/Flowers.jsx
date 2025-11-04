// src/Pages/Flowers/Flowers.jsx
import React, { useEffect, useMemo, useState } from 'react';
import './Flowers.scss';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';
import StripeCheckout from 'react-stripe-checkout';

const FALLBACK_IMG =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1762283491/DreamDate/404_kmeiro.svg';

function toNumber(x, def = 0) {
  const n = Number(x);
  return Number.isFinite(n) ? n : def;
}

export default function Flowers() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  // Паблик-ключ Stripe можно хранить на клиенте
  const publishableKey =
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      setLoading(true);
      setErr('');
      try {
        // ВАЖНО: только через прокси, без прямых URL и ключей
        const res = await fetch('/api/flowers', { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const arr = Array.isArray(data) ? data : [];

        // Нормализуем поля, чтобы фронт не зависел от имен в БД
        const normalized = arr.map((f, i) => {
          const id = f.id ?? f._id ?? i;
          const name = f.name ?? f.title ?? 'Flower';
          const img = f.img ?? f.imageUrl ?? FALLBACK_IMG;
          const price = toNumber(f.price, 0);
          const rating = toNumber(f.rating, 5);
          const reviews = toNumber(f.reviews, 0);
          return { id, name, img, price, rating, reviews };
        });

        setItems(normalized);
      } catch (e) {
        if (e.name !== 'AbortError') setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  const handleToken = (token, addresses) => {
    // TODO: отправить token на свой бек для charge/payment-intent
    console.log('Stripe token:', token, addresses);
    alert('Payment Successful');
  };

  const list = useMemo(() => (
    <div className="flowers__list">
      {items.map((flower) => (
        <div key={flower.id} className="flower-card">
          <div className="flower-card__img">
            <img src={flower.img || FALLBACK_IMG} alt={flower.name} loading="lazy" />
          </div>

          <h3 className="flower-card__name">{flower.name}</h3>

          <p className="flower-card__rating">
            <span className="flower-card__rating-star">★</span>
            {flower.rating} ({flower.reviews} reviews)
          </p>

          <p className="flower-card__price">${flower.price}</p>

          {publishableKey ? (
            <StripeCheckout
              name="DreamyDates"
              billingAddress
              shippingAddress
              description={`Your total is $${flower.price}`}
              amount={Math.round(toNumber(flower.price, 0) * 100)}
              panelLabel="Pay Now"
              token={handleToken}
              stripeKey={publishableKey}
            >
              <button className="flower-card__button">Buy</button>
            </StripeCheckout>
          ) : (
            <button
              className="flower-card__button"
              disabled
              title="Payments temporarily unavailable"
            >
              Buy
            </button>
          )}
        </div>
      ))}
    </div>
  ), [items, publishableKey]);

  return (
    <div className="flowers-page">
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>

      <div className="flowers">
        <h2 className="flowers__title">Flowers</h2>

        {loading && <div className="flowers__loading">Loading…</div>}
        {err && !loading && <div className="flowers__error">Error: {err}</div>}
        {!loading && !err && list}
      </div>

      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Footer />
      </div>
    </div>
  );
}