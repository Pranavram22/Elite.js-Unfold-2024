import React from 'react';
import { CreditCard, DollarSign, Wallet, History } from 'lucide-react';

export default function DigitalPayments() {
  const paymentMethods = [
    { id: 1, last4: '4242', brand: 'Visa', expMonth: 12, expYear: 2024 },
    { id: 2, last4: '8888', brand: 'Mastercard', expMonth: 8, expYear: 2025 }
  ];

  const recentPayments = [
    { id: 1, amount: 299.99, description: 'Software License', date: '2024-03-20', status: 'completed' },
    { id: 2, amount: 149.50, description: 'Consulting Services', date: '2024-03-19', status: 'pending' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Digital Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Balance</p>
              <p className="text-2xl font-semibold text-gray-900">$12,580.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <History className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-semibold text-gray-900">$450.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Processed</p>
              <p className="text-2xl font-semibold text-gray-900">$45,750.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
          </div>
          <div className="p-6 space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-gray-500 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {method.brand} ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800">Edit</button>
              </div>
            ))}
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <CreditCard className="w-5 h-5 mr-2" />
              Add Payment Method
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Payments</h2>
          </div>
          <div className="divide-y">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{payment.description}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${payment.amount}</p>
                  <p className={`text-sm ${
                    payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}