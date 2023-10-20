import { useContractRead } from 'wagmi';
import { useState } from 'react';

const CONTRACT_ADDRESSES = {
  534351: '0x933d213bC4F704Aca1c1fade4a961Ef2fa22D7F7',
  5001: '0xD30e9367171CB05aC5E00ae195A015225F2848e1'
}

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
      console.log('Settled', { data, error});
    }
  })

  return (
    <div>
      <p>{chainId}</p>
      <ul>
        {siteList.map((site, index) => (
          <li key={index}>{site}</li>
        ))}
      </ul>
    </div>
  )
}

export default List;
