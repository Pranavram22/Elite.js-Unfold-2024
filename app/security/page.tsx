"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Shield, Key, Eye, Lock } from "lucide-react";

export default function Security() {
  const [dataSharing, setDataSharing] = useState(false);
  const [encryption, setEncryption] = useState(true);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Security & Privacy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Data Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Health Data Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Allow healthcare providers to access your data
                </p>
              </div>
              <Switch
                checked={dataSharing}
                onCheckedChange={setDataSharing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  Encrypt all health data
                </p>
              </div>
              <Switch
                checked={encryption}
                onCheckedChange={setEncryption}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Access Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Public Key</label>
              <div className="flex gap-2 mt-1">
                <Input
                  value="0x1234...5678"
                  readOnly
                  className="font-mono"
                />
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Recovery Phrase</label>
              <Button variant="outline" className="w-full mt-1">
                <Lock className="h-4 w-4 mr-2" />
                View Recovery Phrase
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Access Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Data accessed", provider: "Dr. Sarah Johnson", time: "2 hours ago" },
                { action: "Encryption key rotated", provider: "System", time: "1 day ago" },
                { action: "Access granted", provider: "General Hospital", time: "3 days ago" },
              ].map((log, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-muted-foreground">By {log.provider}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{log.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}