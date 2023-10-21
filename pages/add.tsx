import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const CONTRACT_ADDRESSES = {
  534351: '0x0E6B794a2a52cC242cB6741ecdF2F2d3DDfF8cf4',
  5001: '0x7BBCFA69E1A4e380C932140834cb000801955dbb'
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