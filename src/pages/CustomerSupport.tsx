import React from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { CustomerTicket } from '../types';

const tickets: CustomerTicket[] = [
  {
    id: '1',
    subject: 'Payment Processing Issue',
    description: 'Unable to process customer payment through the platform',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-20T10:30:00',
    customerEmail: 'customer@example.com'
  },
  {
    id: '2',
    subject: 'Account Access Problem',
    description: 'Customer cannot log into their account',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-03-19T15:45:00',
    customerEmail: 'support@example.com'
  }
];

export default function CustomerSupport() {
  const getStatusIcon = (status: CustomerTicket['status']) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getPriorityClass = (priority: CustomerTicket['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <MessageSquare className="w-5 h-5 mr-2" />
          New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['All Tickets', 'Open', 'In Progress', 'Resolved'].map((status, index) => (
          <div key={status} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{status}</h3>
            <p className="text-3xl font-bold text-gray-900">
              {index === 0 ? tickets.length : tickets.filter(t => 
                t.status === status.toLowerCase().replace(' ', '-')
              ).length}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Support Tickets</h2>
        </div>
        <div className="divide-y">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(ticket.status)}
                  <h3 className="ml-3 font-medium text-gray-900">{ticket.subject}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{ticket.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">ID: #{ticket.id}</span>
                <span className="mr-4">Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                <span>Customer: {ticket.customerEmail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}