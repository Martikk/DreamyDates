import React, { useState, useEffect } from 'react';
import './Flowers.scss';
import Nav from "../../Component/Nav";
import Footer from "../../Component/Footer";
import StripeCheckout from 'react-stripe-checkout';

function Flowers() {
    const [flowers, setFlowers] = useState([]); 
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY; 

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
        fetch(`${apiUrl}/flowers`)
            .then(response => response.json())
            .then(data => setFlowers(data)) 
            .catch(error => console.error('Error fetching flowers:', error)); 
    }, []);

    const handleToken = (token, addresses) => {
        console.log(token, addresses); 
        alert('Payment Successful'); 
    };

    return (
        <div className="flowers-page">
            <div className="backdrop-blur-sm p-4 z-10 relative">
                <Nav /> 
            </div>

            <div className="flowers">
                <h2 className="flowers__title">Flowers</h2>
                <div className="flowers__list">
                    {flowers.map((flower, index) => (
                        <div key={index} className="flower-card">
                            <div className="flower-card__img">
                                <img src={flower.img} alt={flower.name} /> 
                            </div>
                            <h3 className="flower-card__name">{flower.name}</h3> 
                            <p className="flower-card__rating">
                                <span className="flower-card__rating-star">★</span>
                                {flower.rating} ({flower.reviews} reviews) 
                            </p>
                            <p className="flower-card__price">${flower.price}</p> 
                            <StripeCheckout
                                name="DreamyDates"
                                billingAddress
                                shippingAddress
                                description={`Your total is $${flower.price}`}
                                amount={flower.price * 100}
                                panelLabel='Pay Now'
                                token={handleToken}
                                stripeKey={publishableKey}
                            >
                                <button className="flower-card__button">Buy</button> 
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

export default Flowers; 
