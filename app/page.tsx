'use client'
import LandingPageHeroSection from '@/components/LandingPageHeroSection';
import LandingPageFeaturesSection from '@/components/LandingPageFeaturesSection';
import Link from 'next/link';
import LandingPageFooter from '@/components/LandingPageFooter';
import { ThemeToggle } from '@/components/theme-toggle';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Home() {

  return (
    <div>
    
      <div className='p-6'>
        <div className='flex justify-between'>
          <Link href={"/"} >
              <span className="font-bold text-primary  text-3xl tracking-wider ms-4">CartooNFT</span>
          </Link>
          <div className='flex space-x-4'>
            <ConnectButton />
            <ThemeToggle />
          </div>
        </div>
          <LandingPageHeroSection />
      </div>
      <LandingPageFeaturesSection />
      <LandingPageFooter />
    </div>
  );
}
