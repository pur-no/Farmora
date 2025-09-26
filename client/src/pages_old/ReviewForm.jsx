import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReviewForm.css';

const questions = [
  "How was our service?",
  "How was the product?",
  "Was the delivery on time?",
  "Would you recommend us to others?"
];

const ReviewForm = () => {
  const [text, setText] = useState('');
  const [ratings, setRatings] = useState(Array(questions.length).fill(0));
  const navigate = useNavigate();

  const handleStarClick = (questionIndex, starValue) => {
    const newRatings = [...ratings];
    newRatings[questionIndex] = starValue;
    setRatings(newRatings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      text,
      ratings
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Server error: ${errMsg}`);
      }

      navigate('/thank-you');
    } catch (error) {
      console.error('Failed to submit review:', error.message);
      alert('Failed to submit review. Please try again later.');
    }
  };

  const handlePreviousReviews = () => {
    navigate('/previous-reviews');
  };

  return (
    <div className="review-container">
      <form onSubmit={handleSubmit}>
        {questions.map((question, qIdx) => (
          <div key={qIdx} className="question-block">
            <label>{question}</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={i <= ratings[qIdx] ? 'filled' : ''}
                  onClick={() => handleStarClick(qIdx, i)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}

        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <div className="button-group">
          <button type="submit">Submit Review</button>
          <button type="button" onClick={handlePreviousReviews}>
            Previous Reviews
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
