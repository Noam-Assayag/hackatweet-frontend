import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../reducers/user';
import LastTweets from './LastTweets';
import Trends from './Trends';
import styles from '../styles/Home.module.css';

export default function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const [content, setContent] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleContentChange = (e) => {
    if (e.target.value.length <= 280) {
      setContent(e.target.value);
    }
  };

  const handleSubmitTweet = () => {
    if (!content.trim()) return;

    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setContent('');
          setRefreshKey((k) => k + 1);
        } else {
          console.error('Erreur tweet:', data.error);
        }
      });
  };

  return (
    <div className={styles.container}>
      {/* Section gauche */}
      <div className={styles.leftSection}>
        <img
          src="/logo.png"
          alt="logo"
          onClick={() => router.push('/')}
          className={styles.logo}
        />
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <div className={styles.avatarInner}></div>
          </div>
          <div className={styles.userText}>
            <p className={styles.displayName}>{user.firstname}</p>
            <p className={styles.username}>@{user.username}</p>
          </div>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Section centrale */}
      <div className={styles.middleSection}>
        <div className={styles.tweetForm}>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={handleContentChange}
            placeholder="What's happening?"
          />
          <p className={styles.charCount}>{content.length} / 280</p>
          <button
            className={styles.tweetButton}
            onClick={handleSubmitTweet}
            disabled={!content.trim()}
          >
            Tweet
          </button>
        </div>

        <h3>Last tweets</h3>
        <LastTweets
          refreshTrigger={refreshKey}
          onTweetsChange={() => setRefreshKey((k) => k + 1)}
        />
      </div>

      {/* Section droite */}
      <div className={styles.rightSection}>
        <Trends refreshTrigger={refreshKey} />
      </div>
    </div>
  );
}