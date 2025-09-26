import React, { useEffect, useState } from 'react';
import '../styles/PreviousReviews.css';

const questions = [
  "How was our service?",
  "How was the product?",
  "Was the delivery on time?",
  "Would you recommend us to others?"
];

const PreviousReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="previous-reviews-container">
      <h2>Previous Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={review._id || index} className="review-item">
            {review.ratings?.map((rate, i) => (
              <div key={i} className="question-block">
                <strong>{questions[i]}</strong>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <span key={j} className={j <= rate ? 'filled' : ''}>★</span>
                  ))}
                </div>
              </div>
            ))}
            <p className="review-text">{review.text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PreviousReviews;
