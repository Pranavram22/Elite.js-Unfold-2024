import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { 
  Home, 
  Layout, 
  Activity, 
  Gift, 
  Stethoscope, 
  Video,
  BarChart2,
  Shield,
  Settings
} from 'lucide-react';
import { WalletConnect } from '@/components/WalletConnect';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WellChain - Blockchain Healthcare Platform',
  description: 'A decentralized preventive healthcare ecosystem',
};

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: Layout },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Marketplace', href: '/marketplace', icon: Activity },
  { name: 'Telemedicine', href: '/telemedicine', icon: Video },
  { name: 'Rewards', href: '/rewards', icon: Gift },
  { name: 'Providers', href: '/providers', icon: Stethoscope },
  { name: 'Security', href: '/security', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted">
          <nav className="w-64 border-r bg-card/50 backdrop-blur-md p-6 flex flex-col">
            <div className="mb-8">
              <h1 className="text-2xl font-bold gradient-text">WellChain</h1>
            </div>
            <div className="space-y-2 flex-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-3 hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-auto pt-6">
              <WalletConnect />
            </div>
          </nav>
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}