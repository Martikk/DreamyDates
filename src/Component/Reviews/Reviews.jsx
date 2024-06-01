import React, { useState } from 'react';
import './Reviews.scss';
import FeedbackForm from '../FeedbackForm/FeedbackForm';

const reviews = [
  {
    name: 'Danielle MacInnis',
    rating: 5,
    daysAgo: 2,
    text: 'My partner and I have been to boucherie many times and it was our first time at the',
    avatar: '../../Assets/Mohan.jpg',
    platform: 'Google'
  },
  {
    name: 'Gregory Broner',
    rating: 5,
    daysAgo: 2,
    text: 'This restaurant is an absolute gem. In addition to the amazing food and ambiance,',
    avatar: '../../Assets/Mohan.jpg',
    platform: 'Google'
  },
  {
    name: 'Sorana Popa',
    rating: 5,
    daysAgo: 6,
    text: 'As per usual, always going back to one of my favorite spots (great food & drinks)',
    avatar: '../../Assets/Mohan.jpg',
    platform: 'Google'
  }
];

const Reviews = () => {
  const [isFeedbackFormVisible, setFeedbackFormVisible] = useState(false);

  const handleFeedbackFormOpen = () => {
    setFeedbackFormVisible(true);
  };

  const handleFeedbackFormClose = () => {
    setFeedbackFormVisible(false);
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">What our customers say</h2>
      <div className="reviews-summary">
        <div className="rating-summary">
          <img src="path/to/google-logo.png" alt="Google Logo" className="google-logo" />
          <div>
            <div className="rating-score">4.7</div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-reviews">1,156 reviews</div>
          </div>
        </div>
        <button className="review-button" onClick={handleFeedbackFormOpen}>Write a review</button>
      </div>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <img src={review.avatar} alt={`${review.name} avatar`} className="avatar" />
              <div>
                <div className="review-name">{review.name}</div>
                <div className="review-rating">★★★★★</div>
                <div className="review-time">{review.daysAgo} days ago</div>
              </div>
            </div>
            <div className="review-text">{review.text}</div>
            <div className="review-footer">
              <img src="path/to/google-logo.png" alt="Google Logo" className="google-logo-small" />
              <div className="review-platform">Posted on {review.platform}</div>
            </div>
          </div>
        ))}
      </div>
      {isFeedbackFormVisible && <FeedbackForm onClose={handleFeedbackFormClose} />}
    </div>
  );
}

export default Reviews;
