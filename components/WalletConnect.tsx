"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/hooks/useWallet";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const { account, isConnecting, connect } = useWallet();

  return (
    <Button 
      onClick={connect} 
      disabled={isConnecting}
      className="flex items-center gap-2"
    >
      <Wallet className="h-4 w-4" />
      {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
    </Button>
  );
}