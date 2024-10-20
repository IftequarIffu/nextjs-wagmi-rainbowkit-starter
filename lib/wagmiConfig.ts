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
import { WALLETCONNECT_PROJECT_ID } from './constants';

export const config = getDefaultConfig({
  appName: 'Iffu Dapps',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    anvil,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});
