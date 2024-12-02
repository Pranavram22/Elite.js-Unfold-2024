import React from 'react';
import { Wallet } from 'lucide-react';
import { useWeb3Store } from '../stores/web3Store';
import { toast } from 'react-hot-toast';

export function WalletConnect() {
  const { isConnected, account, balance, connect, disconnect } = useWeb3Store();

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Wallet className="w-5 h-5 mr-2" />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="px-4 py-2 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">Balance</p>
        <p className="font-medium">{Number(balance).toFixed(4)} ETH</p>
      </div>
      <div className="px-4 py-2 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">Account</p>
        <p className="font-medium">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
      </div>
      <button
        onClick={handleDisconnect}
        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
}