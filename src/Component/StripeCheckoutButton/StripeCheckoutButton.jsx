// components/StripeCheckoutButton.jsx

import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; 
  const publishableKey = 'sk_test_51PKcBTRu9pFZqeZ3CLGya8eswD62GHiySCd9zKABBmeG29FqAybRJxdKmfckyn8rhHPym9h8Y7QfkIhQCWp82exF00aWGnILvp'; 

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');

  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='DreamyDates'
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
