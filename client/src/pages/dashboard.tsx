import { useStore } from "@/lib/store";
import TaskCard from "@/components/task-card";
import GamificationHub from "@/components/gamification-hub";
import HabitCalendar from "@/components/habit-calendar";
import ActivityChart from "@/components/charts/activity-chart";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ListTodo, Bell, Calendar as CalendarIcon, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Dashboard() {
  const { tasks, getSummary } = useStore();
  const summary = getSummary();
  const today = new Date();
  
  const todaysTasks = tasks.filter(t => true); // Mock logic

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            {summary.completionRate === 100 ? "Perfect Day!" : "Keep Pushing!"}
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            You have {tasks.length - summary.completedToday} habits left for today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{format(today, "EEEE, MMM do")}</p>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Daily Reminder</AlertTitle>
        <AlertDescription>
          Don't forget to complete your "Morning Meditation" - it's your most missed habit this week!
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-4 flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-primary" />
              Focus List
            </h2>
            <div className="space-y-4">
              {todaysTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-4 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-primary" />
              Weekly Heat Map
            </h2>
            <ActivityChart />
          </section>
        </div>

        <div className="space-y-8">
          <GamificationHub />
          <HabitCalendar />
          
          <Card className="border-none bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-blue-400" />
                Notification Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white/10 rounded-lg text-xs">
                <p className="font-bold">Next Reminder:</p>
                <p className="text-slate-300">Drink Water at 2:00 PM</p>
                <div className="mt-2 flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 rounded font-bold">Done</button>
                  <button className="px-2 py-1 bg-slate-700 rounded font-bold">Snooze</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
