import { useStore } from "@/lib/store";
import TaskCard from "@/components/task-card";
import GamificationHub from "@/components/gamification-hub";
import HabitCalendar from "@/components/habit-calendar";
import ActivityChart from "@/components/charts/activity-chart";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ListTodo, Bell, Calendar as CalendarIcon, Info, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { tasks, getSummary } = useStore();
  const summary = getSummary();
  const today = new Date();
  
  const todaysTasks = tasks.filter(t => true); 

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full w-fit text-[10px] font-black uppercase tracking-widest mb-2"
          >
            <Sparkles className="w-3 h-3" />
            <span>Today's Mission</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-foreground leading-[1.1]">
            {summary.completionRate >= 100 ? "Champion Mode" : "Keep The Flow"}
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            You've smashed <span className="text-primary font-bold">{summary.completedToday}</span> habits. {tasks.length - summary.completedToday} to go!
          </p>
        </div>
        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-0">
          <p className="text-3xl md:text-4xl font-black text-primary font-heading tabular-nums">{format(today, "dd")}</p>
          <div className="md:text-right">
             <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">{format(today, "MMMM")}</p>
             <p className="text-xs font-bold text-primary/80">{format(today, "EEEE")}</p>
          </div>
        </div>
      </section>

      {/* Stats Cards Row */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <Card className="border-2 border-primary/10 bg-primary/[0.02] rounded-[32px] overflow-hidden">
          <CardContent className="p-5 md:p-6">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Progress</p>
             <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-black font-heading leading-none">{Math.round(summary.completionRate)}%</span>
             </div>
             <Progress value={summary.completionRate} className="h-2 bg-primary/10" />
          </CardContent>
        </Card>
        
        <Card className="border-2 border-emerald-500/10 bg-emerald-500/[0.02] rounded-[32px]">
          <CardContent className="p-5 md:p-6">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Streak</p>
             <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-heading leading-none">12</span>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">Days</span>
             </div>
             <div className="mt-2 text-[10px] font-bold text-emerald-600/60 uppercase">Personal Best: 24d</div>
          </CardContent>
        </Card>

        <Card className="hidden md:block border-2 border-orange-500/10 bg-orange-500/[0.02] rounded-[32px]">
           <CardContent className="p-6">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">XP Earned</p>
             <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-heading leading-none">850</span>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-tighter">XP</span>
             </div>
             <div className="mt-2 text-[10px] font-bold text-orange-600/60 uppercase">Level 4 Achiever</div>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Main Task List */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-black flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
                  <ListTodo className="w-5 h-5 stroke-[2.5px]" />
                </div>
                The Daily List
              </h2>
              <Button variant="ghost" className="text-primary font-bold text-xs uppercase tracking-widest group">
                History <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {todaysTasks.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-16 bg-muted/20 rounded-[32px] border-2 border-dashed"
                  >
                    <p className="text-muted-foreground font-bold">No habits yet. Start your journey today!</p>
                  </motion.div>
                ) : (
                  todaysTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TaskCard task={task} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Activity Section */}
          <section className="hidden md:block">
            <h2 className="text-2xl font-heading font-black mb-6 flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center text-white">
                <CalendarIcon className="w-5 h-5 stroke-[2.5px]" />
              </div>
              Performance Heatmap
            </h2>
            <div className="rounded-[32px] overflow-hidden border-2 border-border/50">
              <ActivityChart />
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Mobile Specific - Alerts & Quotes */}
          <div className="space-y-4">
            <GamificationHub />
            
            <Card className="border-2 border-blue-500/20 bg-blue-500/[0.05] rounded-[32px] p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Bell className="w-12 h-12" />
               </div>
               <h4 className="text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Bell className="w-3 h-3" />
                 Smart Insight
               </h4>
               <p className="text-sm font-bold text-blue-900 dark:text-blue-100 leading-relaxed">
                 You're 80% more likely to finish "Read 30 Pages" before 10 AM. Try it tomorrow!
               </p>
            </Card>
          </div>

          <div className="hidden md:block">
            <HabitCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
