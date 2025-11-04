// src/Pages/ExperiencePage/ExperiencePage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';
import StripeCheckout from 'react-stripe-checkout';
import SubmitForm from '../../Component/SubmitForm/SubmitForm';
import './ExperiencePage.scss';

const FALLBACK_IMG =
  'https://res.cloudinary.com/dzytbkc5l/image/upload/v1762283491/DreamDate/404_kmeiro.svg';

const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

function toNumber(x, def = 0) {
  const n = Number(x);
  return Number.isFinite(n) ? n : def;
}

function safeArray(v) {
  try {
    if (Array.isArray(v)) return v;
    if (typeof v === 'string') {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch {
    return [];
  }
}

export default function ExperiencePage() {
  const { id } = useParams();
  const [isFormVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [exp, setExp] = useState(null);
  const [socialLinks, setSocial] = useState([]);
  const [contactInfo, setContacts] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setErr('');
      try {
        // идём через Netlify Functions
        const res = await fetch(`/api/experiences/${id}`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // сервер может вернуть как {experience, ...} так и сам объект
        const e = data.experience ?? data;

        const normalized = {
          id: e.id ?? e._id ?? id,
          title: e.title ?? e.name ?? 'Experience',
          description: e.description ?? '',
          imageUrl: e.imageUrl ?? e.img ?? FALLBACK_IMG,
          included: safeArray(e.included),
          extras: safeArray(e.extras),
          location: e.location ?? '',
          price: toNumber(e.price, 0),
          booking: e.booking ?? '',
          images: safeArray(e.images),
          videos: safeArray(e.videos),
          details: {
            thisMonthPrice: e?.details?.thisMonthPrice ?? '',
            ordered: e?.details?.ordered ?? '',
            duration: e?.details?.duration ?? '',
            note: e?.details?.note ?? ''
          }
        };

        setExp(normalized);
        setSocial(safeArray(data.socialLinks ?? e.socialLinks));
        setContacts(safeArray(data.contactInfo ?? e.contactInfo));
      } catch (e) {
        if (e.name !== 'AbortError') setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [id]);

  const priceCents = useMemo(() => Math.round(toNumber(exp?.price, 0) * 100), [exp]);

  const handleToken = (token) => {
    console.log('Stripe token:', token);
    alert('Payment Successful'); // подключишь серверный charge позднее
  };

  if (loading) return <div className="xp-loading">Loading…</div>;
  if (err) return <div className="xp-error">Couldn’t load: {err}</div>;
  if (!exp) return <div className="xp-error">Experience not found</div>;

  return (
    <div className="ExperiencePage">
      {isFormVisible && <SubmitForm onClose={() => setFormVisible(false)} />}

      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>

      <div className="product-card">
        <img
          src={exp.imageUrl}
          alt={exp.title}
          className="product-card__image"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
        />
        <h1 className="product-card__title">{exp.title}</h1>

        <div className="product-card__description">
          <h2>Description:</h2>
          <p>{exp.description}</p>
        </div>

        {exp.included.length > 0 && (
          <div className="product-card__included">
            <h2>What's Included:</h2>
            <ul>{exp.included.map((it, i) => <li key={i}>{String(it)}</li>)}</ul>
          </div>
        )}

        {exp.extras.length > 0 && (
          <div className="product-card__extras">
            <h2>Extras:</h2>
            <ul>{exp.extras.map((it, i) => <li key={i}>{String(it)}</li>)}</ul>
          </div>
        )}

        {exp.location && (
          <div className="product-card__location">
            <h2>Location:</h2>
            <p>{exp.location}</p>
          </div>
        )}

        <div className="product-card__price">
          <h2>Price:</h2>
          <p>From ${toNumber(exp.price, 0)}</p>
        </div>

        {exp.booking && (
          <div className="product-card__booking">
            <h2>How to Book:</h2>
            <p>{exp.booking}</p>
          </div>
        )}

        {publishableKey ? (
          <StripeCheckout
            label="Order"
            name="DreamyDates"
            billingAddress
            shippingAddress
            description={`Your total is $${toNumber(exp.price, 0)}`}
            amount={priceCents}
            token={handleToken}
            stripeKey={publishableKey}
          >
            <button className="product-card__order-button">Order</button>
          </StripeCheckout>
        ) : (
          <button className="product-card__order-button" disabled title="Payments unavailable">
            Order
          </button>
        )}
      </div>

      {exp.images.length > 0 && (
        <div className="gallery">
          <h2 className="gallery__title">GALLERY</h2>
          <div className="gallery__grid">
            {exp.images.slice(0, 6).map((src, i) => (
              <div key={i} className="gallery__item">
                <img
                  src={src}
                  alt={`Gallery item ${i + 1}`}
                  className="gallery__image"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                />
              </div>
            ))}
          </div>
          {exp.images.length > 6 && (
            <button className="gallery__button">MORE PHOTO</button>
          )}
        </div>
      )}

      {exp.videos.length > 0 && (
        <div className="video-gallery">
          <h2 className="video-gallery__title">VIDEO</h2>
          <div className="video-gallery__grid">
            {exp.videos.map((url, i) => (
              <div key={i} className="video-gallery__item">
                <iframe
                  className="video-gallery__iframe"
                  src={url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Video ${i + 1}`}
                />
              </div>
            ))}
          </div>
          <button className="video-gallery__button">MORE VIDEO</button>
        </div>
      )}

      <div className="info-card">
        <div className="info-card__section">
          <h2>{exp.title}</h2>
          {exp.details.thisMonthPrice && (
            <p><strong>This Month price:</strong> {exp.details.thisMonthPrice}</p>
          )}
          {exp.details.ordered && (
            <p><strong>Ordered:</strong> {exp.details.ordered} times</p>
          )}
          {exp.details.duration && (
            <p><strong>Duration:</strong> {exp.details.duration}</p>
          )}
          {exp.details.note && <p>{exp.details.note}</p>}

          {publishableKey ? (
            <StripeCheckout
              name="DreamyDates"
              billingAddress
              shippingAddress
              description={`Your total is $${toNumber(exp.price, 0)}`}
              amount={priceCents}
              panelLabel="Pay Now"
              token={handleToken}
              stripeKey={publishableKey}
            >
              <button className="info-card__order-button">Order</button>
            </StripeCheckout>
          ) : (
            <button className="info-card__order-button" disabled>
              Order
            </button>
          )}
        </div>

        {socialLinks.length > 0 && (
          <div className="info-card__social">
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer">
                <img src={s.imgSrc} alt={s.alt || 'social'} />
              </a>
            ))}
          </div>
        )}

        <div className="info-card__section-order">
          <h2>Need free consultation?</h2>
          <p>We’ll be glad to answer all arising questions!</p>
          {contactInfo.length > 0 &&
            contactInfo.map((c, i) => <p key={i}><strong>{c.value}</strong></p>)}
          <button className="info-card__order-button" onClick={() => setFormVisible(true)}>
            Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}