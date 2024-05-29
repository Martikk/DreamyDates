import React from "react";
import Nav from "../../Component/Nav";
import "./HomePage.scss";
import homeImage from "../../Assets/Home.jpg";
import Experiences from "../../Component/Experiences/Experiences"
import CategoryCards from "../../Component/CategoryCards/CategoryCards"


function HomePage() {
  return (
    <div className="HomePage">
<div className="HomePage__bacground-nav">

<div
      className="HomePage__bacground w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${homeImage})` }}>
        
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>
</div>

      <div className="HomePage_one">
        <p className="HomePage_phone">+1236-788-9784</p>

<div className="HomePage_buttonSection">

<button class="btn" type="button">
          <strong>Order the call</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
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
      <CategoryCards/>
      <Experiences/>
    </div>
    </div>
  );
}

export default HomePage;
