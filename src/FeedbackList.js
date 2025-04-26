
import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import FeedbackItem from './FeedbackItem';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const feedbackRef = database.ref('feedback');
    feedbackRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const feedbackArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setFeedbacks(feedbackArray);
    });

    return () => feedbackRef.off();
  }, []);

  const handleDelete = async (id) => {
    try {
      await database.ref('feedback').child(id).remove();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
