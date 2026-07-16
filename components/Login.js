import styles from '../styles/Login.module.css';

function Login() {
  return (
    <main className={styles.container}>
      <section className={styles.leftSection}>
        <img
          src="/background.png"
          alt="Fond Hackatweet"
          className={styles.background}
        />

        <img
          src="/logo.png"
          alt="Logo Hackatweet"
          className={styles.largeLogo}
        />
      </section>

      <section className={styles.rightSection}>
        <img
          src="/logo.png"
          alt="Logo Hackatweet"
          className={styles.smallLogo}
        />

        <h1 className={styles.title}>See what’s happening</h1>

        <h2 className={styles.subtitle}>Join Hackatweet today.</h2>

        <button className={styles.signupButton}>
          Sign up
        </button>

        <p className={styles.accountText}>
          Already have an account?
        </p>

        <button className={styles.signinButton}>
          Sign in
        </button>
      </section>
    </main>
  );
}

export default Login;