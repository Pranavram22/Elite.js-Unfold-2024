import React from 'react';
import { WalletConnect } from '../components/WalletConnect';
import { NetworkSelector } from '../components/NetworkSelector';
import { PaymentForm } from '../components/PaymentForm';
import { TransactionHistory } from '../components/TransactionHistory';
import { useWeb3Store } from '../stores/web3Store';

export default function DigitalPayments() {
  const { isConnected } = useWeb3Store();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Digital Payments</h1>
        <div className="flex items-center space-x-4">
          <NetworkSelector />
          <WalletConnect />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Send Payment</h2>
          <PaymentForm />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
          {isConnected ? (
            <TransactionHistory />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Connect your wallet to view transactions
            </div>
          )}
        </div>
      </div>
    </div>
  );
}