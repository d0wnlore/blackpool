import { useContractRead, useContractWrite } from 'wagmi';
import { parseEther } from 'viem'
import { useState } from 'react';
import Link from 'next/link'
import CONTRACT_ADDRESSES from './contracts';
import styles from '../styles/List.module.css';

function List({chainId}) {
  const [siteList, setSiteList] = useState([]);

  useContractRead({
    address: CONTRACT_ADDRESSES[chainId] as `0x${string}`,
    abi: [{
      "inputs": [],
      "name": "getAllSites",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }],
    functionName: 'getAllSites',
    onSettled(data, error) {
      setSiteList(data);
    },
    watch: true
  })

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESSES[chainId] as `0x${string}`,
    abi: [{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "siteIndex",
          "type": "uint256"
        }
      ],
      "name": "tipSiteOwner",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }],
    functionName: 'tipSiteOwner',
    value: chainId === 534351 ? parseEther('0.001337') : parseEther('0.1337')
  })

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.title}><span>The Eternal Blocklist</span> on {chainId === 534351 ? 'Scroll' : 'Mantle'}</h2>
      <p className={styles.tip}>Hint: click a website to tip its Reporter</p>
      <ul className={styles.list}>
        {siteList.map((site, index) => (
          <li key={index} onClick={() => write({args: [index]})} className={styles.listItem}>{site}</li>
        ))}
      </ul>
      {chainId === 534351 && <p className={styles.dl}><Link href="https://api.studio.thegraph.com/query/56066/blackpool-scrollsepolia/version/latest">Blackpool’s Subgraph on The GraphiQL</Link></p>}
    </div>
  )
}

export default List;
