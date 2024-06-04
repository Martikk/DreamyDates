import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Experiences.scss';
import StripeCheckout from 'react-stripe-checkout';
import SubmitForm from '../SubmitForm/SubmitForm';

function Experiences() {
  const [experiences, setExperiences] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

  // console.log('API URL:', apiUrl);  // Ensure this prints the correct URL
  // console.log('Stripe Publishable Key:', publishableKey);  // Ensure this prints the correct key

  useEffect(() => {
    fetch(`${apiUrl}/experiences`)
      .then((response) => response.json())
      .then((data) => setExperiences(data))
      .catch((error) => console.error('Error fetching experiences:', error));
  }, [apiUrl]);

  const handleToken = (token, addresses) => {
    console.log(token, addresses);
    alert('Payment Successful');
  };

  const handleFormOpen = () => {
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  return (
    <div className="experiences">
      {isFormVisible && <SubmitForm onClose={handleFormClose} />}
      <h2 className="experiences__title">
        Just choose an idea, the rest is our task
      </h2>
      <div className="experiences__grid">
        {experiences.map((experience, index) => (
          <div className="experiences__card" key={index}>
            <Link to={`/experience/${experience.id}`}>
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="experiences__image"
              />
            </Link>
            <h3 className="experiences__card-title">{experience.title}</h3>
            <p className="experiences__description">{experience.description}</p>
            <StripeCheckout
              name="DreamyDates"
              billingAddress
              shippingAddress
              description={`Your total is $${experience.price}`}
              amount={experience.price * 100}
              token={handleToken}
              stripeKey={publishableKey}
            >
              <button className="experiences__price">
                Price from {experience.price}$
              </button>
            </StripeCheckout>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experiences;
