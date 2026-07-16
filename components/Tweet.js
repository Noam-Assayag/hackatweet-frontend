import { useSelector } from 'react-redux';
import styles from '../styles/Tweet.module.css';

export default function Tweet({ tweet, onDelete, onLike }) {
  const user = useSelector((state) => state.user.value);

  const isMine = tweet.author._id === user._id;
  const isLiked = tweet.likes.includes(user.username);

  const handleLike = () => {
    fetch(`http://localhost:3000/tweets/${tweet._id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          onLike();
        }
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/tweets/${tweet._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          onDelete(tweet._id);
        }
      });
  };

  return (
    <div className={styles.tweet}>
      <p className={styles.author}>@{tweet.author.username}</p>
      <p className={styles.content}>{tweet.content}</p>
      <div className={styles.actions}>
        <button onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'} {tweet.likes.length}
        </button>
        {isMine && <button onClick={handleDelete}>🗑️ Supprimer</button>}
      </div>
    </div>
  );
}