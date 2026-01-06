import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Clock, Edit3, PenBox, Plus, SearchCheck, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import WeeklyProgress from "../WeeklyProgress";
import { useStudyStore } from "../../app/studyStore";
import { useAuth } from "@clerk/clerk-react";
import { toHours } from "../../lib/DurationUtil";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import StudyLog from "../StudyLog";
import EditLog from "../NotesPage/Comp/EditLog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

const TAG_COLORS = {
  revision: "bg-blue-50 text-blue-700 border border-blue-200",
  notes: "bg-green-50 text-green-700 border border-green-200",
  important: "bg-purple-50 text-purple-700 border border-purple-200",
  Default: "bg-zinc-100 text-zinc-700 border border-zinc-200",
};

const StudyHero = () => {
  const { streak, fetchStreak, studyLogs, fetchStudyLog, deleteLog } = useStudyStore();
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [searchInput, setSearchInput] = useState('')
  const [filteredStudyLogs, setFilteredStudyLogs] = useState([])

  useEffect(() => {
    const handeSearch = (input) => {
      if(!input.trim()){
        setFilteredStudyLogs(studyLogs) 
        return
      }

      let lower = input.toLowerCase()
      const filtered = studyLogs.filter((log) => (
        log.topic.toLowerCase().includes(lower) || log.subject.toLowerCase().includes(lower) || log.tags.some((tags) => tags.toLowerCase().includes(lower))
      ))
      setFilteredStudyLogs(filtered)
    }
    handeSearch(searchInput)
  }, [searchInput, studyLogs])


  useEffect(() => {
    if (userId) {
      fetchStreak(userId);
      fetchStudyLog(userId);
    }
  }, [userId, studyLogs.length]);

  const growthQuotes = [
    "Small steps. Big results. 🚀",
    "Consistency beats intensity. 🔁",
    "Daily effort compounds. 📈",
    "Tiny progress matters. 🧩",
    "Show up every day. ⏳",
    "Habits build outcomes. 🧠",
    "Discipline creates momentum. ⚙️",
    "Little wins stack up. 🧱",
    "Progress loves routine. 📅",
    "Repeat. Improve. Win. 🏆",
    "Daily work pays off. 💰",
    "Momentum starts small. 🔥",
    "Consistency is power. ⚡",
    "Small actions scale. 📊",
    "Do it daily. Results follow. 🎯"
  ];
  const studyPhrases = [
    "Stay Focused",
    "Deep Work",
    "Keep Studying",
    "Daily Progress",
    "Consistent Effort",
    "Focused Practice",
    "Smart Work",
    "Active Recall",
    "Time Blocking",
    "No Distractions",
    "Study Daily",
    "Build Discipline",
    "Stay Consistent",
    "Task Completion",
    "Clear Goals",
    "Work Daily",
    "Intentional Practice",
    "Sustained Focus",
    "Efficient Study",
    "Mental Clarity"
  ];
  

  const quote = growthQuotes[Math.floor(Math.random() * growthQuotes.length)]
  const phrase = studyPhrases[Math.floor(Math.random() * studyPhrases.length)]
  

  return (
    <div className="flex w-[95%] ml-20 h-screen bg-white">
      {/* Left Column */}
      <div className="w-2/3 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-800 tracking-tight">
            Study Log
          </h1>

          <Dialog open={open} onOpenChange={setOpen} className="">
            <DialogTrigger>
              <Button
                className=" font-semibold border-[2px] border-zinc-500 text-white tracking-tighter flex items-center gap-2"
                variant={"outline"}
              >
                <PenBox
                  style={{
                    scale: 1.3,
                    color:'#27272a'
                  }} className=""
                />{" "}
                <span className="text-[1.05rem] font-medium text-zinc-800">Add log</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[120%]">
              <DialogHeader>
                <DialogTitle>Create a study log</DialogTitle>
                <StudyLog onSuccess={() => setOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {studyLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 text-center">
            <p className="text-lg text-zinc-500">
              No study sessions yet. Start logging your progress 🚀
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStudyLogs.map((log) => (
              <Card
                key={log.id}
                className="shadow-sm border border-zinc-200 rounded-2xl hover:shadow-md transition-all"
              >
                <CardContent className="p-5 flex justify-between items-center">
                  <div className="flex flex-col">
                    <h2 className="text-lg capitalize font-semibold text-zinc-900">
                      {log.topic}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-sm text-zinc-600 font-medium">
                        {log.subject}
                      </span>
                      {log.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${
                            TAG_COLORS[tag] || TAG_COLORS.Default
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{log.date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-zinc-700 font-medium text-sm">
                      <Clock size={16} /> {toHours(log.duration)} hrs
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full hover:bg-zinc-100"
                    >
                      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogTrigger>
                          <Edit3 size={16} className="text-zinc-600" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit your log here</DialogTitle>
                            <EditLog
                              studyLogData={log}
                              onSuccess={() => setOpenEdit(false)}
                            />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full hover:bg-red-50"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your study log.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>{
                              console.log(userId, log._id);
                              
                              deleteLog(log._id, userId)
                            }
                            }
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-1/3 mt-10 border-l bg-zinc-50 p-8 flex flex-col gap-6">
        {/* Weekly Progress */}
        <WeeklyProgress />

        {/* Streak Tracker */}
        <Card className="shadow-sm border rounded-2xl">
          <CardContent className="p-5">
            <p className="text-lg font-semibold text-zinc-800">
              {streak}-Day Streak
            </p>
            <p className="text-sm text-zinc-500">
              Keep it up! Consistency compounds.
            </p>
          </CardContent>
        </Card>

        {/* Filters & Search */}
        <Card className="shadow-sm border rounded-2xl">
          <CardContent className="p-5">
            <h2 className="text-md font-semibold text-zinc-800 mb-4">
              Search & Filter
            </h2>
            <Input placeholder="Search topics..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}  className="mb-4 rounded-xl" />
            <div className="flex gap-2 flex-wrap">
              <Button onClick={(e) => setSearchInput('Mathematics')} variant="outline" size="sm" className="rounded-full">
                Mathematics
              </Button>
              <Button onClick={(e) => setSearchInput('Chemistry')} variant="outline" size="sm" className="rounded-full">
                Chemistry
              </Button>
              <Button onClick={(e) => setSearchInput('Physics')} variant="outline" size="sm" className="rounded-full">
              Physics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Motivation */}
        <Card className="shadow-sm border rounded-2xl">
          <CardContent className="p-5">
            <h2 className="text-md font-semibold text-zinc-800 mb-2">
              {phrase}
            </h2>
            <p className="text-sm text-zinc-500 italic">
              {quote}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyHero;
