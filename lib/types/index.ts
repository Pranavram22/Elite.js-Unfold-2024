export interface HealthData {
  id: string;
  userId: string;
  timestamp: number;
  dataType: 'vitals' | 'activity' | 'medication' | 'checkup';
  data: Record<string, any>;
  signature?: string;
}

export interface UserProfile {
  id: string;
  walletAddress: string;
  name: string;
  email?: string;
  healthScore: number;
  rewardsBalance: number;
  preferences: {
    dataSharing: boolean;
    notifications: boolean;
  };
}

export interface HealthProvider {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  walletAddress: string;
  services: Array<{
    name: string;
    description: string;
    price: number;
    currency: string;
  }>;
}