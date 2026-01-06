import React, { useEffect } from "react";
import { Card, CardDescription, CardHeader } from "../../ui/card";
import { AnimatedCircularProgressBar } from "../../magicui/animated-circular-progress-bar";
import { useStudyStore } from "../../../app/studyStore";
import { useAuth } from "@clerk/clerk-react";

const ProgressCard = () => {
  const { userId } = useAuth();
  const {studyLogs} = useStudyStore()

  const { todayMinutes, fetchDailyAndMonthly, streak, fetchStreak, target } =
    useStudyStore();

  useEffect(() => {
    if (userId) {
      // console.log("called");

      fetchDailyAndMonthly(userId);
      fetchStreak(userId);
    }
  }, [userId, fetchDailyAndMonthly, todayMinutes, studyLogs.length]);

  let todayHours = Number((todayMinutes / 60).toFixed(1));

  return (
    <div className="flex w-[40%] gap-2">
      <Card className="flex-col bg-orange-300 gap-4 h-[16.5rem] hover:bg-orange-300/60 w-[50%] cursor-pointer duration-300 transition-all items-center  pb-0 flex justify-center">
        <CardHeader className="text-7xl flex  mt-5 font-bold text-zinc-800 tracking-tight">
          <h1 className="flex items-end gap-2">
            {todayHours} <span className="text-3xl font-bold mb-1 text-zinc-700">hrs</span>
          </h1> 
        </CardHeader>
        <CardDescription className="text-zinc-800 tracking-tight text-xl font-semibold">
          Studied Today
        </CardDescription>
      </Card>
      <Card className="flex-col bg-orange-400/80 hover:bg-orange-300 cursor-pointer w-[50%] duration-300 transition-all items-center  pb-0 flex justify-center">
        <img src="/images/streak.gif" className="w-1/2 mb-2" />
        <h1 className="text-zinc-800 tracking-tight text-xl font-semibold">
          🔥 {streak} Day Streak
        </h1>
      </Card>
    </div>
  );
};

export default ProgressCard;
