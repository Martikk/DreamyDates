import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCards.scss';

function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleClick = (link) => {
    navigate(link);
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
