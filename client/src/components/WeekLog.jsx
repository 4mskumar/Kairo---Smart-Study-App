import React, { useEffect, useState } from "react";
import { DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api } from "../api/axiosConfig";
import { useStudyStore } from "../app/studyStore";

const WeekLog = ({ onSuccess }) => {
  const [targetHours, setTargetHours] = useState(""); // ✅ weekly target hours
  const { userId } = useAuth();
  let loading = false;
  const {fetchTarget}  =useStudyStore()

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!targetHours) {
        toast("Please enter your weekly goal hours");
        return;
      }

      loading = true;
      // console.log(targetHours);
      
      const res = await api.post("/add-week-target", {
        userId,
        targetHours: Number(targetHours),
      });

      // console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        const goalId = res.data.weekGoal._id;
        console.log(goalId);

        localStorage.setItem("goalId", goalId);
        onSuccess?.(); // close dialog
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      loading = false;
      setTargetHours("");
    }
  };

  useEffect(() => {
    fetchTarget(userId)
  }, [userId])

  return (
    <form onSubmit={handleGoalSubmit} className="flex flex-col gap-5">
      <DialogDescription className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <h1 className="text-zinc-800 font-medium tracking-tight text-lg">
            Weekly Goal (hours):
          </h1>
          <Input
            required
            type="number"
            min="1"
            value={targetHours}
            onChange={(e) => setTargetHours(e.target.value)}
            className="w-[50%]"
            placeholder="e.g. 15"
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="cursor-pointer bg-zinc-800 text-white hover:bg-zinc-900"
        >
          {loading ? <Loader2 /> : "Save Goal"}{" "}
        </Button>
      </DialogDescription>
    </form>
  );
};

export default WeekLog;
