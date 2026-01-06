import React, { useEffect } from "react";
import { Progress } from "./ui/progress";
import { useStudyStore } from "../app/studyStore";
import { toHours } from "../lib/DurationUtil";

const WeeklyProgress = () => {
    const { target, minutes, fetchTarget, studyLogs } = useStudyStore();
    // console.log(target, minutes);
    

    const progressValue =
      target > 0 ? Math.min(100, ((Number((minutes / 60).toFixed(1))) / target) * 100) : 0;
    // console.log(progressValue);
    
  
    useEffect(() => {
      const getTarget = async () => {
        const goalId = localStorage.getItem("goalId");
        if (!goalId) return;

        
  
        const res = await fetchTarget(goalId);
        // console.log("Fetched from backend:", res);
      };
  
      getTarget();
    }, [fetchTarget, studyLogs.length]);
  return (
    <div className="mt-2  py-1 flex flex-col justify-center px-3 gap-2 border-[1px] rounded-lg">
      <h1 className="text-md font-semibold text-zinc-700">Weekly Progress</h1>
      <div className="flex gap-2 items-center">
        <Progress value={progressValue} />
      </div>
      <h1 className="text-zinc-800 flex text-md tracking-tight ">
        <span className="font-bold text-orange-500">{toHours(minutes)}</span>{" "}
        <p className="text-zinc-800 text-md ml-1 mr-2 tracking-tight font-medium">
          / {target}
        </p>
        hours completed
      </h1>
    </div>
  );
};

export default WeeklyProgress;
