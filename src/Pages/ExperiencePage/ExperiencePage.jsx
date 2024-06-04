import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';
import StripeCheckout from 'react-stripe-checkout';
import SubmitForm from '../../Component/SubmitForm/SubmitForm';
import './ExperiencePage.scss';

const ExperiencePage = () => {
  const { id } = useParams(); // Get the experience ID from the URL parameters
  const [experienceData, setExperienceData] = useState({ // Initialize state to store experience data
    experience: null,
    socialLinks: [],
    contactInfo: []
  });
  const [isFormVisible, setFormVisible] = useState(false); // State to manage the visibility of the form

  useEffect(() => { // Fetch experience data when the component mounts or the ID changes
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(`${apiUrl}/experiences/${id}`, {
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data); // Log the fetched data
        setExperienceData(data); // Update the state with the fetched data
      })
      .catch(error => console.error('Error fetching experience:', error)); // Log any errors
  }, [id]);

  const handleToken = token => { // Handle the Stripe payment token
    console.log(token);
    alert('Payment Successful'); // Show a success message
  };

  const handleFormOpen = () => { // Open the form
    setFormVisible(true);
  };

  const handleFormClose = () => { // Close the form
    setFormVisible(false);
  };

  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY; // Stripe publishable key from environment variables

  if (!experienceData.experience) { // Show loading message if experience data is not yet loaded
    return <div>Loading...</div>;
  }

  const { experience, socialLinks, contactInfo } = experienceData; // Destructure data from state
  const priceForStripe = experience.price * 100; // Convert price to cents for Stripe

  return (
    <div className="ExperiencePage">
      {isFormVisible && <SubmitForm onClose={handleFormClose} />}
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>
      <div className="product-card">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="product-card__image"
        />
        <h1 className="product-card__title">{experience.title}</h1>
        <div className="product-card__description">
          <h2>Description:</h2>
          <p>{experience.description}</p>
        </div>
        <div className="product-card__included">
          <h2>What's Included:</h2>
          <ul>
            {experience.included.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="product-card__extras">
          <h2>Extras:</h2>
          <ul>
            {experience.extras.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="product-card__location">
          <h2>Location:</h2>
          <p>{experience.location}</p>
        </div>
        <div className="product-card__price">
          <h2>Price:</h2>
          <p>From ${experience.price}</p>
        </div>
        <div className="product-card__booking">
          <h2>How to Book:</h2>
          <p>{experience.booking}</p>
        </div>
        <StripeCheckout
          label='Order'
          name='DreamyDates'
          billingAddress
          shippingAddress
          description={`Your total is $${experience.price}`}
          amount={priceForStripe}
          token={handleToken}
          stripeKey={publishableKey}
        >
          <button className="product-card__order-button">Order</button>
        </StripeCheckout>
      </div>
      <div className="gallery">
        <h2 className="gallery__title">GALLERY</h2>
        <div className="gallery__grid">
          {experience.images.slice(0, 6).map((image, index) => (
            <div key={index} className="gallery__item">
              <img src={image} alt={`Gallery item ${index + 1}`} className="gallery__image" />
            </div>
          ))}
        </div>
        {experience.images.length > 6 && (
          <button className="gallery__button">MORE PHOTO</button>
        )}
      </div>
      <div className="video-gallery">
        <h2 className="video-gallery__title">VIDEO</h2>
        <div className="video-gallery__grid">
          {experience.videos.map((video, index) => (
            <div key={index} className="video-gallery__item">
              <iframe
                className="video-gallery__iframe"
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Video ${index + 1}`}
              ></iframe>
            </div>
          ))}
        </div>
        <button className="video-gallery__button">MORE VIDEO</button>
      </div>
      <div className="info-card">
        <div className="info-card__section">
          <h2>{experience.title}</h2>
          <p><strong>This Month price:</strong> {experience.details.thisMonthPrice}</p>
          <p><strong>Ordered:</strong> {experience.details.ordered} times</p>
          <p><strong>Duration:</strong> {experience.details.duration}</p>
          <p>{experience.details.note}</p>
          <StripeCheckout
            name="DreamyDates"
            billingAddress
            shippingAddress
            description={`Your total is $${experience.price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={handleToken}
            stripeKey={publishableKey}
          >
            <button className="info-card__order-button">Order</button>
          </StripeCheckout>
        </div>
        <div className="info-card__social">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.href}>
              <img src={link.imgSrc} alt={link.alt} />
            </a>
          ))}
        </div>
        <div className="info-card__section-order">
          <h2>Need free consultation?</h2>
          <p>We’ll be glad to answer all arising questions!</p>
          {contactInfo.map((contact, index) => (
            <p key={index}><strong>{contact.value}</strong></p>
          ))}
          <button className="info-card__order-button" onClick={handleFormOpen}>Order</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
