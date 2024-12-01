import React, { useState } from 'react';
import { Plus, Check, Clock, AlertCircle } from 'lucide-react';
import type { Task } from '../types';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Draft and finalize the Q2 project proposal',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-25',
    assignee: 'John Doe'
  },
  {
    id: '2',
    title: 'Client Meeting Preparation',
    description: 'Prepare presentation and materials for client meeting',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-03-26',
    assignee: 'Jane Smith'
  }
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
        <button
          onClick={() => setShowNewTaskForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['todo', 'in-progress', 'completed'].map((status) => (
          <div key={status} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 capitalize">{status.replace('-', ' ')}</h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}