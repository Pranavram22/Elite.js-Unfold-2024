"use client";

import { useState } from 'react';
import { calculateRewards, distributeRewards } from '../blockchain/rewards';

export function useRewards(userAddress: string) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const claimRewards = async (healthScore: number) => {
    try {
      setIsProcessing(true);
      const rewardAmount = await calculateRewards(healthScore);
      const txHash = await distributeRewards(userAddress, rewardAmount);
      return { success: true, amount: rewardAmount, txHash };
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return { claimRewards, isProcessing, error };
}