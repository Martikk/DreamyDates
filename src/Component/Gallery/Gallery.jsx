import React, { useState } from 'react';
import './Gallery.scss';

import Picnic1 from '../../Assets/Picnic.jpg';
import Picnic2 from '../../Assets/Picnic.jpg';
import Picnic3 from '../../Assets/Picnic.jpg';
import Picnic4 from '../../Assets/Picnic.jpg';
import Picnic5 from '../../Assets/Picnic.jpg';
import Picnic6 from '../../Assets/Picnic.jpg';
import Picnic7 from '../../Assets/Picnic.jpg';
import Picnic8 from '../../Assets/Picnic.jpg';
import Picnic9 from '../../Assets/Picnic.jpg';

const images = [
  Picnic1,
  Picnic2,
  Picnic3,
  Picnic4,
  Picnic5,
  Picnic6,
  Picnic7,
  Picnic8,
  Picnic9,
];

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(6); 

  const handleShowMore = () => {
    setVisibleImages(prevVisibleImages => prevVisibleImages + 3);
  };

  return (
    <div className="gallery">
      <h2 className="gallery__title">GALLERY</h2>
      <div className="gallery__grid">
        {images.slice(0, visibleImages).map((image, index) => (
          <div key={index} className="gallery__item">
            <img src={image} alt={`Gallery item ${index + 1}`} className="gallery__image" />
          </div>
        ))}
      </div>
      {visibleImages < images.length && (
        <button className="gallery__button" onClick={handleShowMore}>MORE PHOTO</button>
      )}
    </div>
  );
};

export default Gallery;
