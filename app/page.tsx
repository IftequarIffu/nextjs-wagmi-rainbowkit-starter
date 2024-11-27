'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Home() {

  return (
    <div className='flex p-4 justify-between'>
      <h1>Hello World!</h1>
      <ConnectButton />
    </div>
  );
}
