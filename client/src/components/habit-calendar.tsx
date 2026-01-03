import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { format, isSameDay } from "date-fns";

export default function HabitCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const tasks = useStore((state) => state.tasks);

  // Find completions for selected date
  const completions = date ? tasks.filter(t => 
    t.completedDates.includes(format(date, 'yyyy-MM-dd'))
  ) : [];

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-heading">Completion Calendar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border mx-auto"
          modifiers={{
            completed: (date) => tasks.some(t => t.completedDates.includes(format(date, 'yyyy-MM-dd')))
          }}
          modifiersClassNames={{
            completed: "bg-primary/20 text-primary font-bold"
          }}
        />
        
        {date && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">{format(date, 'MMMM d, yyyy')}</h4>
            <div className="space-y-2">
              {completions.length > 0 ? (
                completions.map(t => (
                  <div key={t.id} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                    <span>{t.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">No completions recorded.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
