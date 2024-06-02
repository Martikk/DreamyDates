import React, { useState, useEffect } from 'react';
import './Reviews.scss';
import FeedbackForm from '../FeedbackForm/FeedbackForm';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isFeedbackFormVisible, setFeedbackFormVisible] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3001/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleFeedbackFormOpen = () => {
    setFeedbackFormVisible(true);
  };

  const handleFeedbackFormClose = () => {
    setFeedbackFormVisible(false);
    fetchReviews(); // Refresh reviews when the form is closed
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">What our customers say</h2>
      <div className="reviews-summary">
        <div className="rating-summary">
          <img src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1717289051/DreamDate/Google_2015_logo.svg_xgiius.png" alt="Google Logo" className="google-logo" />
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
                <div className="review-rating">{'★'.repeat(review.professional)}</div>
                <div className="review-time">Posted on {review.platform}</div>
              </div>
            </div>
            <div className="review-text">{review.comments}</div>
          </div>
        ))}
      </div>
      {isFeedbackFormVisible && <FeedbackForm onClose={handleFeedbackFormClose} onSubmitSuccess={fetchReviews} />}
    </div>
  );
}

export default Reviews;
