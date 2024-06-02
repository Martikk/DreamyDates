import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FeedbackForm.scss';

function FeedbackForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    professional: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Feedback submitted successfully!');
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
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" type="text" className="feedback-form__input" />
        <p className="feedback-form__label">Email<span>*</span></p>
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" type="email" className="feedback-form__input" />
        <p className="feedback-form__label">What is your overall impression?<span>*</span></p>
        <table className="feedback-form__table">
          <thead>
            <tr>
              <th className="feedback-form__table-header"></th>
              <th className="feedback-form__table-header">Very Satisfied</th>
              <th className="feedback-form__table-header">Satisfied</th>
              <th className="feedback-form__table-header">Unsatisfied</th>
              <th className="feedback-form__table-header">Very Unsatisfied</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feedback-form__table-cell feedback-form__table-cell--first-col">Professional</td>
              <td className="feedback-form__table-cell"><input name="professional" value="Very Satisfied" type="radio" onChange={handleChange} /></td>
              <td className="feedback-form__table-cell"><input name="professional" value="Satisfied" type="radio" onChange={handleChange} /></td>
              <td className="feedback-form__table-cell"><input name="professional" value="Unsatisfied" type="radio" onChange={handleChange} /></td>
              <td className="feedback-form__table-cell"><input name="professional" value="Very Unsatisfied" type="radio" onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
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
