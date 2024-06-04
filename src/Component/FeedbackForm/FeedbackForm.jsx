import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FeedbackForm.scss";
import Rating from 'react-rating-stars-component';

function FeedbackForm({ onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    professional: 0,
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      professional: newRating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.professional) {
      toast.error('Please fill out all required fields');
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Feedback submitted successfully!');
        onSubmitSuccess(); // Call the callback to refresh reviews
        setTimeout(onClose, 2000); // Delay closing form to allow user to see toast
      } else {
        toast.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    }
  };

  const handleFormClose = () => {
    toast.info('Feedback form closed');
    setTimeout(onClose, 1000); // Delay closing form to allow user to see toast
  };

  return (
    <div className="feedback-form">
      <ToastContainer />
      <div className="feedback-form__overlay" onClick={handleFormClose}></div>
      <form className="feedback-form__form" onSubmit={handleSubmit}>
        <button type="button" className="feedback-form__close-button" onClick={handleFormClose}>×</button>
        <p className="feedback-form__title">Feedback Form</p>
        <p className="feedback-form__label">Name</p>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" type="text" className="feedback-form__input" required />
        <p className="feedback-form__label">Email<span>*</span></p>
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" type="email" className="feedback-form__input" required />
        <p className="feedback-form__label">What is your overall impression?<span>*</span></p>
        <div className="feedback-form__rating">
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={formData.professional}
            onChange={handleRatingChange}
          />
        </div>
        <p className="feedback-form__label">Feel free to add any other comments or suggestions:</p>
        <textarea name="comments" value={formData.comments} onChange={handleChange} rows="5" className="feedback-form__textarea"></textarea>
        <div className="feedback-form__btn-block">
          <button type="submit" className="feedback-form__button">Send Feedback</button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
