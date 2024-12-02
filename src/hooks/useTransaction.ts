import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { useWeb3Store } from '../stores/web3Store';

interface UseTransactionOptions {
  onSuccess?: (receipt: ethers.TransactionReceipt) => void;
  onError?: (error: Error) => void;
}

export function useTransaction(options: UseTransactionOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const { provider, signer, chainId } = useWeb3Store();

  const sendTransaction = async (
    to: string,
    amount: string,
    data?: string
  ): Promise<ethers.TransactionReceipt | undefined> => {
    if (!provider || !signer) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setIsLoading(true);
      const toastId = toast.loading('Preparing transaction...');

      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
        data: data || '0x',
      });

      toast.loading('Transaction submitted. Waiting for confirmation...', { id: toastId });
      
      const receipt = await tx.wait();
      
      toast.success('Transaction confirmed!', { id: toastId });
      options.onSuccess?.(receipt);
      
      return receipt;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transaction failed';
      toast.error(message);
      options.onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendTransaction,
    isLoading,
  };
}