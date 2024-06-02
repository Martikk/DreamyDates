import React from "react";
import "./Contact.scss";
import Nav from "../../Component/Nav";
import { MdOutlineMailOutline, MdSettingsPhone } from "react-icons/md";

const Contact = () => {
  return (
    <div className="contact-page">
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
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="olivia@gmail.com" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+1 (778) 000-0000" />
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <textarea placeholder="Type your message here"></textarea>
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
