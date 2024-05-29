import React from 'react';
// import { useHistory } from 'react-router-dom';
import './CategoryCards.scss';
import marriageProposal from '../../Assets/Picnic.jpg';
import dates from '../../Assets/Picnic.jpg';
import surprises from '../../Assets/Picnic.jpg';
import flowers from '../../Assets/Picnic.jpg';

const categories = [
  { src: marriageProposal, caption: 'Marriage proposal', link: '/marriage-proposal' },
  { src: dates, caption: 'Dates', link: '/dates' },
  { src: surprises, caption: 'Surprises', link: '/surprises' },
  { src: flowers, caption: 'Flowers', link: '/flowers' },
];

function CategoryCards() {
//   const history = useHistory();

  const handleClick = (link) => {
    // history.push(link);
  };

  return (
    <div className="category-cards">
      {categories.map((category, index) => (
        <div key={index} className="category-card" onClick={() => handleClick(category.link)}>
          <img src={category.src} alt={category.caption} className="category-image" />
          <p className="category-caption">{category.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;
