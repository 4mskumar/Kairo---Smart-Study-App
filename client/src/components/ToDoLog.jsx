import React, { useState } from "react";
import { DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import axios from "axios";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useTodoStore } from "../app/todoStore";
import { Loader, Loader2 } from "lucide-react";

const WeekLog = ({ onSuccess }) => {
  const [taskName, setTask] = useState("");
  const [priority, setPriority] = useState("Medium"); // ✅ default
  const { userId } = useAuth();
  const { addTodo, loading } = useTodoStore();

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!taskName) {
        toast("Please enter a task");
        return;
      }

      console.log(taskName, userId, priority);
      

      const res = await addTodo(taskName, userId, priority);

      if (res.success) {
        toast.success(res.message);
        onSuccess?.();
        setTask("");
        setPriority("Medium");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleTaskSubmit} className="flex flex-col gap-5">
      <DialogDescription className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-800 font-medium tracking-tight text-lg">
            Task name:
          </label>
          <Input
            
            type="text"
            value={taskName}
            onChange={(e) => setTask(e.target.value)}
            className="w-full"
            placeholder="e.g. Complete 1 chapter of Chemistry"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-800 font-medium tracking-tight text-lg">
            Priority:
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-md p-2 bg-white"
          >
            <option value="High">🔥 High</option>
            <option value="Medium">⚡ Medium</option>
            <option value="Low">🌱 Low</option>
          </select>
        </div>

        <Button
          type="submit"
          variant="secondary"
          onKeyDown={(e) => e.key === "Enter" && handleTaskSubmit(e)}
          className="cursor-pointer bg-zinc-800 text-white hover:bg-zinc-900"
        >
          {loading ? <Loader2 /> : "Save Task"}
        </Button>
      </DialogDescription>
    </form>
  );
};

export default WeekLog;
