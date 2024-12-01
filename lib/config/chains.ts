export const SUPPORTED_CHAINS = {
  base: {
    chainId: '0x14a33',
    name: 'Base',
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL,
    blockExplorer: 'https://goerli.basescan.org',
  },
  solana: {
    cluster: 'devnet',
    rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
    blockExplorer: 'https://explorer.solana.com',
  },
};