import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, DollarSign, HeadphonesIcon, CreditCard, Code2, BarChart3, Users } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/tasks', icon: ClipboardList, label: 'Task Management' },
  { path: '/finance', icon: DollarSign, label: 'Financial Management' },
  { path: '/support', icon: HeadphonesIcon, label: 'Customer Support' },
  { path: '/payments', icon: CreditCard, label: 'Digital Payments' },
  { path: '/contracts', icon: Code2, label: 'Smart Contracts' },
  { path: '/reports', icon: BarChart3, label: 'Reports & Analytics' },
  { path: '/team', icon: Users, label: 'Team Collaboration' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">Okto</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-end h-full px-8">
              <NotificationCenter />
            </div>
          </header>

          {/* Page content */}
          <main className="pt-24 pb-8 px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}