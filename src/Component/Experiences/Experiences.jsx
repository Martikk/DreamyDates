import React from 'react';
import './Experiences.scss';
import ExperiencesImage from "../../Assets/Experiences.jpg";
import PicnicImage from "../../Assets/Picnic.jpg";
import Footer from "../Footer";

function Experiences() {
  const experiences = [
    {
      title: "Picnic by the Ocean",
      description: "Enjoy a romantic sunset on the ocean shore, cozily settled on a picnic blanket with gourmet snacks and chilled wine, accompanied by the gentle sound of waves.",
      price: "200$",
      imageUrl: PicnicImage
    },
    {
      title: "Romantic Dinner",
      description: "Immerse yourself in an atmosphere of elegance and refined taste in an exquisite restaurant with soft candlelight, live music, and gastronomic masterpieces.",
      price: "250$",
      imageUrl: PicnicImage
    },
    {
      title: "Romantic Boat Ride",
      description: "Embark on a romantic boat ride on calm waters, relishing snacks and drinks against the backdrop of a sunset and a starry sky.",
      price: "400$",
      imageUrl: PicnicImage
    },
    {
      title: "Kitsilano Beach",
      description: "Choose a sunset evening at Kitsilano Beach to propose against the backdrop of mountains, the ocean, and a setting sun.",
      price: "150$",
      imageUrl: PicnicImage
    },
    {
      title: "Capilano Suspension Bridge",
      description: "Propose on the Capilano Suspension Bridge, enjoying the breathtaking views of the canyon and ancient forest for an unforgettable moment.",
      price: "250$",
      imageUrl: PicnicImage
    },
    {
      title: "Vancouver Lookout",
      description: "Take your love to the top of the Vancouver Lookout and propose while enjoying panoramic views of the city, mountains, and ocean.",
      price: "300$",
      imageUrl: PicnicImage
    }
  ];

  return (
    <div className="experiences w-full h-screen bg-center bg-cover"
    style={{ backgroundImage: `url(${ExperiencesImage})` }}>


      <h2 className="experiences__title">Just choose an idea, the rest is our task</h2>
      <div className="experiences__grid">
        {experiences.map((experience, index) => (
          <div className="experiences__card" key={index}>
            <img src={experience.imageUrl} alt={experience.title} className="experiences__image" />
            <h3 className="experiences__card-title">{experience.title}</h3>
            <p className="experiences__description">{experience.description}</p>
            <button className="experiences__price">Price from {experience.price}</button>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Experiences;
