import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Shield, Globe } from 'lucide-react';
import { WalletConnect } from '@/components/WalletConnect';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <WalletConnect />
        </div>

        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-bold tracking-tight mb-4 gradient-text animate-float">
            Welcome to WellChain
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A blockchain-powered preventive healthcare ecosystem empowering users to
            take control of their health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur-md border-primary/10 hover:border-primary/20 transition-colors">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary animate-float" />
              <CardTitle className="text-lg">Secure Health Data</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Decentralized storage and sharing of health data powered by Solana
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-md border-secondary/10 hover:border-secondary/20 transition-colors">
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-secondary animate-float" />
              <CardTitle className="text-lg">Global Healthcare</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Access healthcare services worldwide with cross-chain capabilities
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-md border-accent/10 hover:border-accent/20 transition-colors">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-accent animate-float" />
              <CardTitle className="text-lg">Health Rewards</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Earn tokens for maintaining healthy habits and lifestyle
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-md border-primary/10 hover:border-primary/20 transition-colors">
            <CardHeader className="text-center">
              <Activity className="w-12 h-12 mx-auto mb-4 text-primary animate-float" />
              <CardTitle className="text-lg">AI Health Assistant</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Personalized health insights and preventive care suggestions
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}