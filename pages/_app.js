import Head from 'next/head';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Component {...pageProps} />
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}


export default App;

