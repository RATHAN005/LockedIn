import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
  label?: string;
}

export default function StreakCounter({ streak, label = "Current Streak" }: StreakCounterProps) {
  return (
    <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-none shadow-lg shadow-orange-500/20">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-orange-100 text-sm font-medium mb-1">{label}</p>
          <h3 className="text-3xl font-heading font-bold">{streak} Days</h3>
        </div>
        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
          <Flame className="w-8 h-8 text-white fill-white animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
