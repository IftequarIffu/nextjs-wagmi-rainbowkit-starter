'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi'
import { abi } from '@/lib/constants';


export default function Home() {

  const {address} = useAccount()

  const listingPrice = useReadContract({
    abi,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    functionName: 'getListingPrice'
  }).data

  const nftContractAddress = useReadContract({
    abi,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    functionName: 'getBasicNftContractAddress'
  }).data

  return (
    <div>
      <nav className='flex justify-end p-4'>
        <ConnectButton />
      </nav>
      <div>
        <p>{`Address: ${address}`}</p>
        <p>{`Listing Price: ${listingPrice}`}</p>
        <p>{`NFT Contract Address: ${nftContractAddress}`}</p>
      </div>
    </div>
  );
}
