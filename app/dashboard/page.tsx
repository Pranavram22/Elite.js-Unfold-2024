"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthMetrics } from "@/components/health/HealthMetrics";
import { HealthTrends } from "@/components/health/HealthTrends";
import { useWallet } from "@/lib/hooks/useWallet";

export default function Dashboard() {
  const { account } = useWallet();
  const userId = account || '';

  if (!account) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Connect Wallet</h1>
        <p>Please connect your wallet to view your health dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Health Dashboard</h1>
      
      <HealthMetrics userId={userId} />

      <Tabs defaultValue="trends" className="mt-6">
        <TabsList>
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>
        <TabsContent value="trends">
          <HealthTrends userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}