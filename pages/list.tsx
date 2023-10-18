'use client'

import { configureChains, useContractRead, useWalletClient } from 'wagmi';
import { publicProvider } from '@wagmi/core/providers/public';
import { scrollSepolia, mantleTestnet } from '@wagmi/core/chains';
import { useEffect, useState } from 'react';

const { chains, publicClient } = configureChains(
  [scrollSepolia, mantleTestnet],
  [publicProvider()]
)
function List() {
  const [siteList, setSiteList] = useState(null);

  const {data, isError, isLoading} = useContractRead({
    address: '0xcE5a0B27f89FdaB2B1f1809A3560fF82C582f596',
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
      console.log('Settled', { data, error});
    }
  });

  return (
    <div>
      <p>{siteList}</p>
    </div>
  )
}

export default List;
