import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Experiences.scss';
import StripeCheckout from 'react-stripe-checkout';
import SubmitForm from '../SubmitForm/SubmitForm';
import { getExperiences } from '../../lib/api';

function Experiences() {
  const [experiences, setExperiences] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);

  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY; // это можно оставить

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .catch(e => console.error('Error fetching experiences:', e));
  }, []);

  const handleToken = (token, addresses) => {
    console.log(token, addresses);
    alert('Payment Successful');
  };

  return (
    <div className="experiences">
      {isFormVisible && <SubmitForm onClose={() => setFormVisible(false)} />}
      <h2 className="experiences__title">Just choose an idea, the rest is our task</h2>
      <div className="experiences__grid">
        {experiences.map((experience, index) => (
          <div className="experiences__card" key={index}>
            <Link to={`/experience/${experience.id}`}>
              <img src={experience.imageUrl} alt={experience.title} className="experiences__image"/>
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
              <button className="experiences__price">Price from {experience.price}$</button>
            </StripeCheckout>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experiences;