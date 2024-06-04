import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./MarriageProposal.scss";
import StripeCheckout from "react-stripe-checkout";
import SubmitForm from "../../Component/SubmitForm/SubmitForm";
import Nav from "../../Component/Nav";
import Footer from "../../Component/Footer";

function MarriageProposal() {
  const [experiences, setExperiences] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const apiKey = process.env.REACT_APP_API_KEY; // Add this line to get the API key

    fetch(`${apiUrl}/experiences`, {
      headers: {
        'x-api-key': apiKey // Include the API key in the headers
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Log the fetched data
        const filteredExperiences = data.filter(exp => {
          try {
            console.log('Categories before checking:', exp.categories); // Log categories before checking
            const categories = Array.isArray(exp.categories) ? exp.categories : JSON.parse(exp.categories);
            console.log('Categories after parsing/checking:', categories); // Log categories after parsing/checking
            return categories.includes("Marriage proposal");
          } catch (error) {
            console.error("Error checking categories:", error);
            return false;
          }
        });
        setExperiences(filteredExperiences);
      })
      .catch((error) => console.error("Error fetching experiences:", error));
  }, []);

  const handleToken = (token, addresses) => {
    console.log(token, addresses);
    alert("Payment Successful");
  };

  const handleFormOpen = () => {
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

  return (
    <div className="MarriageProposal-page">
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav /> 
      </div>
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
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Footer /> 
      </div>
    </div>
  );
}

export default MarriageProposal;
