import { ethers } from 'ethers';
import { SUPPORTED_NETWORKS, type NetworkConfig, type Web3Error } from '../types/web3';

export async function switchNetwork(provider: ethers.BrowserProvider, chainId: number): Promise<void> {
  try {
    await provider.send('wallet_switchEthereumChain', [
      { chainId: `0x${chainId.toString(16)}` },
    ]);
  } catch (error) {
    const web3Error = error as Web3Error;
    // If the chain hasn't been added to MetaMask
    if (web3Error.code === 4902) {
      await addNetwork(provider, SUPPORTED_NETWORKS[chainId]);
    } else {
      throw error;
    }
  }
}

export async function addNetwork(
  provider: ethers.BrowserProvider,
  networkConfig: NetworkConfig
): Promise<void> {
  await provider.send('wallet_addEthereumChain', [
    {
      chainId: `0x${networkConfig.chainId.toString(16)}`,
      chainName: networkConfig.name,
      nativeCurrency: networkConfig.currency,
      rpcUrls: [networkConfig.rpcUrl],
      blockExplorerUrls: [networkConfig.blockExplorer],
    },
  ]);
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatBalance(balance: string, decimals: number = 4): string {
  return Number(balance).toFixed(decimals);
}

export function getExplorerUrl(chainId: number, hash: string, type: 'tx' | 'address'): string {
  const network = SUPPORTED_NETWORKS[chainId];
  if (!network) return '';
  return `${network.blockExplorer}/${type}/${hash}`;
}