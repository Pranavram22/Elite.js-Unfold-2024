import { create } from 'zustand';
import type { Task } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
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
  ],

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }]
  })),

  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    )
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),

  reorderTasks: (tasks) => set({ tasks })
}));