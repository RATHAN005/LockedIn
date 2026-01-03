import { motion } from "framer-motion";
import { Check, Flame, Trophy, MoreHorizontal, Calendar, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task, useStore } from "@/lib/store";
import { format } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const toggleTaskCompletion = useStore((state) => state.toggleTaskCompletion);
  const deleteTask = useStore((state) => state.deleteTask);
  const today = new Date();
  const isCompletedToday = task.completedDates.includes(format(today, "yyyy-MM-dd"));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-[24px] border-2 bg-card p-4 transition-all duration-300",
        isCompletedToday 
          ? "border-primary/20 bg-primary/[0.02] shadow-sm" 
          : "border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Color Accent Pill */}
      <div
        className="absolute left-4 top-4 bottom-4 w-1 rounded-full opacity-60"
        style={{ backgroundColor: task.color }}
      />

      <div className="flex items-center gap-4 pl-4">
        {/* Completion Toggle - Circular Checkbox */}
        <button
          onClick={() => toggleTaskCompletion(task.id, today)}
          className={cn(
            "flex-shrink-0 w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-500",
            isCompletedToday
              ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/30 rotate-0"
              : "border-primary/20 bg-primary/5 text-transparent hover:border-primary rotate-3"
          )}
        >
          <Check className={cn("w-7 h-7", isCompletedToday ? "scale-100 opacity-100" : "scale-50 opacity-0")} strokeWidth={4} />
        </button>

        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest",
                task.type === "habit" 
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
              )}>
                {task.type}
              </span>
              {task.streak > 0 && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase tracking-tight">
                  <Flame className="w-3 h-3 fill-orange-500" />
                  <span>{task.streak}D STREAK</span>
                </div>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors outline-none">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2 border-2">
                <DropdownMenuItem className="rounded-xl flex gap-2 font-medium">
                  <Calendar className="w-4 h-4" /> View History
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl flex gap-2 font-medium">
                  <Bell className="w-4 h-4" /> Set Reminder
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-xl flex gap-2 font-medium text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trophy className="w-4 h-4" /> Delete Habit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h3 className={cn(
            "font-heading font-bold text-lg leading-tight transition-all truncate",
            isCompletedToday ? "text-muted-foreground/70 line-through decoration-2 decoration-primary/20" : "text-foreground"
          )}>
            {task.title}
          </h3>
          
          <div className="flex items-center gap-3 mt-2 text-[11px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              <span>Goal: {task.targetPerWeek || 7}/wk</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{task.frequencyValue} {task.frequency}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
