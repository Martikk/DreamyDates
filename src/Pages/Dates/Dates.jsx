// src/Pages/Dates/Dates.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dates.scss';
import StripeCheckout from 'react-stripe-checkout';
import SubmitForm from '../../Component/SubmitForm/SubmitForm';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';

function safeParseCategories(raw) {
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

export default function Dates() {
  const [experiences, setExperiences] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // ✅ CRA-совместимо: без import.meta
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

  useEffect(() => {
    const ac = new AbortController();
    const load = async () => {
      setLoading(true);
      setErr('');
      try {
        // /api/* → перекидывается в /.netlify/functions/api по netlify.toml
        const res = await fetch('/api/experiences', { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const filtered = (Array.isArray(data) ? data : []).filter((exp) => {
          const cats = safeParseCategories(exp?.categories);
          return cats.map((c) => String(c).toLowerCase()).includes('dates');
        });

        setExperiences(filtered);
      } catch (e) {
        if (e.name !== 'AbortError') setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => ac.abort();
  }, []);

  const handleToken = (token, addresses) => {
    console.log('Stripe token:', token, addresses);
    alert('Payment Successful'); // TODO: заменить на реальный backend вызов
  };

  const grid = useMemo(() => (
    <div className="experiences__grid">
      {experiences.map((experience) => (
        <div className="experiences__card" key={experience.id ?? experience.title}>
          <Link to={`/experience/${experience.id}`}>
            <img
              src={experience.imageUrl}
              alt={experience.title}
              className="experiences__image"
              loading="lazy"
            />
          </Link>
          <h3 className="experiences__card-title">{experience.title}</h3>
          <p className="experiences__description">{experience.description}</p>

          {publishableKey ? (
            <StripeCheckout
              name="DreamyDates"
              billingAddress
              shippingAddress
              description={`Your total is $${experience.price}`}
              amount={Number(experience.price) * 100}
              token={handleToken}
              stripeKey={publishableKey}
            >
              <button className="experiences__price">
                Price from ${experience.price}
              </button>
            </StripeCheckout>
          ) : (
            <button className="experiences__price" disabled title="Payment temporarily unavailable">
              Price from ${experience.price}
            </button>
          )}
        </div>
      ))}
    </div>
  ), [experiences, publishableKey]);

  return (
    <div className="Dates-page">
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