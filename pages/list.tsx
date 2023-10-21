import { useContractRead, useContractWrite } from 'wagmi';
import { parseEther } from 'viem'
import { useState } from 'react';

const CONTRACT_ADDRESSES = {
  534351: '0x57B1305227FD3c3c7DE018231Cbb323f3B1d6e4f',
  5001: '0xF5c0b4cc4DdFa2c42DEf50F75B56a13CE3298687'
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
