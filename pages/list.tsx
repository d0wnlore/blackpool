import { useContractRead } from 'wagmi';
import { useState } from 'react';

const CONTRACT_ADDRESSES = {
  534351: '0xcE5a0B27f89FdaB2B1f1809A3560fF82C582f596',
  5001: '0xD30e9367171CB05aC5E00ae195A015225F2848e1'
}

function List({chainId}) {
  const [siteList, setSiteList] = useState(null);

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
      console.log('Settled', { data, error});
    }
  })

  return (
    <div>
      <p>{chainId}</p>
      <p>{siteList}</p>
    </div>
  )
}

export default List;
