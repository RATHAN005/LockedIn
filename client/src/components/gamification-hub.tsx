import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Quote } from "lucide-react";
import { useEffect } from "react";

export default function GamificationHub() {
  const { points, rewards, currentQuote, refreshQuote } = useStore();

  useEffect(() => {
    refreshQuote();
  }, []);

  return (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <Card className="border-none bg-primary/10 relative overflow-hidden">
        <Quote className="absolute -right-4 -top-4 w-24 h-24 text-primary/10 rotate-12" />
        <CardContent className="pt-6">
          <p className="italic text-primary font-medium text-lg leading-relaxed">
            "{currentQuote}"
          </p>
        </CardContent>
      </Card>

      {/* Points & Level */}
      <Card className="border-none shadow-sm bg-gradient-to-br from-yellow-400/20 to-orange-400/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            Points Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold font-heading text-orange-700">{points} XP</div>
          <div className="mt-4 space-y-1">
             <div className="flex justify-between text-xs text-orange-800 font-medium">
                <span>Level 1</span>
                <span>{points}/1000 XP</span>
             </div>
             <Progress value={(points % 1000) / 10} className="bg-orange-200" />
          </div>
        </CardContent>
      </Card>

      {/* Rewards */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Badges & Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          {rewards.map(reward => (
            <div 
              key={reward.id} 
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                reward.unlocked ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 grayscale opacity-60'
              }`}
            >
              <div className="text-3xl">{reward.icon}</div>
              <div>
                <h4 className="font-bold text-sm">{reward.title}</h4>
                <p className="text-xs text-muted-foreground">{reward.description}</p>
              </div>
              {reward.unlocked && <div className="ml-auto text-green-600 text-xs font-bold">UNLOCKED</div>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
