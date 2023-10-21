import { useContractRead, useContractWrite } from 'wagmi';
import { parseEther } from 'viem'
import { useState } from 'react';

const CONTRACT_ADDRESSES = {
  534351: '0x0E6B794a2a52cC242cB6741ecdF2F2d3DDfF8cf4',
  5001: '0x7BBCFA69E1A4e380C932140834cb000801955dbb'
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
    }
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
    <div>
      <ul>
        {siteList.map((site, index) => (
          <li key={index} onClick={() => write({args: [index]})}>{site}</li>
        ))}
      </ul>
    </div>
  )
}

export default List;
