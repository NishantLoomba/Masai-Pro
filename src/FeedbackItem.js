
import React from 'react';

const FeedbackItem = ({ feedback, onDelete }) => {
  return (
    <div className="feedback-item">
      <h3>{feedback.name}</h3>
      <p>{feedback.comment}</p>
      <p>{feedback.email}</p>
      <p>{new Date(feedback.timestamp).toLocaleString()}</p>
      <button onClick={() => onDelete(feedback.id)}>Delete</button>
    </div>
  );
};

export default FeedbackItem;
