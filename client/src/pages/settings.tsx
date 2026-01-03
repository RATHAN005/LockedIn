import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Shield, Cloud, Smartphone, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Settings() {
  return (
    <div className="space-y-8 pb-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-6 p-6 bg-card/60 backdrop-blur-md rounded-2xl shadow-sm border dark:border-white/10">
        <Avatar className="w-20 h-20 border-4 border-primary/10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground">John Doe</h2>
          <p className="text-muted-foreground">Premium Member • Joined Jan 2026</p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="outline">Edit Profile</Button>
            <Button size="sm" variant="destructive"><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-none glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive reminders on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Smart Reminders</Label>
                <p className="text-xs text-muted-foreground">Notify me if I forget a habit</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Daily Summary</Label>
                <p className="text-xs text-muted-foreground">Get a morning recap of your day</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cloud className="w-5 h-5 text-primary" />
              Sync & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-secondary/50 rounded-xl border border-dashed border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Last synced: 2 minutes ago</span>
              </div>
              <Button size="sm" variant="ghost">Sync Now</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="h-20 flex flex-col gap-1 border-2">
                 <Shield className="w-5 h-5 text-primary" />
                 <span>Backup Data</span>
               </Button>
               <Button variant="outline" className="h-20 flex flex-col gap-1 border-2">
                 <Cloud className="w-5 h-5 text-primary" />
                 <span>Restore Data</span>
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
