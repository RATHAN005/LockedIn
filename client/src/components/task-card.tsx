import { motion } from "framer-motion";
import { Check, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task, useStore } from "@/lib/store";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const toggleTaskCompletion = useStore((state) => state.toggleTaskCompletion);
  const today = new Date();
  const isCompletedToday = task.completedDates.includes(format(today, "yyyy-MM-dd"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-md",
        isCompletedToday ? "border-primary/20 bg-primary/5" : "hover:border-primary/20"
      )}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ backgroundColor: task.color }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
                task.type === "habit" 
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
              )}
            >
              {task.type}
            </span>
            {task.streak > 0 && (
              <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                <Flame className="w-3 h-3 fill-orange-500" />
                <span>{task.streak} day streak</span>
              </div>
            )}
          </div>
          <h3 className={cn(
            "font-heading font-semibold text-lg leading-tight transition-all",
            isCompletedToday ? "text-muted-foreground line-through decoration-2 decoration-primary/30" : "text-foreground"
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          )}
        </div>

        <button
          onClick={() => toggleTaskCompletion(task.id, today)}
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20",
            isCompletedToday
              ? "bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30"
              : "border-muted-foreground/20 text-transparent hover:border-primary hover:bg-primary/5"
          )}
        >
          <Check className={cn("w-6 h-6", isCompletedToday && "animate-in zoom-in spin-in-12 duration-300")} strokeWidth={3} />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-border/50 flex items-center justify-between text-xs text-muted-foreground">
         <div className="flex items-center gap-2">
            <Trophy className="w-3 h-3" />
            <span>Target: {task.targetPerWeek ? `${task.targetPerWeek}/week` : 'Daily'}</span>
         </div>
         <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            Click to toggle
         </div>
      </div>
    </motion.div>
  );
}
