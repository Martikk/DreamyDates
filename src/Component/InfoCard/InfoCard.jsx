import React from "react";
import "./InfoCard.scss";
import StripeCheckout from "react-stripe-checkout"; // Импортируем компонент StripeCheckout

const InfoCard = () => {
  const price = 200; // Цена для оплаты через Stripe
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51PKcBTRu9pFZqeZ3TWG9CO54MDgkfBxbFN5eJDgjRsM7iYgZUYpFHrA3oGimAh84qO2j60P4GxETYZz9OBXSllwE00y0kCU81J'; 

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <div className="info-card">
      <div className="info-card__section">
        <h2>“Picnic by the Ocean”</h2>
        <p><strong>This Month price:</strong> 200$</p>
        <p><strong>Ordered:</strong> 117 times</p>
        <p><strong>Duration:</strong> 2-2.5 hours</p>
        <p>(the package can be booked after sunset for 8.30 p.m. or 9 p.m.)</p>
        <StripeCheckout
          name="DreamyDates"
          billingAddress
          shippingAddress
          description={`Your total is $${price}`}
          amount={priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        >
          <button className="info-card__order-button">Order</button>
        </StripeCheckout>
      </div>
      <div className="info-card__social">
        <a href="https://example.com"><img src="path/to/icon1.png" alt="Icon" /></a>
        <a href="https://example.com"><img src="path/to/icon2.png" alt="Icon" /></a>
        <a href="https://example.com"><img src="path/to/icon3.png" alt="Icon" /></a>
        <a href="https://example.com"><img src="path/to/icon4.png" alt="Icon" /></a>
        <a href="https://example.com"><img src="path/to/icon5.png" alt="Icon" /></a>
      </div>
      <div className="info-card__section-order">
        <h2>Need free consultation?</h2>
        <p>We’ll be glad to answer all arising questions!</p>
        <p><strong>+1778-386-2132</strong></p>
        <p><strong>+1236-788-9784</strong></p>
        <StripeCheckout
          name="DreamyDates"
          billingAddress
          shippingAddress
          description={`Your total is $${price}`}
          amount={priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        >
          <button className="info-card__order-button">Order</button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default InfoCard;
