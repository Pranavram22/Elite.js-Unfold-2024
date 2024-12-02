import { ethers } from 'ethers';

export const PAYMENT_PROCESSOR_ABI = [
  "function processPayment(address recipient, uint256 amount) external payable",
  "function withdrawFunds(uint256 amount) external",
  "function getBalance() external view returns (uint256)",
  "event PaymentProcessed(address indexed sender, address indexed recipient, uint256 amount, uint256 timestamp)",
  "event FundsWithdrawn(address indexed account, uint256 amount, uint256 timestamp)"
];

export const PAYMENT_PROCESSOR_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

export class PaymentProcessor {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(provider: ethers.BrowserProvider, signer: ethers.Signer) {
    this.contract = new ethers.Contract(PAYMENT_PROCESSOR_ADDRESS, PAYMENT_PROCESSOR_ABI, provider);
    this.signer = signer;
  }

  async processPayment(recipient: string, amount: string) {
    try {
      const tx = await this.contract.connect(this.signer).processPayment(
        recipient,
        ethers.parseEther(amount),
        { value: ethers.parseEther(amount) }
      );
      return await tx.wait();
    } catch (error) {
      console.error('Payment processing failed:', error);
      throw error;
    }
  }

  async withdrawFunds(amount: string) {
    try {
      const tx = await this.contract.connect(this.signer).withdrawFunds(
        ethers.parseEther(amount)
      );
      return await tx.wait();
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw error;
    }
  }

  async getBalance() {
    try {
      const balance = await this.contract.getBalance();
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }
}