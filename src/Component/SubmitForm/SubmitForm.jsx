import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SubmitForm.scss";

function SubmitForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email) ? '' : 'Invalid email address';
    const phoneError = validatePhone(formData.phone) ? '' : 'Phone number must be 10 digits';

    setErrors({
      email: emailError,
      phone: phoneError
    });

    if (!emailError && !phoneError) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/form_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          toast.success('Form submitted successfully!');
          setTimeout(onClose, 2000); // Delay closing form to allow user to see toast
        } else {
          toast.error('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to submit form');
      }
    }
  };

  const handleFormClose = () => {
    toast.info('Form closed');
    setTimeout(onClose, 1000); // Delay closing form to allow user to see toast
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="form">
        <button className="close-button" onClick={handleFormClose}>×</button>
        <div className="title">Welcome</div>
        <div className="subtitle">Get in touch today</div>

        <div className="input-container ic1">
          <input placeholder="" type="text" className="input" id="firstname" value={formData.firstname} onChange={handleChange} />
          <div className="cut"></div>
          <label className="iLabel" htmlFor="firstname">First name</label>
        </div>

        <div className="input-container ic2">
          <input placeholder="" type="text" className="input" id="email" value={formData.email} onChange={handleChange} />
          <div className="cut"></div>
          <label className="iLabel" htmlFor="email">Email</label>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        
        <div className="input-container ic2">
          <input placeholder="" type="text" className="input" id="phone" value={formData.phone} onChange={handleChange} />
          <div className="cut cut-short"></div>
          <label className="iLabel" htmlFor="phone">Phone number</label>
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        
        <button className="submit" type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default SubmitForm;
