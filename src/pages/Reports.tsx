import React from 'react';
import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { PieChartComponent } from '../components/PieChartComponent';

export default function Reports() {
  const metrics = [
    { label: 'Total Revenue', value: '$45,750', trend: '+12.5%', positive: true },
    { label: 'Active Projects', value: '24', trend: '+8.3%', positive: true },
    { label: 'Task Completion', value: '87%', trend: '-2.1%', positive: false },
    { label: 'Customer Satisfaction', value: '4.8/5', trend: '+0.3%', positive: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Download className="w-5 h-5 mr-2" />
          Export Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">{metric.label}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{metric.value}</p>
            <div className="flex items-center mt-2">
              <TrendingUp className={`w-4 h-4 ${metric.positive ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`ml-1 text-sm ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
          <AnalyticsChart />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
          <PieChartComponent />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Insights</h2>
        <div className="space-y-4">
          {['Team Productivity', 'Project Progress', 'Resource Utilization'].map((metric) => (
            <div key={metric} className="flex items-center justify-between">
              <span className="text-gray-700">{metric}</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}