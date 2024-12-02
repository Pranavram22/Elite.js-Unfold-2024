export interface Web3Error extends Error {
  code: number;
  data?: unknown;
}

export interface NetworkConfig {
  chainId: number;
  name: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrl: string;
  blockExplorer: string;
}

export const SUPPORTED_NETWORKS: Record<number, NetworkConfig> = {
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    currency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
    blockExplorer: 'https://etherscan.io',
  },
  5: {
    chainId: 5,
    name: 'Goerli Testnet',
    currency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/your-api-key',
    blockExplorer: 'https://goerli.etherscan.io',
  },
};