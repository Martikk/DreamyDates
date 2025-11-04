// src/Pages/MarriageProposal/MarriageProposal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './MarriageProposal.scss';
import StripeCheckout from 'react-stripe-checkout';
import SubmitForm from '../../Component/SubmitForm/SubmitForm';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';

const FALLBACK_IMG =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1762283491/DreamDate/404_kmeiro.svg';

function safeCategories(raw) {
  try {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch {
    return [];
  }
}

function toNumber(x, def = 0) {
  const n = Number(x);
  return Number.isFinite(n) ? n : def;
}

export default function MarriageProposal() {
  const [experiences, setExperiences] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // Публичный ключ Stripe (только клиентский)
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

  useEffect(() => {
    const ac = new AbortController();
    let mounted = true;

    (async () => {
      setLoading(true);
      setErr('');
      try {
        // Бьёмся в прокси-функцию Netlify; бек может сразу фильтровать по категории
        const res = await fetch('/api/experiences?category=marriage%20proposal', {
          signal: ac.signal
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const arr = Array.isArray(data) ? data : [];
        const filtered = arr
          .filter((exp) => {
            const cats = safeCategories(exp?.categories)
              .map((c) => String(c).trim().toLowerCase());
            return cats.includes('marriage proposal'); // резервная фильтрация на клиенте
          })
          .map((exp, i) => {
            const id = exp.id ?? exp._id ?? i;
            const title = exp.title ?? exp.name ?? 'Experience';
            const description = exp.description ?? '';
            const imageUrl = exp.imageUrl ?? exp.img ?? FALLBACK_IMG;
            const price = toNumber(exp.price, 0);
            return { id, title, description, imageUrl, price };
          });

        if (mounted) setExperiences(filtered);
      } catch (e) {
        // В dev из-за StrictMode эффект монт/размонт срабатывает дважды — игнорируем AbortError
        if (e.name !== 'AbortError' && mounted) setErr(e.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      ac.abort();
    };
  }, []);

  const handleToken = async (token, addresses) => {
    // Здесь только клиент. Реальный чардж делай с /.netlify/functions/charge
    console.log('Stripe token:', token, addresses);
    alert('Payment Successful');
  };

  const grid = useMemo(() => {
    if (!experiences.length) {
      return (
        <div className="experiences__empty">
          No experiences in “Marriage proposal” yet.
        </div>
      );
    }

    return (
      <div className="experiences__grid">
        {experiences.map((experience) => (
          <div className="experiences__card" key={String(experience.id)}>
            <Link to={`/experience/${experience.id}`}>
              <img
                src={experience.imageUrl || FALLBACK_IMG}
                alt={experience.title}
                className="experiences__image"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
              />
            </Link>

            <h3 className="experiences__card-title">{experience.title}</h3>
            <p className="experiences__description">{experience.description}</p>

            {publishableKey ? (
              <StripeCheckout
                name="DreamyDates"
                billingAddress
                shippingAddress
                description={`Your total is $${toNumber(experience.price, 0)}`}
                amount={Math.round(toNumber(experience.price, 0) * 100)}
                token={handleToken}
                stripeKey={publishableKey}
              >
                <button className="experiences__price">
                  Price from ${toNumber(experience.price, 0)}
                </button>
              </StripeCheckout>
            ) : (
              <button
                className="experiences__price"
                disabled
                title="Payments temporarily unavailable"
              >
                Price from ${toNumber(experience.price, 0)}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }, [experiences, publishableKey]);

  return (
    <div className="MarriageProposal-page">
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>

      <div className="experiences">
        {isFormVisible && <SubmitForm onClose={() => setFormVisible(false)} />}
        <h2 className="experiences__title">
          Just choose an idea, the rest is our task
        </h2>

        {loading && <div className="experiences__loading">Loading…</div>}
        {err && !loading && (
          <div className="experiences__error">Couldn’t load experiences: {err}</div>
        )}
        {!loading && !err && grid}
      </div>

      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Footer />
      </div>
    </div>
  );
}