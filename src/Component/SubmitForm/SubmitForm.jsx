import React, { useState } from "react";
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

  const handleSubmit = () => {
    const emailError = validateEmail(formData.email) ? '' : 'Invalid email address';
    const phoneError = validatePhone(formData.phone) ? '' : 'Phone number must be 10 digits';

    setErrors({
      email: emailError,
      phone: phoneError
    });

    if (!emailError && !phoneError) {
      // Submit the form
      console.log("Form submitted", formData);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="title">Welcome</div>
        <div className="subtitle">Get in touch today</div>

        <div className="input-container ic1">
          <input placeholder="" type="text" className="input" id="firstname" value={formData.firstname} onChange={handleChange} />
          <div className="cut"></div>
          <label className="iLabel" for="firstname">First name</label>
        </div>

        <div className="input-container ic2">
          <input placeholder="" type="text" className="input" id="email" value={formData.email} onChange={handleChange} />
          <div className="cut"></div>
          <label className="iLabel" for="email">Email</label>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        
        <div className="input-container ic2">
          <input placeholder="" type="text" className="input" id="phone" value={formData.phone} onChange={handleChange} />
          <div className="cut cut-short"></div>
          <label className="iLabel" for="phone">Phone number</label>
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        
        <button className="submit" type="button" onClick={handleSubmit}>submit</button>
      </div>
    </div>
  );
}

export default SubmitForm;
