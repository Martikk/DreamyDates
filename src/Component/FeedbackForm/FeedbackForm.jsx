import React from "react";
import './FeedbackForm.scss';

function FeedbackForm({ onClose }) {
  return (
    <div className="feedback-form">
      <div className="feedback-form__overlay" onClick={onClose}></div>
      <form action="/" className="feedback-form__form">
        <button className="feedback-form__close-button" onClick={onClose}>×</button>
        <p className="feedback-form__title">Feedback Form</p>
        <p className="feedback-form__label">Name</p>
        <input placeholder="Enter your full name" type="text" className="feedback-form__input" />
        <p className="feedback-form__label">Email<span>*</span></p>
        <input placeholder="Enter your email" type="text" className="feedback-form__input" />
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
              <td className="feedback-form__table-cell"><input name="professional" value="very-satisfied" type="radio" /></td>
              <td className="feedback-form__table-cell"><input name="professional" value="satisfied" type="radio" /></td>
              <td className="feedback-form__table-cell"><input name="professional" value="unsatisfied" type="radio" /></td>
              <td className="feedback-form__table-cell"><input name="professional" value="very-unsatisfied" type="radio" /></td>
            </tr>
          </tbody>
        </table>
        <p className="feedback-form__label">Feel free to add any other comments or suggestions:</p>
        <textarea rows="5" className="feedback-form__textarea"></textarea>
        <div className="feedback-form__btn-block">
          <button type="submit" className="feedback-form__button">Send Feedback</button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
