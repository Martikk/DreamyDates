import React from 'react';
import './Contact.scss';
import Nav from "../../Component/Nav";

const Contact = () => {
  return (
    <div className='contact-page'>
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="https://res.cloudinary.com/dzytbkc5l/video/upload/v1717271438/1_tcivi5.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>
      <div className="contact">
        <div className="contact__info">
          <h1>Contact Us</h1>
          <p>
            Not sure what you need? The team at Square Events will be happy to listen to you and suggest event ideas you hadn’t considered
          </p>
          <div className="contact__details">
            <p><img src="path/to/email-icon.png" alt="Email" /> info@squareevents.com</p>
            <p><img src="path/to/phone-icon.png" alt="Phone" /> Support: (+21) 123 456 586</p>
          </div>
        </div>
        <div className="contact__form">
          <h2>We’d love to hear from you! Let’s get in touch</h2>
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input type="text" placeholder="Enter your company name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="olivia@untitledui.com" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="Enter your address" />
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <textarea placeholder="Type your message here"></textarea>
            </div>
            <button type="submit" className="contact__form-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
