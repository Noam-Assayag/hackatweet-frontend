import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Trends() {
  const [trends, setTrends] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/tweets/trends/all')
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTrends(data.trends);
        }
      });
  }, []);

  const handleClick = (hashtag) => {
    router.push(`/hashtag/${hashtag}`);
  };

  return (
    <div>
      <h3>Trends</h3>
      {Object.entries(trends).map(([tag, count]) => (
        <p key={tag} onClick={() => handleClick(tag)} style={{ cursor: 'pointer' }}>
          #{tag} · {count} tweet{count > 1 ? 's' : ''}
        </p>
      ))}
    </div>
  );
}