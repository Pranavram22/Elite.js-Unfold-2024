import React from 'react';
import { BarChart3, Users, Clock, TrendingUp } from 'lucide-react';
import { AnalyticsChart } from '../components/AnalyticsChart';

const stats = [
  { label: 'Total Tasks', value: '24', icon: Clock, color: 'bg-blue-500' },
  { label: 'Active Projects', value: '12', icon: BarChart3, color: 'bg-green-500' },
  { label: 'Team Members', value: '8', icon: Users, color: 'bg-purple-500' },
  { label: 'Revenue Growth', value: '+28%', icon: TrendingUp, color: 'bg-yellow-500' },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <AnalyticsChart />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          <div className="space-y-4">
            {['Website Redesign', 'Client Meeting', 'Project Proposal'].map((task) => (
              <div key={task} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}