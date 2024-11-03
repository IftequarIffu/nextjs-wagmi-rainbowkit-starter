import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { APP_NAME } from '@/lib/constants'

export default function LandingPageFooter() {
  return (
    <footer className="">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold ">{APP_NAME}</h2>
            <p className="text-sm">Discover, collect, and sell extraordinary NFTs</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className=" transition-colors">Explore</Link></li>
              <li><Link href="/nfts" className=" transition-colors">All NFTs</Link></li>
              <li><Link href="/collections" className=" transition-colors">Collections</Link></li>
              <li><Link href="/creators" className=" transition-colors">Creators</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold  mb-4">My Account</h3>
            <ul className="space-y-2">
              <li><Link href="/profile" className=" transition-colors">Profile</Link></li>
              <li><Link href="/favorites" className=" transition-colors">Favorites</Link></li>
              <li><Link href="/watchlist" className=" transition-colors">Watchlist</Link></li>
              <li><Link href="/settings" className=" transition-colors">Settings</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold  mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/help-center" className=" transition-colors">Help Center</Link></li>
              <li><Link href="/platform-status" className=" transition-colors">Platform Status</Link></li>
              <li><Link href="/partners" className=" transition-colors">Partners</Link></li>
              <li><Link href="/blog" className=" transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t  flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 {APP_NAME}. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 space-x-4 text-sm">
            <Link href="/privacy-policy" className=" transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className=" transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}