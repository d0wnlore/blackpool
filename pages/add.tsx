import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import CONTRACT_ADDRESSES from './contracts';
import styles from '../styles/Add.module.css';

function AddSite({chainId}) {
  const [site, setSite] = useState('');

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

  const { write } = useContractWrite(config);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
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
        <button disabled={!write}>Submit</button>
      </fieldset>
    </form>
  );
}

export default AddSite;