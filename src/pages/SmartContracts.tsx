import React, { useState } from 'react';
import { Code2, Plus, ExternalLink, Activity, AlertCircle } from 'lucide-react';
import { useEthereum } from '../hooks/useEthereum';
import { toast } from 'react-hot-toast';
import type { SmartContract } from '../types';

const sampleContracts: SmartContract[] = [
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Payment Processor',
    description: 'Smart contract for processing automated payments',
    network: 'Ethereum Mainnet',
    status: 'active',
    createdAt: '2024-03-15',
    lastInteraction: '2024-03-20',
    balance: '0.5 ETH'
  },
  {
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    name: 'Token Vault',
    description: 'Secure storage for digital assets',
    network: 'Polygon',
    status: 'active',
    createdAt: '2024-03-10',
    lastInteraction: '2024-03-19',
    balance: '1000 MATIC'
  }
];

export default function SmartContracts() {
  const { account, provider } = useEthereum();
  const [contracts] = useState<SmartContract[]>(sampleContracts);
  const [showNewContractForm, setShowNewContractForm] = useState(false);

  const handleDeployContract = async () => {
    if (!provider || !account) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    toast.loading('Preparing to deploy smart contract...');
    // Contract deployment logic would go here
    toast.success('Smart contract deployed successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Smart Contracts</h1>
        <button
          onClick={() => setShowNewContractForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Deploy New Contract
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Code2 className="w-6 h-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Wallet Connection</h2>
              <p className="text-sm text-gray-600">
                {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
              </p>
            </div>
          </div>
          {!account && (
            <button
              onClick={() => window.ethereum?.request({ method: 'eth_requestAccounts' })}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {contracts.map((contract) => (
          <div key={contract.address} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{contract.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                contract.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {contract.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Network</p>
                <p className="font-medium">{contract.network}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="font-medium">{contract.balance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium">{new Date(contract.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Activity</p>
                <p className="font-medium">{contract.lastInteraction ? new Date(contract.lastInteraction).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                View Transactions
              </button>
              <a
                href={`https://etherscan.io/address/${contract.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View on Explorer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}