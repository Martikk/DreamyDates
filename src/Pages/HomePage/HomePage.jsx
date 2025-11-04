import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "../../Component/Nav";
import Footer from "../../Component/Footer";
import "./HomePage.scss";
import homeImage from "../../Assets/Home.jpg";
import Experiences from "../../Component/Experiences/Experiences";
import CategoryCards from "../../Component/CategoryCards/CategoryCards";
import HowWeWork from "../../Component/HowWeWork/HowWeWork";
import SubmitForm from "../../Component/SubmitForm/SubmitForm";
import Reviews from "../../Component/Reviews/Reviews";

function HomePage() {
  const [isFormVisible, setFormVisible] = useState(false);

  // один раз генерим "дождь", чтобы не прыгал от ререндера
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
      })),
    []
  );

  const handleFormOpen = () => setFormVisible(true);
  const handleFormClose = () => setFormVisible(false);

  const siteUrl = "https://dreamydates.ca";
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dreamy Dates",
    "url": siteUrl,
    "logo": `${siteUrl}/Logo.png`,
    "sameAs": [
      // добавь свои соцсети при наличии
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+1-236-788-9784",
      "contactType": "customer service",
      "areaServed": "CA",
      "availableLanguage": ["en"]
    }]
  };

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dreamy Dates",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="HomePage">
      <Helmet>
        <title>Dreamy Dates — Romantic Dates & Proposals in Vancouver</title>
        <meta
          name="description"
          content="Curated romantic experiences, proposals and surprises across Vancouver. We plan — you enjoy."
        />
        <link rel="canonical" href={siteUrl} />

        {/* Preload hero image */}
        <link rel="preload" as="image" href={homeImage} imagesrcset="" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dreamy Dates — Romantic Dates & Proposals in Vancouver" />
        <meta property="og:description" content="Curated romantic experiences, proposals and surprises across Vancouver." />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/Logo.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dreamy Dates — Romantic Dates & Proposals in Vancouver" />
        <meta name="twitter:description" content="Curated romantic experiences, proposals and surprises across Vancouver." />
        <meta name="twitter:image" content={`${siteUrl}/Logo.png`} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
        <script type="application/ld+json">{JSON.stringify(webSiteLd)}</script>
      </Helmet>

      {isFormVisible && <SubmitForm onClose={handleFormClose} />}

      <div className="HomePage__bacground-nav">
        <div
          className="HomePage__background w-full h-screen bg-center bg-cover"
          style={{ backgroundImage: `url(${homeImage})` }}
          role="img"
          aria-label="Romantic Vancouver skyline background"
        >
          <div className="backdrop-blur-sm p-4 z-10 relative">
            <Nav />
          </div>
        </div>

        {/* Hero блок с H1 и кликабельным телефоном */}
        <section className="HomePage_one" aria-labelledby="homepage-heading">
          <h1 id="homepage-heading" className="sr-only">
            Dreamy Dates — curated romantic experiences in Vancouver
          </h1>

          <p className="HomePage_phone">
            <a href="tel:+12367889784" rel="nofollow noopener">+1 (236) 788-9784</a>
          </p>

          <div className="HomePage_buttonSection">
            <button
              className="btn"
              type="button"
              onClick={handleFormOpen}
              aria-label="Request a callback"
            >
              <strong>Order the call</strong>
              <div id="container-stars"><div id="stars" /></div>
              <div id="glow"><div className="circle" /><div className="circle" /></div>
            </button>

            <ul className="HomePage_right">
              <li className="HomePage_right-logo" aria-hidden="true"></li>
              <li className="HomePage_right-text">
                <p>
                  With DreamyDates love becomes magical. Create your perfect romantic moments with us!
                </p>
              </li>
            </ul>
          </div>
        </section>

        <div className="HomePage__rain" aria-hidden="true">
          {rainDrops.map(d => (
            <div
              key={d.id}
              className="rain-drop"
              style={{ left: d.left, animationDelay: d.delay }}
            />
          ))}
        </div>
      </div>

      <CategoryCards />
      <Experiences />

      <div className="footer-part">
        <Reviews />
        <HowWeWork />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;