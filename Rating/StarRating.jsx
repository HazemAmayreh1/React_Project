import React from 'react';

function StarRating({ rating }) {
  const totalStars = 5;

  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <div className="star-rating">
      {'★'.repeat(fullStars)}
      {'⭐'.repeat(halfStars)}
      {'☆'.repeat(emptyStars)}
    </div>
  );
}

export default StarRating;
