import React, { useState } from "react";
import Nav from "../../Component/Nav";
import Footer from "../../Component/Footer";
import "./HomePage.scss";
import homeImage from "../../Assets/Home.jpg";
import Experiences from "../../Component/Experiences/Experiences";
import CategoryCards from "../../Component/CategoryCards/CategoryCards";
import HowWeWork from "../../Component/HowWeWork/HowWeWork";
import SubmitForm from "../../Component/SubmitForm/SubmitForm";
import Reviews from "../../Component/Reviews/Reviews";


function HomePage() {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleFormOpen = () => {
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  return (
    <div className="HomePage">
      {isFormVisible && <SubmitForm onClose={handleFormClose} />}
      <div className="HomePage__bacground-nav">
        <div
          className="HomePage__background w-full h-screen bg-center bg-cover"
          style={{ backgroundImage: `url(${homeImage})` }}
        >
          <div className="backdrop-blur-sm p-4 z-10 relative">
            <Nav />
          </div>
        </div>
        <div className="HomePage_one">
          <p className="HomePage_phone">+1236-788-9784</p>
          <div className="HomePage_buttonSection">
            <button className="btn" type="button" onClick={handleFormOpen}>
              <strong>Order the call</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>
            <ul className="HomePage_right">
              <li className="HomePage_right-logo"></li>
              <li className="HomePage_right-text">
                <p>
                  With DreamyDates love becomes magical. Create your perfect
                  romantic moments with us!
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="HomePage__rain">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      <CategoryCards />
      <Experiences />
      <div className="footer-part">
      <Reviews/>
        <HowWeWork />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;