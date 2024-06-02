import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Contact.scss";
import Nav from "../../Component/Nav";
import { MdOutlineMailOutline, MdSettingsPhone } from "react-icons/md";


const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[0-9]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number';
      }
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/form_submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ firstname: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          navigate('/'); // Redirect to home page after success message
        }, 2000); // Delay to allow the user to see the toast message
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="contact-page">
      <ToastContainer />
      <div className="video-background">
        <video autoPlay loop muted preload="auto">
          <source
            src="https://res.cloudinary.com/dzytbkc5l/video/upload/v1717271438/1_tcivi5.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>
      <div className="contact">
        <div className="contact__info">
          <h1>Contact Us</h1>
          <p>
            Not sure what you need? Our team at Dream Dates will be happy to
            listen to you and suggest event ideas you hadn’t considered.
          </p>
          <div className="contact__details">
            <p>
              <MdOutlineMailOutline /> info@dreamdates.ca
            </p>
            <p>
              <MdSettingsPhone /> Support: (+21) 123 456 586
            </p>
          </div>
        </div>
        <div className="contact__form">
          <h2>We’d love to hear from you! Let’s get in touch</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="firstname" placeholder="Enter your name" value={formData.firstname} onChange={handleChange} />
              {errors.firstname && <span className="error">{errors.firstname}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="olivia@gmail.com" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="+1 (778) 000-0000" value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <textarea name="message" placeholder="Type your message here" value={formData.message} onChange={handleChange}></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <button type="submit" className="contact__form-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;