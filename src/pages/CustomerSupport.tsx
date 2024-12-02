import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useTicketStore } from '../stores/ticketStore';
import { toast } from 'react-hot-toast';
import type { CustomerTicket } from '../types';

export default function CustomerSupport() {
  const { tickets, addTicket, updateTicketStatus } = useTicketStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as CustomerTicket['priority'],
    customerEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTicket({
      ...newTicket,
      status: 'open',
    });
    setIsModalOpen(false);
    setNewTicket({
      subject: '',
      description: '',
      priority: 'medium',
      customerEmail: '',
    });
    toast.success('Support ticket created successfully!');
  };

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
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
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <select
                    value={ticket.status}
                    onChange={(e) => updateTicketStatus(ticket.id, e.target.value as CustomerTicket['status'])}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Support Ticket"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={newTicket.subject}
              onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={newTicket.priority}
              onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as CustomerTicket['priority'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Customer Email
            </label>
            <input
              type="email"
              id="email"
              value={newTicket.customerEmail}
              onChange={(e) => setNewTicket({ ...newTicket, customerEmail: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}