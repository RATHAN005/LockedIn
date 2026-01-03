import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function TaskDistributionChart() {
  const tasks = useStore((state) => state.tasks);

  const distribution = [
    { name: "Habits", value: tasks.filter((t) => t.type === "habit").length, color: "hsl(var(--chart-1))" },
    { name: "Daily", value: tasks.filter((t) => t.type === "daily").length, color: "hsl(var(--chart-2))" },
    { name: "Todo", value: tasks.filter((t) => t.type === "todo").length, color: "hsl(var(--chart-3))" },
  ].filter(item => item.value > 0);

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-heading">Task Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  borderRadius: "8px", 
                  border: "1px solid hsl(var(--border))"
                }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
