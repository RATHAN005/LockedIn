import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TaskType, useStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().optional(),
  type: z.enum(["daily", "habit", "todo"] as [string, ...string[]]),
  color: z.string(),
  // We keep it as string for the form input, and convert later if needed
  targetPerWeek: z.string(),
});

interface AddTaskDialogProps {
  children: React.ReactNode;
}

export default function AddTaskDialog({ children }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const addTask = useStore((state) => state.addTask);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "habit",
      color: "hsl(221, 83%, 53%)",
      targetPerWeek: "7",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTask({
      title: values.title,
      description: values.description,
      type: values.type as TaskType,
      color: values.color,
      targetPerWeek: parseInt(values.targetPerWeek, 10),
    });
    
    toast({
      title: "Habit Created",
      description: "Your new habit has been successfully added to your list.",
    });
    
    setOpen(false);
    form.reset();
  }

  const colors = [
    { label: "Blue", value: "hsl(221, 83%, 53%)" },
    { label: "Green", value: "hsl(142, 76%, 36%)" },
    { label: "Purple", value: "hsl(262, 83%, 58%)" },
    { label: "Orange", value: "hsl(24, 95%, 53%)" },
    { label: "Red", value: "hsl(346, 87%, 43%)" },
    { label: "Pink", value: "hsl(316, 73%, 52%)" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">New Habit</DialogTitle>
          <DialogDescription>
            Add a new habit or daily task to track your progress.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Morning Jog" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="habit">Habit (Build over time)</SelectItem>
                        <SelectItem value="daily">Daily Task (Every day)</SelectItem>
                        <SelectItem value="todo">One-time Task</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="targetPerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Target (Days)</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                           <SelectItem key={num} value={String(num)}>{num} days/week</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Code</FormLabel>
                  <div className="flex gap-3 mt-2">
                    {colors.map((c) => (
                      <div
                        key={c.value}
                        className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                          field.value === c.value ? "ring-2 ring-offset-2 ring-primary" : ""
                        }`}
                        style={{ backgroundColor: c.value }}
                        onClick={() => field.onChange(c.value)}
                        title={c.label}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Why do you want to build this habit?" 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">Create Habit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
