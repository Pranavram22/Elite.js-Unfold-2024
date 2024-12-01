"use client";

import { useState, useEffect } from 'react';
import { HealthData } from '../types';
import { storeHealthData, retrieveHealthData } from '../blockchain/health-data';

export function useHealthData(userId: string) {
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHealthData = async () => {
    try {
      setIsLoading(true);
      const data = await retrieveHealthData(userId);
      setHealthData(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const addHealthData = async (data: Omit<HealthData, 'id' | 'userId'>) => {
    try {
      const newData: HealthData = {
        id: crypto.randomUUID(),
        userId,
        ...data,
      };
      await storeHealthData(newData);
      setHealthData((prev) => [...prev, newData]);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, [userId]);

  return { healthData, isLoading, error, addHealthData, refreshData: fetchHealthData };
}