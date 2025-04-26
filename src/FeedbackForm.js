
import React, { useState } from 'react';
import { database } from './firebase';

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !comment) {
      setMessage('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    const feedback = { name, email, comment, timestamp: Date.now() };
    try {
      await database.ref('feedback').push(feedback);
      onFeedbackSubmit();
      setName('');
      setEmail('');
      setComment('');
      setMessage('Feedback submitted successfully!');
    } catch (error) {
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Your feedback"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default FeedbackForm;
