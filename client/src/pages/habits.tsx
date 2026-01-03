import { useStore } from "@/lib/store";
import TaskCard from "@/components/task-card";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Habits() {
  const { tasks, deleteTask } = useStore();
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">All Habits</h1>
          <p className="text-muted-foreground">Manage your daily routines and tasks.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search habits..." 
            className="pl-9 bg-white/50 backdrop-blur-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredTasks.length === 0 ? (
           <div className="col-span-full text-center py-20">
             <p className="text-muted-foreground">No habits found.</p>
           </div>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              <TaskCard task={task} />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
