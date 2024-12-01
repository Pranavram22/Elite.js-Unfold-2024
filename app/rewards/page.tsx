"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Gift, Trophy, Target, TrendingUp } from "lucide-react";

export default function Rewards() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Your Health Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">1,250 WELL</div>
            <div className="text-muted-foreground mb-4">
              Current token balance
            </div>
            <Button>Claim Rewards</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Steps Goal (10,000)</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Sleep Goal (8hrs)</span>
                <span>90%</span>
              </div>
              <Progress value={90} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Exercise Goal (30min)</span>
                <span>60%</span>
              </div>
              <Progress value={60} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewards History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "Completed daily exercise", amount: 50 },
                { activity: "Sleep goal achieved", amount: 30 },
                { activity: "Health checkup completed", amount: 100 },
              ].map((reward, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    <span>{reward.activity}</span>
                  </div>
                  <span className="font-bold">+{reward.amount} WELL</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}