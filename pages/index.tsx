import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import List from './list';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blackpool</title>
        <meta
          content="Onchain phishing website blocklist"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Blackpool
        </h1>

        <List />
      </main>
    </div>
  );
};

export default Home;
