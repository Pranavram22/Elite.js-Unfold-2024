import { create } from 'zustand';
import { ethers } from 'ethers';
import { PaymentProcessor } from '../contracts/PaymentProcessor';

interface Web3State {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  paymentProcessor: PaymentProcessor | null;
  balance: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  updateBalance: () => Promise<void>;
}

export const useWeb3Store = create<Web3State>((set, get) => ({
  isConnected: false,
  account: null,
  chainId: null,
  provider: null,
  signer: null,
  paymentProcessor: null,
  balance: null,

  connect: async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const chainId = Number(await provider.send('eth_chainId', []));
      const paymentProcessor = new PaymentProcessor(provider, signer);
      const balance = await provider.getBalance(accounts[0]);

      set({
        isConnected: true,
        account: accounts[0],
        chainId,
        provider,
        signer,
        paymentProcessor,
        balance: ethers.formatEther(balance)
      });

      // Setup event listeners
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          get().disconnect();
        } else {
          set({ account: accounts[0] });
          get().updateBalance();
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        set({ chainId: Number(chainId) });
      });

    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  },

  disconnect: () => {
    set({
      isConnected: false,
      account: null,
      chainId: null,
      provider: null,
      signer: null,
      paymentProcessor: null,
      balance: null
    });
  },

  updateBalance: async () => {
    const { provider, account } = get();
    if (provider && account) {
      const balance = await provider.getBalance(account);
      set({ balance: ethers.formatEther(balance) });
    }
  }
}));