import React from "react";
import "./ProductCard.scss";
import productImage from "../../Assets/Picnic.jpg"; 
import StripeCheckout from 'react-stripe-checkout'; 

const ProductCard = () => {
  const publishableKey = 'pk_test_51PKcBTRu9pFZqeZ3TWG9CO54MDgkfBxbFN5eJDgjRsM7iYgZUYpFHrA3oGimAh84qO2j60P4GxETYZz9OBXSllwE00y0kCU81J';
  const price = 200; 
  const priceForStripe = price * 100; 

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');

  };

  return (
    <div className="product-card">
      <img
        src={productImage}
        alt="Picnic by the Ocean"
        className="product-card__image"
      />
      <h1 className="product-card__title">Picnic by the Ocean</h1>
      <div className="product-card__description">
        <h2>Description:</h2>
        <p>
          Spend an unforgettable day by the ocean, enjoying the fresh sea breeze
          and breathtaking views. A picnic by the ocean is the perfect way to
          relax and spend quality time with your loved one, listening to the
          sound of the waves and feeling the soft sand beneath your feet.
        </p>
      </div>
      <div className="product-card__included">
        <h2>What's Included:</h2>
        <ul>
          <li>Cozy spot on the beach with a blanket and pillows</li>
          <li>Delicious snacks and refreshing drinks</li>
          <li>Portable speaker with romantic music</li>
          <li>Hats and sunscreen</li>
          <li>Beachside photo session (optional)</li>
        </ul>
      </div>
      <div className="product-card__extras">
        <h2>Extras:</h2>
        <ul>
          <li>Option to order seafood or fresh fruits</li>
          <li>Beach games and activities (frisbee, volleyball, etc.)</li>
          <li>Romantic dinner at sunset (available at an additional cost)</li>
        </ul>
      </div>
      <div className="product-card__location">
        <h2>Location:</h2>
        <p>
          A beautiful and secluded beach, perfect for a romantic picnic and
          enjoying nature away from the hustle and bustle of the city.
        </p>
      </div>
      <div className="product-card__price">
        <h2>Price:</h2>
        <p>From $200</p>
      </div>
      <div className="product-card__booking">
        <h2>How to Book:</h2>
        <p>
          Fill out the form on our website or contact our manager at [phone
          number] to book and get more information.
        </p>
      </div>
      <StripeCheckout
        label='Order'
        name='DreamyDates'
        billingAddress
        shippingAddress
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
      >
        <button className="product-card__order-button">Order</button>
      </StripeCheckout>
    </div>
  );
};

export default ProductCard;
