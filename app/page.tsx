'use client'
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount } from 'wagmi';
// import { useReadContract } from 'wagmi'
// import { abi } from '@/lib/constants';
import LandingPageHeroSection from '@/components/LandingPageHeroSection';
import LandingPageFeaturesSection from '@/components/LandingPageFeaturesSection';
import Link from 'next/link';
import LandingPageFooter from '@/components/LandingPageFooter';
import { ThemeToggle } from '@/components/theme-toggle';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Home() {

  // const {address} = useAccount()

  // const listingPrice = useReadContract({
  //   abi,
  //   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  //   functionName: 'getListingPrice'
  // }).data

  // const nftContractAddress = useReadContract({
  //   abi,
  //   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  //   functionName: 'getBasicNftContractAddress'
  // }).data

  return (
    // <BackgroundGradientAnimation>
    <div>
      {/* <nav className='flex justify-end p-4'>
        <ConnectButton />
      </nav> */}
      {/* <div>
        <p>{`Address: ${address}`}</p>
        <p>{`Listing Price: ${listingPrice}`}</p>
        <p>{`NFT Contract Address: ${nftContractAddress}`}</p>
      </div> */}
      <div className=
      // 'bg-gradient-to-br from-purple-800 via-violet-900 to-blue-900 opacity-50'
      'p-6'
      >
        <div className='flex justify-between'>
          <Link href={"/"} >
              <span className="font-bold text-primary  text-3xl tracking-wider ms-4">CartooNFT</span>
          </Link>
          <div className='flex space-x-4'>
            <ConnectButton />
            <ThemeToggle />
          </div>
        </div>
        {/* <BackgroundGradientAnimation> */}
          <LandingPageHeroSection />
        {/* </BackgroundGradientAnimation> */}
      </div>
      <LandingPageFeaturesSection />
      <LandingPageFooter />
    </div>
    // {/* </BackgroundGradientAnimation> */}
  );
}
