import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { useAuth } from "@clerk/clerk-react";
import { useRevisionStore } from "../../../app/revisisonStore";
import { toast } from "sonner";
import { Separator } from "../../ui/separator";

const priorityFromRevision = (rev) => {
  if (rev.revisionNumber <= 1) return "High";
  if (rev.revisionNumber <= 3) return "Medium";
  return "Low";
};

const priorityColor = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const UpcomingRevision = () => {
  const { userId } = useAuth();
  const {
    upcoming,
    today,
    overdue,
    fetchAll,
    completeRevision,
  } = useRevisionStore();

  const [filter, setFilter] = useState("upcoming");

  useEffect(() => {
    if (userId) fetchAll(userId);
  }, [userId, fetchAll]);

  const list =
    filter === "today"
      ? today
      : filter === "overdue"
      ? overdue
      : upcoming;

  const handleComplete = async (id) => {
    const res = await completeRevision(id, userId);

    if (res?.success) {
      toast("Revision completed 🎉", {
        className:
          "bg-green-100 text-green-700 font-semibold shadow-md rounded-xl",
      });
    } else {
      toast("Failed to complete revision ❌");
    }
  };

  return (
    <Card className="w-[30%] bg-amber-800/80 h-[53vh] p-4 rounded-xl">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h3 className="text-xl tracking-tighter font-semibold text-gray-100">
          Revisions
        </h3>

        {/* 🔽 FILTER DROPDOWN */}
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue className="text-white"/>
          </SelectTrigger>
          <SelectContent className="bg-amber-700/90">
            <SelectItem className="" value="upcoming">Upcoming</SelectItem>
            <SelectItem className="" value="today">Today</SelectItem>
            <SelectItem className="" value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[90%]">
        <ul className="space-y-2">
          {list.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-10">
              No revisions 🎉
            </p>
          )}

          {list.map((rev) => {
            const priority = priorityFromRevision(rev);

            return (
              <li
                key={rev._id}
                className="flex justify-between items-center p-3 bg-orange-50 rounded-lg shadow-sm"
              >
                <div>
                  <div className="flex items-end gap-3">

                  <p className="text-[1rem] font-medium capitalize text-gray-900">
                    {rev.topic}
                  </p>
                  <Separator orientation='vertical' />
                  <p className="text-sm font-light text-gray-800">
                    {rev.subject}
                  </p>
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    Due: {new Date(rev.dueDate).toDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    className={`${priorityColor[priority]} px-2 py-0.5 text-xs`}
                  >
                    {priority}
                  </Badge>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleComplete(rev._id)}
                  >
                    Done
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </Card>
  );
};

export default UpcomingRevision;
