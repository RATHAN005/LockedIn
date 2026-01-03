import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { format, subDays, eachDayOfInterval } from "date-fns";

export default function ActivityChart() {
  const tasks = useStore((state) => state.tasks);

  // Generate last 7 days data
  const today = new Date();
  const last7Days = eachDayOfInterval({
    start: subDays(today, 6),
    end: today,
  });

  const data = last7Days.map((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const completedCount = tasks.reduce((acc, task) => {
      return acc + (task.completedDates.includes(dateStr) ? 1 : 0);
    }, 0);
    
    return {
      date: format(date, "MMM dd"),
      completed: completedCount,
    };
  });

  return (
    <Card className="col-span-1 md:col-span-2 overflow-hidden border-none shadow-sm bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <CardHeader>
        <CardTitle className="text-lg font-heading">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  borderRadius: "8px", 
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCompleted)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
