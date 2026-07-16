import { useState, useEffect } from 'react';
import Tweet from './Tweet';

export default function LastTweets({ refreshTrigger }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets();
  }, [refreshTrigger]);

  const fetchTweets = () => {
    fetch('http://localhost:3000/tweets')
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  };

  const handleDelete = (id) => {
    setTweets(tweets.filter((t) => t._id !== id));
  };

  const handleLike = () => {
    fetchTweets();
  };

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet._id}
          tweet={tweet}
          onDelete={handleDelete}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}