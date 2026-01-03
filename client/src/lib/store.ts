import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { addDays, format, subDays, isSameDay } from 'date-fns';

export type TaskType = 'daily' | 'habit' | 'todo';

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  completedDates: string[]; // ISO date strings
  streak: number;
  color: string;
  createdAt: string;
  targetPerWeek?: number; // For habits
}

interface StoreState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => void;
  toggleTaskCompletion: (id: string, date: Date) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  getSummary: () => { total: number; completedToday: number; completionRate: number };
}

// Initial mock data
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: '10 minutes of mindfulness before work',
    type: 'habit',
    completedDates: [
      format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    ],
    streak: 3,
    color: 'hsl(var(--chart-1))',
    createdAt: new Date().toISOString(),
    targetPerWeek: 7,
  },
  {
    id: '2',
    title: 'Read 30 Pages',
    description: 'Current book: Atomic Habits',
    type: 'habit',
    completedDates: [
      format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    ],
    streak: 1,
    color: 'hsl(var(--chart-2))',
    createdAt: new Date().toISOString(),
    targetPerWeek: 5,
  },
  {
    id: '3',
    title: 'Gym Workout',
    description: 'Push day routine',
    type: 'daily',
    completedDates: [],
    streak: 0,
    color: 'hsl(var(--chart-3))',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Drink 2L Water',
    type: 'habit',
    completedDates: [
        format(new Date(), 'yyyy-MM-dd'),
    ],
    streak: 15,
    color: 'hsl(var(--chart-4))',
    createdAt: new Date().toISOString(),
    targetPerWeek: 7,
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      tasks: INITIAL_TASKS,
      
      addTask: (task) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...task,
            id: uuidv4(),
            completedDates: [],
            streak: 0,
            createdAt: new Date().toISOString(),
          },
        ],
      })),

      toggleTaskCompletion: (id, date) => set((state) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return {
          tasks: state.tasks.map((task) => {
            if (task.id !== id) return task;

            const isCompleted = task.completedDates.includes(dateStr);
            let newCompletedDates;
            
            if (isCompleted) {
              newCompletedDates = task.completedDates.filter((d) => d !== dateStr);
            } else {
              newCompletedDates = [...task.completedDates, dateStr];
            }

            // Recalculate streak (simplified logic)
            // In a real app, this would be more complex and handle gaps based on targetPerWeek
            let currentStreak = 0;
            const sortedDates = [...newCompletedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
            
            if (sortedDates.length > 0) {
               // Check if today or yesterday is completed to keep streak alive
               const today = format(new Date(), 'yyyy-MM-dd');
               const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
               
               if (sortedDates.includes(today)) {
                   currentStreak = 1;
                   let checkDate = subDays(new Date(), 1);
                   while (sortedDates.includes(format(checkDate, 'yyyy-MM-dd'))) {
                       currentStreak++;
                       checkDate = subDays(checkDate, 1);
                   }
               } else if (sortedDates.includes(yesterday)) {
                   // Streak is active but not completed today
                   currentStreak = 0; // Or keep previous streak? Let's just count consecutive days ending today/yesterday
                   let checkDate = subDays(new Date(), 1);
                   while (sortedDates.includes(format(checkDate, 'yyyy-MM-dd'))) {
                       currentStreak++;
                       checkDate = subDays(checkDate, 1);
                   }
               }
            }

            return {
              ...task,
              completedDates: newCompletedDates,
              streak: currentStreak
            };
          }),
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
        return {
          total: tasks.length,
          completedToday,
          completionRate: tasks.length > 0 ? (completedToday / tasks.length) * 100 : 0
        };
      }
    }),
    {
      name: 'habit-flow-storage',
    }
  )
);
