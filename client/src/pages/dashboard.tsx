import { useStore } from "@/lib/store";
import TaskCard from "@/components/task-card";
import StreakCounter from "@/components/streak-counter";
import ActivityChart from "@/components/charts/activity-chart";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CheckCircle2, ListTodo } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { tasks, getSummary } = useStore();
  const summary = getSummary();
  const today = new Date();
  
  // Calculate longest active streak
  const longestStreak = Math.max(...tasks.map(t => t.streak), 0);
  
  const todaysTasks = tasks.filter(t => {
     // For demo purposes, we show all daily tasks and habits
     // In a real app, we'd filter by schedule
     return true;
  });

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            {greeting()}, achiever.
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Ready to crush your goals today?
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Today is</p>
          <p className="text-2xl font-bold text-primary">{format(today, "EEEE, MMMM do")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StreakCounter streak={longestStreak} label="Longest Streak" />
        
        <Card className="border-none shadow-sm bg-primary/5 dark:bg-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Daily Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-bold font-heading">{summary.completedToday}/{summary.total}</span>
              <span className="text-sm font-medium text-muted-foreground mb-1">tasks completed</span>
            </div>
            <Progress value={summary.completionRate} className="h-3" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-emerald-500/10 dark:bg-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <span className="text-3xl font-bold font-heading">{Math.round(summary.completionRate)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-semibold flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-primary" />
              Today's Focus
            </h2>
          </div>
          
          <div className="space-y-4">
            {todaysTasks.length === 0 ? (
               <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed">
                  <p className="text-muted-foreground">No tasks for today. Add one to get started!</p>
               </div>
            ) : (
              todaysTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TaskCard task={task} />
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <ActivityChart />
          
          <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Pro Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-100 text-sm leading-relaxed">
                "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
              </p>
              <p className="text-right mt-4 text-xs font-semibold text-indigo-200">— Aristotle</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
