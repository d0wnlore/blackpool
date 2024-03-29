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

      <header className={styles.header}>
        <h1>Blackpool</h1>
        <ConnectButton showBalance={false} />
      </header>

      <main className={styles.main}>
        <h2 className={styles.title}><span className={styles.eternal}>Eternal <sub>(onchain)</sub></span> damnation for crypto phishing websites</h2>
        <div className={styles.front}>
          <div className={styles.primer}>
            <p>Blackpool is a community-curated blocklist of phishing websites</p>
            <ul>
              <li>Inscribe malicious websites to Blackpool’s eternal blocklist</li>
              <li>Use Blackpool’s blocklist to protect yourself or your users</li>
              <li>Toss a coin to addresses that have contributed to Blackpool</li>
            </ul>
            {chain && <div className={styles.add}>
              <Add chainId={chain.id} />
            </div>}
          </div>
          {chain ?
          <List chainId={chain.id} /> : <div className={styles.connect}>Connect Wallet to observe The Eternal<br/>Blocklist and submit websites for damnation</div>}
        </div>
      </main>
    </div>
  );
};

export default Home;
