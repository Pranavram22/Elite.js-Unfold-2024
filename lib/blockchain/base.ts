import { ethers } from 'ethers';
import { SUPPORTED_CHAINS } from '../config/chains';

export class BaseService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      SUPPORTED_CHAINS.base.rpcUrl || 'https://goerli.base.org'
    );
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting Base balance:', error);
      throw error;
    }
  }

  async getRecentTransactions(address: string) {
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const block = await this.provider.getBlock(blockNumber);
      return block;
    } catch (error) {
      console.error('Error getting recent transactions:', error);
      throw error;
    }
  }
}

export const baseService = new BaseService();