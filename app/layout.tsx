import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import '@rainbow-me/rainbowkit/styles.css';
import { ThemeProvider } from "./theme-provider"
import { Fredoka } from "next/font/google"
import { Toaster } from "sonner";


const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "My Web3 App",
  description: "My web3 App",
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
            <Toaster richColors position="top-center" />
              
              {children}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
