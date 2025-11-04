import React, { useState, useEffect } from 'react';
import './Reviews.scss';
import FeedbackForm from '../FeedbackForm/FeedbackForm';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isFeedbackFormVisible, setFeedbackFormVisible] = useState(false);

  const fetchReviews = async () => {
    try {
      // фронт идёт только на свой /api — без ENV и без ключей
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">What our customers say</h2>

      <div className="reviews-summary">
        <div className="rating-summary">
          <img
            src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1717289051/DreamDate/Google_2015_logo.svg_xgiius.png"
            alt="Google Logo"
            className="google-logo"
          />
          <div>
            <div className="rating-score">4.7</div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-reviews">1,156 reviews</div>
          </div>
        </div>
        <button className="review-button" onClick={() => setFeedbackFormVisible(true)}>
          Write a review
        </button>
      </div>

      <div className="reviews-list">
        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <img src={r.avatar} alt={`${r.name} avatar`} className="avatar" />
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-rating">{'★'.repeat(r.professional)}</div>
                <div className="review-time">Posted on {r.platform}</div>
              </div>
            </div>
            <div className="review-text">{r.comments}</div>
          </div>
        ))}
      </div>

      {isFeedbackFormVisible && (
        <FeedbackForm
          onClose={() => {
            setFeedbackFormVisible(false);
            fetchReviews(); // обновим список
          }}
          onSubmitSuccess={fetchReviews}
        />
      )}
    </div>
  );
};

export default Reviews;