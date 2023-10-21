import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const CONTRACT_ADDRESSES = {
  534351: '0x57B1305227FD3c3c7DE018231Cbb323f3B1d6e4f',
  5001: '0xF5c0b4cc4DdFa2c42DEf50F75B56a13CE3298687'
}

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
    >
      <label htmlFor="site">Suspicious Site URL</label>
      <input
        id="site"
        onChange={(e) => setSite(e.target.value)}
        placeholder="cutescam.uwu"
        value={site}
      />
      <button disabled={!write}>Submit</button>
    </form>
  );
}

export default AddSite;