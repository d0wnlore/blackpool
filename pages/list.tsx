import { useContractRead, useNetwork } from 'wagmi';
import { useState } from 'react';

function List() {
  const { chain } = useNetwork();
  const [siteList, setSiteList] = useState(null);

  useContractRead({
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
      <p suppressHydrationWarning>{chain && chain.name}</p>
      <p>{siteList}</p>
    </div>
  )
}

export default List;
