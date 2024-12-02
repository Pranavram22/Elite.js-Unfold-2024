import React from 'react';
import { Network } from 'lucide-react';
import { useWeb3Store } from '../stores/web3Store';
import { SUPPORTED_NETWORKS } from '../types/web3';
import { switchNetwork } from '../utils/web3';

export function NetworkSelector() {
  const { provider, chainId } = useWeb3Store();
  const currentNetwork = chainId ? SUPPORTED_NETWORKS[chainId] : null;

  const handleNetworkSwitch = async (newChainId: number) => {
    if (!provider) return;
    try {
      await switchNetwork(provider, newChainId);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Network className="w-5 h-5 mr-2" />
        <span>{currentNetwork?.name || 'Unsupported Network'}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu">
          {Object.values(SUPPORTED_NETWORKS).map((network) => (
            <button
              key={network.chainId}
              onClick={() => handleNetworkSwitch(network.chainId)}
              className={`block w-full px-4 py-2 text-sm text-left ${
                chainId === network.chainId
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="menuitem"
            >
              {network.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}