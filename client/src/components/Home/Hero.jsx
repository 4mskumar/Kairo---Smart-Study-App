import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { AnimatedCircularProgressBar } from "../magicui/animated-circular-progress-bar";
import { MoreHorizontal } from "lucide-react";
import { fakeStudyLogs } from "../../data/studyLogs.js";
import { Calendar } from "../ui/calendar.js";
import { Progress } from "../ui/progress.js";
import UserLogs from "./comp/UserLogs";
import CalendarAndWeekTargte from "./comp/CalendarAndWeekTargte";
import ProgressCard from "./comp/ProgressCard";
import ToDo from "./comp/ToDo.jsx";
import UserActivityChart from "./comp/UserActivityChart.jsx";
import CalendarEvent from "./comp/CalendarEvent.jsx";
import UpcomingRevision from "./comp/UpcomingRevision.jsx";

const Hero = () => {
  const { user } = useUser();
  let username = user.username;
  const [todayHoursValue, setTodayHoursValue] = useState(0);
  const [date, setDate] = useState(new Date());

  if (username)
    username =
      user.username[0].toUpperCase() +
      user.username.slice(1, user.username.length);

  // const name = `${user.firstName} ${
  //   user.lastName === null ? "" : user.lastName
  // }`;

  return (
    <div className="flex  flex-col">
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-zinc-800/95 text-2xl">Hello,</span>{" "}
          <h1 className="font-semibold first-letter:uppercase tracking-tight title text-zinc-800 text-2xl">
            {user.username}
          </h1>
        </div>
        <h1 className="text=-sm font-medium text-zinc-500 ">
          {Date().substring(0, 24)}
        </h1>
      </div>
      <div className="mt-5 -mb-5 flex gap-3 p-0 items-start">
        <ProgressCard />
        <UserLogs />
      </div>
      <div className="flex justify-between pb-5 mt-8 w-full items-start gap-3">
        <CalendarAndWeekTargte />
        <ToDo />
        {/* <UserActivityChart /> */}
        <UpcomingRevision />
      </div>
    </div>
  );
};

export default Hero;
