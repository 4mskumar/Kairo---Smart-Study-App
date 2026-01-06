import React, { useEffect, useState } from "react";
import { Calendar } from "../../ui/calendar";
import { useStudyStore } from "../../../app/studyStore";
import { toHours } from "../../../lib/DurationUtil";
import WeeklyProgress from "../../WeeklyProgress";
import AddReminderDialog from "./AddReminderDialog";

function formatDate(date) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

const CalendarAndWeekTargte = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);

  const { target, minutes, fetchTarget, studyLogs } = useStudyStore();

  const progressValue =
    target > 0 ? Math.min(100, (toHours(minutes) / target) * 100) : 0;

  useEffect(() => {
    const getTarget = async () => {
      const goalId = localStorage.getItem("goalId");
      if (!goalId) return;
      await fetchTarget(goalId);
    };

    getTarget();
  }, [fetchTarget, studyLogs.length]);

  const handleAddReminder = (newReminder) => {
    setReminders((prev) => [...prev, newReminder]);
  };

  const remindersOnSelectedDate = reminders.filter(
    (r) => r.date === date.toISOString().split("T")[0]
  );

  // Helper function to check if a day has a reminder
  const hasReminder = (day) => {
    const dayStr = day.toISOString().split("T")[0];
    return reminders.some((r) => r.date === dayStr);
  };

  return (
    <div className="flex flex-col bg-orange-50/50 w-[29%] items-start">
      <div className="mb-4">
        <AddReminderDialog onAdd={handleAddReminder} />
      </div>

      <div className="w-full -mt-1">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md w-full border shadow-sm"
          captionLayout="dropdown"
          // Custom render for day cells
          dayContent={(day) => {
            const dayStr = day.toISOString().split("T")[0];
            const isToday = dayStr === new Date().toISOString().split("T")[0];

            return (
              <div className="relative flex flex-col items-center justify-center w-full h-full">
                <span>{day.getDate()}</span>

                {hasReminder(day) && (
                  <span className="absolute bottom-1 w-2 h-2 rounded-full bg-blue-500" />
                )}
              </div>
            );
          }}
        />
        {/* Reminders list for selected date
        {remindersOnSelectedDate.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-sm w-full">
            <h2 className="font-semibold">Reminders:</h2>
            <ul className="list-disc ml-5 mt-2">
              {remindersOnSelectedDate.map((reminder, idx) => (
                <li key={idx}>{reminder.text}</li>
              ))}
            </ul>
          </div>
        )} */}

        <WeeklyProgress />
      </div>
    </div>
  );
};

export default CalendarAndWeekTargte;
