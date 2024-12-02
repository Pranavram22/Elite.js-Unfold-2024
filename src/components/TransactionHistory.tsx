import React, { useEffect, useState } from 'react';
import { useWeb3Store } from '../stores/web3Store';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

export function TransactionHistory() {
  const { provider, account } = useWeb3Store();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!provider || !account) return;

      try {
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        if (!block) return;

        const txs = await Promise.all(
          block.transactions.slice(0, 10).map(async (hash) => {
            const tx = await provider.getTransaction(hash);
            if (!tx) return null;
            return {
              hash: tx.hash,
              from: tx.from,
              to: tx.to || '',
              value: tx.value.toString(),
              timestamp: block.timestamp
            };
          })
        );

        setTransactions(txs.filter((tx): tx is Transaction => tx !== null));
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [provider, account]);

  if (isLoading) {
    return <div className="text-center py-4">Loading transactions...</div>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.hash} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {tx.from.toLowerCase() === account?.toLowerCase() ? (
                <ArrowUpRight className="w-5 h-5 text-red-500" />
              ) : (
                <ArrowDownLeft className="w-5 h-5 text-green-500" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {tx.from.toLowerCase() === account?.toLowerCase() ? 'Sent' : 'Received'}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(tx.timestamp * 1000).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {Number(tx.value) / 1e18} ETH
              </p>
              <a
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                View on Etherscan
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}