import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

export function useEthereum() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          const accounts = await provider.send('eth_requestAccounts', []);
          setAccount(accounts[0]);

          window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAccount(accounts[0]);
          });
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
          toast.error('Failed to connect to MetaMask');
        }
      } else {
        toast.error('Please install MetaMask to use this feature');
      }
    };

    init();
  }, []);

  return { account, provider };
}