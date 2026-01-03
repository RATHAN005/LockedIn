import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CheckCircle2, BarChart3, Plus, Menu, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import AddTaskDialog from "./add-task-dialog";
import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/theme-store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/habits", label: "Habits", icon: CheckCircle2 },
    { href: "/analytics", label: "Stats", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-heading">
          HabitFlow
        </h1>
        <p className="text-sm text-muted-foreground mt-1 font-medium">Main character energy only.</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="px-4 py-2 mb-2">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 rounded-xl border-2 hover:bg-primary/5 transition-colors" 
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="font-semibold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                <span className="font-semibold">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <AddTaskDialog>
          <Button className="w-full h-14 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 text-base font-bold">
            <Plus className="w-5 h-5 mr-2 stroke-[3px]" /> New Habit
          </Button>
        </AddTaskDialog>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-transparent flex flex-col md:flex-row overflow-x-hidden relative">
      <div className="fixed inset-0 -z-20 bg-background" />
      <div className="fixed inset-0 -z-10 opacity-40 mix-blend-multiply dark:mix-blend-soft-light pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <aside className="hidden md:block w-80 border-r bg-card/30 backdrop-blur-2xl sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b z-40 flex items-center justify-between px-6">
        <Link href="/">
          <span className="font-bold text-xl font-heading bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">HabitFlow</span>
        </Link>
        <div className="flex items-center gap-2">
           <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full w-10 h-10 bg-secondary/50"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
           <AddTaskDialog>
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-primary/10 text-primary">
              <Plus className="w-6 h-6 stroke-[2.5px]" />
            </Button>
          </AddTaskDialog>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-[85%] sm:w-80 border-l-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-2xl border-t z-40 px-6 flex items-center justify-between pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className="flex flex-col items-center gap-1 min-w-[64px] transition-all active:scale-90">
                <div className={cn(
                  "p-2 rounded-xl transition-all",
                  isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "text-muted-foreground"
                )}>
                  <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-tighter", isActive ? "text-primary" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <main className="flex-1 w-full pt-16 md:pt-0 pb-24 md:pb-0 overflow-x-hidden">
        <div className="container max-w-6xl mx-auto p-5 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          {children}
        </div>
      </main>
    </div>
  );
}
