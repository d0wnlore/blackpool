import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
const List = dynamic(
  () => import('./list'),
  { ssr: false }
);
const Add = dynamic(
  () => import('./add'),
  { ssr: false }
);
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useNetwork } from 'wagmi';

const Home: NextPage = () => {
  const { chain } = useNetwork();

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

        {chain && <>
          <List chainId={chain.id} />
          <Add chainId={chain.id} />
        </>}
      </main>
    </div>
  );
};

export default Home;
