import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useWeb3Store } from '../stores/web3Store';
import { useTransaction } from '../hooks/useTransaction';
import { ethers } from 'ethers';

export function PaymentForm() {
  const { isConnected } = useWeb3Store();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { sendTransaction, isLoading } = useTransaction({
    onSuccess: () => {
      setRecipient('');
      setAmount('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ethers.isAddress(recipient)) {
      return;
    }

    await sendTransaction(recipient, amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0x..."
          required
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (ETH)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.0001"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.0"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !isConnected}
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          'Processing...'
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Payment
          </>
        )}
      </button>
    </form>
  );
}