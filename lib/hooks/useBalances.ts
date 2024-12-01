"use client";

import { useState, useEffect } from 'react';
import { solanaService } from '../blockchain/solana';
import { baseService } from '../blockchain/base';

export function useBalances(address: string | null) {
  const [balances, setBalances] = useState({
    solana: 0,
    base: '0',
    isLoading: true,
    error: null as Error | null,
  });

  useEffect(() => {
    async function fetchBalances() {
      if (!address) {
        setBalances(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const [solanaBalance, baseBalance] = await Promise.all([
          solanaService.getBalance(address),
          baseService.getBalance(address),
        ]);

        setBalances({
          solana: solanaBalance,
          base: baseBalance,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setBalances(prev => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
      }
    }

    fetchBalances();
  }, [address]);

  return balances;
}