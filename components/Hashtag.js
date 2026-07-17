import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../reducers/user';
import LastTweets from './LastTweets';
import Trends from './Trends';
import styles from '../styles/Home.module.css';

export default function Hashtag() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const { name } = router.query;

  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/hashtag/${search.trim()}`);
      setSearch('');
    }
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
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search hashtag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <h3>#{name}</h3>
        <LastTweets
          hashtag={name}
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