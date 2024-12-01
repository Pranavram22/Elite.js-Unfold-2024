import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { SUPPORTED_CHAINS } from '../config/chains';

export class SolanaService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(
      SUPPORTED_CHAINS.solana.rpcUrl || 'https://api.devnet.solana.com',
      'confirmed'
    );
  }

  async getBalance(address: string): Promise<number> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting Solana balance:', error);
      throw error;
    }
  }

  async getRecentTransactions(address: string) {
    try {
      const publicKey = new PublicKey(address);
      const transactions = await this.connection.getSignaturesForAddress(publicKey, {
        limit: 10,
      });
      return transactions;
    } catch (error) {
      console.error('Error getting recent transactions:', error);
      throw error;
    }
  }
}

export const solanaService = new SolanaService();