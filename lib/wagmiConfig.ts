import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  anvil
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Iffu Dapps',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    anvil,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});
