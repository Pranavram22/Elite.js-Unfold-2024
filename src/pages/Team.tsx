import React from 'react';
import { Users, MessageSquare, Calendar, UserPlus } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastActive: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'online',
    lastActive: 'Now'
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    status: 'busy',
    lastActive: '5m ago'
  },
  {
    id: '3',
    name: 'Carol Williams',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    status: 'offline',
    lastActive: '2h ago'
  }
];

export default function Team() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Collaboration</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <UserPlus className="w-5 h-5 mr-2" />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-semibold text-gray-900">{teamMembers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Discussions</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Meetings</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Team Members</h2>
        </div>
        <div className="divide-y">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></span>
                  <span className="text-sm text-gray-500">{member.lastActive}</span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}