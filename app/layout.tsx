import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import '@rainbow-me/rainbowkit/styles.css';
import { ThemeProvider } from "./theme-provider"
import { Fredoka } from "next/font/google"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Toaster } from "@/components/ui/toaster";
// import { ConnectButton } from '@rainbow-me/rainbowkit';


const fredoka = Fredoka({ subsets: ['latin'] })

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "CartooNFT",
  description: "An NFT Marketplace for Cartoons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} tracking-wide`}
      >
        <Providers>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Toaster /> */}
            {/* <nav className='flex justify-end p-4'>
              <ConnectButton />
            </nav> */}
            {/* <BackgroundGradientAnimation> */}
              {children}
            {/* </BackgroundGradientAnimation> */}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
