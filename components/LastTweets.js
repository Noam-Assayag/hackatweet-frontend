import { useState, useEffect } from 'react';
import Tweet from './Tweet';

export default function LastTweets({ refreshTrigger, hashtag }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets();
  }, [refreshTrigger, hashtag]);

  const fetchTweets = () => {
    const url = hashtag
      ? `http://localhost:3000/tweets/hashtag/${hashtag}`
      : 'http://localhost:3000/tweets';

    fetch(url)
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

  if (hashtag && tweets.length === 0) {
    return <p>No tweets found with #{hashtag}</p>;
  }

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