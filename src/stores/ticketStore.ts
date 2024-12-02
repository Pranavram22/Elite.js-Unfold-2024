import { create } from 'zustand';
import type { CustomerTicket } from '../types';

interface TicketStore {
  tickets: CustomerTicket[];
  addTicket: (ticket: Omit<CustomerTicket, 'id' | 'createdAt'>) => void;
  updateTicketStatus: (id: string, status: CustomerTicket['status']) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [
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
  ],

  addTicket: (ticket) => set((state) => ({
    tickets: [
      ...state.tickets,
      {
        ...ticket,
        id: (state.tickets.length + 1).toString(),
        createdAt: new Date().toISOString(),
      },
    ],
  })),

  updateTicketStatus: (id, status) => set((state) => ({
    tickets: state.tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status } : ticket
    ),
  })),
}));