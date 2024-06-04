import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCards.scss';

function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(`${apiUrl}/categories`, {
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
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
