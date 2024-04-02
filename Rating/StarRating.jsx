import React from 'react';

function StarRating({ rating, onRating }) {
  const totalStars = 5;

  const handleStarClick = (index) => {
    onRating(index + 1);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((star, index) => {
        return (
          <span
            key={index}
            onClick={() => handleStarClick(index)}
            style={{ cursor: 'pointer', marginRight: '5px' }}
          >
            {index < rating ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
