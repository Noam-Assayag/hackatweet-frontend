import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
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
      <div className={styles.avatar}>
        <div className={styles.avatarInner}></div>
      </div>
      <div className={styles.tweetBody}>
        <p className={styles.author}>@{tweet.author.username}</p>
        <p className={styles.content}>{tweet.content}</p>
        <div className={styles.actions}>
          <button onClick={handleLike}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: isLiked ? '#e0245e' : '#8899a6' }}
            />{' '}
            {tweet.likes.length}
          </button>
          {isMine && (
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}