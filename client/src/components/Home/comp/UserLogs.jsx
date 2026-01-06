import React, { useEffect } from "react";
import { ScrollArea } from "../../ui/scroll-area";
import { MoreHorizontal } from "lucide-react";
import { fakeStudyLogs } from "../../../data/studyLogs";
import { useStudyStore } from "../../../app/studyStore";
import { useAuth } from "@clerk/clerk-react";
import { convertToMinutes } from "../../../../../server/lib/TimeToHours";

const UserLogs = () => {

  const {studyLogs, loading, error, fetchStudyLog} = useStudyStore()
  const {userId} = useAuth()

  // console.log(studyLogs);
  

  
  useEffect(() => {
    fetchStudyLog(userId)
  }, [fetchStudyLog, userId])
  if (loading) return <p className="text-gray-800 text-sm">Loading...</p>

  return (
    <div className="w-[60%] ">
      <div className="border rounded-xl p-3 shadow-sm bg-amber-900">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xl font-semibold tracking-tight text-zinc-50">
            Your Logs
          </h4>
          <MoreHorizontal
            size={14}
            className="border p-1 rounded-md text-zinc-600 cursor-pointer hover:bg-zinc-100 transition"
          />
        </div>

        {/* Headers */}
        <div className="flex justify-between items-center border-b pb-2 mb-2 sticky top-0  z-10">
          <h1 className="text-sm font-medium text-white uppercase tracking-wide">
            Subject
          </h1>
          <h1 className="text-sm font-medium text-white uppercase tracking-wide">
            Duration
          </h1>
        </div>

        {/* Scrollable logs */}
        <ScrollArea className="h-40">
          <div className="space-y-2 pr-1">
            {studyLogs.map((val, ind) => (
              <div
                key={ind}
                className="flex justify-between items-center border-b bg-orange-50 last:border-none py-2 px-2 rounded-md hover:bg-zinc-50 transition"
              >
                <h1 className="text-base font-semibold text-zinc-800 tracking-tighter">
                  {val.subject}
                </h1>
                <span className="text-sm font-medium text-zinc-50 bg-amber-900 px-2 py-0.5 rounded-md">
                  {Math.ceil(val.duration / 60)} <span className="font-light" >Hours</span>
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserLogs;
