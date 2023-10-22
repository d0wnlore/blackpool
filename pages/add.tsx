import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import CONTRACT_ADDRESSES from './contracts';
import styles from '../styles/Add.module.css';

function AddSite({chainId}) {
  const [site, setSite] = useState('');
  const [siteSubmitted, setSiteSubmitted] = useState('');

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESSES[chainId] as `0x${string}`,
    abi: [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "url",
            "type": "string"
          }
        ],
        "name": "addSite",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'addSite',
    args: [site]
  })

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction(({
    hash: data?.hash,
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
        setSiteSubmitted(site);
      }}
      className={styles.add}
    >
      <label htmlFor="site">Submit a phishing website for eternal damnation…</label>
      <fieldset className={styles.submitFieldset}>
        <input
          id="site"
          onChange={(e) => setSite(e.target.value)}
          placeholder="usdt.ethereum-support.xyz"
          value={site}
          autoComplete="off"
        />
        <button disabled={!write || isLoading}>{isLoading ? '…' : 'Submit'}</button>
      </fieldset>
      {isSuccess && (
        <p className={styles.success}>
          {siteSubmitted} <br/>was inscribed into <span className={styles.highlight}>The Eternal Blocklist</span> on {chainId === 534351 ? 'Scroll' : 'Mantle'}
        </p>
      )}
    </form>
  );
}

export default AddSite;