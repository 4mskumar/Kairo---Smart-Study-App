import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { UserHours } from "../../../data/userHours";

const UserActivityChart = ({ userId }) => {
  const [userData, setUserData] = useState([]); 
  
  // yaha per dikkat ho rahi hai
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get("/user-activity", { params: { userId } });
        if (res.data.success) {
          console.log("called");

          setUserData(res.data.activity); // ✅ set backend activity
          console.log(userData);
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
      }
    };

    if (userId) fetchActivity();
  }, [userId]);

  useEffect(() => {
    console.log("userData updated:", userData);
  }, [userData]);

  const chartConfig = {
    studyHours: { label: "Study Hours", color: "#4f46e5" }, 
    todosDone: { label: "Todos Completed", color: "#22c55e" }, 
  };

  return (
    <div className="w-1/3 flex mb-3 py-5 rounded-lg border-[1px] flex-col items-start p-0 mr-10 h-[31.9rem]">
      <ChartContainer className="h-full p-0 m-0 w-full" config={chartConfig}>
        <BarChart data={UserHours} className="z-50" width={500} height={300}>
          <XAxis dataKey="day" />
          <YAxis />
          <Bar dataKey="studyHours" fill="#4f46e5" />
          <Bar dataKey="todosDone" fill="#22c55e" />
        </BarChart>
      </ChartContainer>
      <div className="w-full mb-3">
        <h1 className="text-md mb-3 text-center font-medium tracking-tight text-zinc-500 ml-10">
          Your activity
        </h1>
      </div>
    </div>
  );
};

export default UserActivityChart;
