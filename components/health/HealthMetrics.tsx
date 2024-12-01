"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Calendar, Pill } from "lucide-react";
import { useHealthData } from "@/lib/hooks/useHealthData";
import { useBalances } from "@/lib/hooks/useBalances";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  isLoading?: boolean;
}

function MetricCard({ title, value, icon, isLoading }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? "Loading..." : value}
        </div>
      </CardContent>
    </Card>
  );
}

export function HealthMetrics({ userId }: { userId: string }) {
  const { healthData, isLoading: healthLoading } = useHealthData(userId);
  const { solana: solanaBalance, base: baseBalance, isLoading: balanceLoading } = useBalances(userId);

  const latestData = healthData[healthData.length - 1]?.data || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="SOL Balance"
        value={`${solanaBalance.toFixed(4)} SOL`}
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        isLoading={balanceLoading}
      />
      <MetricCard
        title="Base Balance"
        value={`${Number(baseBalance).toFixed(4)} ETH`}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        isLoading={balanceLoading}
      />
      <MetricCard
        title="Health Score"
        value={`${latestData.healthScore || 0}/100`}
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        isLoading={healthLoading}
      />
      <MetricCard
        title="Reward Points"
        value={latestData.rewardPoints || 0}
        icon={<Pill className="h-4 w-4 text-muted-foreground" />}
        isLoading={healthLoading}
      />
    </div>
  );
}