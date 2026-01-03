import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { addDays, format, subDays, isSameDay } from 'date-fns';

export type TaskType = 'daily' | 'habit' | 'todo';

export interface Reminder {
  id: string;
  time: string; // HH:mm
  enabled: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  completedDates: string[]; 
  streak: number;
  color: string;
  createdAt: string;
  targetPerWeek?: number;
  reminders: Reminder[];
  points: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  requirement: number; // points
  unlocked: boolean;
  icon: string;
}

const QUOTES = [
  "Quality is not an act, it is a habit.",
  "Your habits will determine your future.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "Small daily improvements over time lead to stunning results.",
  "Success is the sum of small efforts, repeated day in and day out.",
];

interface StoreState {
  tasks: Task[];
  points: number;
  rewards: Reward[];
  currentQuote: string;
  addTask: (task: Omit<Task, 'id' | 'completedDates' | 'streak' | 'createdAt' | 'points'>) => void;
  toggleTaskCompletion: (id: string, date: Date) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  refreshQuote: () => void;
  getSummary: () => { total: number; completedToday: number; completionRate: number; missedDays: number };
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      tasks: [],
      points: 0,
      currentQuote: QUOTES[0],
      rewards: [
        { id: '1', title: 'Starter', description: 'Complete 7 days streak', requirement: 100, unlocked: false, icon: '🌱' },
        { id: '2', title: 'Pro', description: 'Reach 500 points', requirement: 500, unlocked: false, icon: '🏆' },
        { id: '3', title: 'Master', description: 'Complete 100 days streak', requirement: 2000, unlocked: false, icon: '👑' },
      ],
      
      refreshQuote: () => set({ currentQuote: QUOTES[Math.floor(Math.random() * QUOTES.length)] }),

      addTask: (task) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...task,
            id: uuidv4(),
            completedDates: [],
            streak: 0,
            points: 0,
            createdAt: new Date().toISOString(),
          },
        ],
      })),

      toggleTaskCompletion: (id, date) => set((state) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const task = state.tasks.find(t => t.id === id);
        if (!task) return state;

        const isCompleted = task.completedDates.includes(dateStr);
        const newCompletedDates = isCompleted 
          ? task.completedDates.filter(d => d !== dateStr)
          : [...task.completedDates, dateStr];

        // Points logic
        const pointsDiff = isCompleted ? -10 : 10;
        const newTotalPoints = state.points + pointsDiff;

        // Reward unlocking
        const newRewards = state.rewards.map(r => ({
          ...r,
          unlocked: r.unlocked || newTotalPoints >= r.requirement
        }));

        return {
          points: newTotalPoints,
          rewards: newRewards,
          tasks: state.tasks.map(t => t.id === id ? { ...t, completedDates: newCompletedDates } : t)
        };
      }),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      })),

      editTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      })),

      getSummary: () => {
        const tasks = get().tasks;
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        const completedToday = tasks.filter(t => t.completedDates.includes(todayStr)).length;
        
        // Mock missed days logic
        const missedDays = tasks.reduce((acc, t) => {
            // Simple logic: if created more than 7 days ago and less than 3 completions
            return acc + (t.completedDates.length < 5 ? 1 : 0);
        }, 0);

        return {
          total: tasks.length,
          completedToday,
          completionRate: tasks.length > 0 ? (completedToday / tasks.length) * 100 : 0,
          missedDays
        };
      }
    }),
    { name: 'habit-flow-storage' }
  )
);
