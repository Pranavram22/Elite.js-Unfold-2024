"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useHealthData } from "@/lib/hooks/useHealthData";

export function HealthTrends({ userId }: { userId: string }) {
  const { healthData, isLoading } = useHealthData(userId);

  if (isLoading) {
    return <div>Loading health trends...</div>;
  }

  const chartData = healthData.map((data) => ({
    date: new Date(data.timestamp).toLocaleDateString(),
    ...data.data,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
            <Line type="monotone" dataKey="steps" stroke="#82ca9d" name="Steps" />
            <Line type="monotone" dataKey="sleepHours" stroke="#ffc658" name="Sleep Hours" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}