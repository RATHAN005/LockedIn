import { useStore } from "@/lib/store";
import ActivityChart from "@/components/charts/activity-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";

export default function Analytics() {
  const { tasks } = useStore();

  const habitPerformance = tasks.map(task => {
    // A simplified performance metric based on streaks and completion count relative to "age" of habit
    // In a real app this would be more accurate
    const totalCompletions = task.completedDates.length;
    return {
      name: task.title,
      completions: totalCompletions,
      streak: task.streak,
      color: task.color
    };
  }).sort((a, b) => b.completions - a.completions);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-heading font-bold">Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your performance data.</p>
      </div>

      <ActivityChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-none bg-white dark:bg-card">
          <CardHeader>
            <CardTitle>Top Performing Habits</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={habitPerformance} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{ fontSize: 12 }} 
                    interval={0}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar dataKey="completions" radius={[0, 4, 4, 0]} barSize={20}>
                    {habitPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none bg-white dark:bg-card">
           <CardHeader>
            <CardTitle>Streak Leaders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {habitPerformance
                .sort((a, b) => b.streak - a.streak)
                .slice(0, 5)
                .map((habit, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: habit.color }} />
                       <span className="font-medium">{habit.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-lg">{habit.streak}</span>
                       <span className="text-xs text-muted-foreground uppercase">days</span>
                    </div>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
