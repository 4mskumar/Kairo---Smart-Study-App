import React, { useState } from "react";
import { DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { subjects } from "../data/subjects";
import { tags as TagData } from "../data/tags";

import { AutoComplete } from "primereact/autocomplete";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useStudyStore } from "../app/studyStore";

const StudyLog = ({ onSuccess }) => {
  const [subject, setSubject] = useState(""); // ✅ subject input
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [topic, setTopic] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);

  const [tags, setTags] = useState([]); // ✅ selected tags
  const [inputValue, setInputValue] = useState(""); // ✅ tag input
  const [filteredTags, setFilteredTags] = useState([]);

  const { userId } = useAuth();

  // ---- SEARCHERS ----
  const searchSubject = (event) => {
    let results = subjects.filter((s) =>
      s.toLowerCase().includes(event.query.toLowerCase())
    );
    setFilteredSubjects(results);
  };

  const searchTag = (event) => {
    let results = TagData.map((t) => (typeof t === "string" ? t : t.label)) // normalize to string
      .filter((s) => s.toLowerCase().includes(event.query.toLowerCase()));
    setFilteredTags(results);
  };

  // ---- ADD TAG ----
  const addTag = (tag) => {
    const cleanTag = tag.trim().toLowerCase();
    if (!cleanTag) return;

    setTags((prev) => (prev.includes(cleanTag) ? prev : [...prev, cleanTag]));
  };

  const { addStudyLog } = useStudyStore();

  const handleStudyLogSubmit = async (e) => {
    e.preventDefault();
    const duration = Number(hours * 60) + Number(minutes);
    console.log(duration);
    try {
      const res = await addStudyLog(duration, topic, tags, userId, subject);

      if (res.success) {
        toast(res.message, {
          className:
            "animate-bounce bg-green-100 text-green-700 font-semibold shadow-md rounded-xl",
        });
        onSuccess?.(); // close dialog
      } else {
        toast(res.message + "hello");
        // toast(res.stack)
      }
    } catch (error) {
      toast(error.message + "hello");
      // toast(error.stack)
    }
  };

  return (
    <form onSubmit={handleStudyLogSubmit} className="flex flex-col">
      <DialogDescription className="flex flex-col gap-5">
        {/* SUBJECT */}
        <div className="flex mt-2 gap-2 items-center">
          <h1 className="text-zinc-800 font-medium tracking-tight text-lg">
            Subject:
          </h1>
          <AutoComplete
            required
            value={subject}
            suggestions={filteredSubjects}
            placeholder="Mathematics"
            completeMethod={searchSubject}
            className="outline-none w-full rounded-lg px-2 py-2 border-[1px] border-zinc-300"
            onChange={(e) => setSubject(e.value)} // ✅ string only
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ArrowDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Subjects</DropdownMenuLabel>
              <DropdownMenuGroup>
                {subjects.map((val, ind) => (
                  <DropdownMenuItem
                    key={ind}
                    className="cursor-pointer"
                    onSelect={() => setSubject(val)}
                  >
                    {val}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* duration */}
        <div className="relative flex items-center justify-between gap-1 w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-zinc-800 font-medium tracking-tight text-lg">
              Duration:
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex items-end gap-1">
                <Input
                  required
                  type="number"
                  min={0}
                  max={24}
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-[50%] cursor-pointer"
                />
                <h1 className="text-md tracking-tight text-zinc-00 font-medium">
                  hr
                </h1>
              </span>
              <span className="flex items-end gap-1">
                <Input
                  required
                  type="number"
                  min={0}
                  max={60}
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-[50%] cursor-pointer"
                />
                <h1 className="text-md tracking-tight text-zinc-700 font-medium">
                  min
                </h1>
              </span>
            </div>
          </div>
          {!hours && !minutes && (
            <span className=" text-gray-400 pointer-events-none">hh:mm</span>
          )}
        </div>

        {/* TOPIC */}
        <div className="flex items-end gap-1 flex-col">
          <div className=" items-center w-full gap-2 flex">
            <h1 className="text-zinc-800 font-medium tracking-tight text-lg">
              Topic:
            </h1>
            <Input
              type="text"
              value={topic}
              placeholder="Mathematics Integration"
              onChange={(e) => setTopic(e.target.value)}
              className="w-full"
            />
          </div>
          <p className="text-xs italic text-zinc-500 text-right">optional</p>
        </div>

        {/* TAGS */}
        {/* TAGS */}
        <div className="items-center w-full gap-2 flex">
          <h1 className="text-zinc-800 font-medium tracking-tight text-lg">
            Tags:
          </h1>
          <div className="flex w-full flex-col">
            {/* Show selected tags */}
            <div className="flex items-center flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-zinc-200 rounded-md text-sm cursor-pointer"
                  onClick={() =>
                    setTags((prev) => prev.filter((t) => t !== tag))
                  }
                >
                  {tag} ✕
                </span>
              ))}
            </div>

            {/* Autocomplete for tags */}
            <AutoComplete
              value={inputValue}
              suggestions={filteredTags}
              completeMethod={searchTag}
              placeholder="#revise"
              onChange={(e) => {
                setInputValue(e.value);
                setIsSelecting(false);
              }}
              onSelect={(e) => {
                setIsSelecting(true);
                addTag(e.value);
                setInputValue("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  // ⛔ block Enter if a suggestion was selected
                  if (isSelecting) return;

                  if (inputValue.trim() !== "") {
                    addTag(inputValue.trim());
                    setInputValue("");
                  }
                }
              }}
              className="outline-none w-full rounded-lg px-2 py-2 border-[1px] border-zinc-300"
            />

            <p className="text-xs italic text-zinc-500 text-right">optional</p>
          </div>
        </div>

        <Button variant={"secondary"} className="cursor-pointer">
          <Input type="submit" className="cursor-pointer" value={"Save log"} />
        </Button>
      </DialogDescription>
    </form>
  );
};

export default StudyLog;
