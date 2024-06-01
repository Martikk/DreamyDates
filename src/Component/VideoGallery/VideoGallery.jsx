import React from 'react';
import './VideoGallery.scss';

const videos = [
  'https://www.youtube.com/embed/TN_5HHxYJaY?si=y42CpjpYGoWys6Vx',
  'https://www.youtube.com/embed/TN_5HHxYJaY?si=y42CpjpYGoWys6Vx',
  'https://www.youtube.com/embed/TN_5HHxYJaY?si=y42CpjpYGoWys6Vx',
];

const VideoGallery = () => {
  return (
    <div className="video-gallery">
      <h2 className="video-gallery__title">VIDEO</h2>
      <div className="video-gallery__grid">
        {videos.map((video, index) => (
          <div key={index} className="video-gallery__item">
            <iframe
              className="video-gallery__iframe"
              src={video}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Video ${index + 1}`}
            ></iframe>
          </div>
        ))}
      </div>
      <button className="video-gallery__button">More Video</button>
    </div>
  );
};

export default VideoGallery;
