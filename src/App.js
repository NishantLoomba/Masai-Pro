
import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import ThemeToggle from './ThemeToggle';

const App = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <ThemeToggle />
      <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
      {submitted && <p>Thank you for your feedback!</p>}
      <FeedbackList />
    </div>
  );
};

export default App;
