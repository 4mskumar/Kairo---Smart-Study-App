import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { ArrowDown } from "lucide-react";
import { tags as TagData } from "../../../data/tags";
import { AutoComplete } from "primereact/autocomplete";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { DialogDescription } from "../../ui/dialog";
import { subjects } from "../../../data/subjects";
import { useStudyStore } from "../../../app/studyStore";

const EditLog = ({ onSuccess, studyLogData }) => {
  const { userId } = useAuth();
  const { editLog } = useStudyStore();

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState([]);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!studyLogData) return;

    setSubject(studyLogData.subject || "");
    setTopic(studyLogData.topic || "");
    setTags(studyLogData.tags || []);

    const totalMinutes = studyLogData.duration || 0;
    setHours(Math.floor(totalMinutes / 60));
    setMinutes(totalMinutes % 60);
  }, [studyLogData]);

  /* ---------------- SEARCH ---------------- */
  const searchSubject = (e) => {
    setFilteredSubjects(
      subjects.filter((s) =>
        s.toLowerCase().includes(e.query.toLowerCase())
      )
    );
  };

  const searchTag = (e) => {
    setFilteredTags(
      TagData.map((t) => (typeof t === "string" ? t : t.label)).filter((t) =>
        t.toLowerCase().includes(e.query.toLowerCase())
      )
    );
  };

  /* ---------------- TAGS ---------------- */
  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleEditLogSubmit = async (e) => {
    e.preventDefault();

    const duration = Number(hours) * 60 + Number(minutes);

    if (duration <= 0) {
      toast("Duration must be greater than 0");
      return;
    }

    const res = await editLog(
      duration,
      topic,
      tags,
      userId,
      subject,
      studyLogData._id
    );

    if (res.success) {
      toast(res.message);
      onSuccess?.();
    } else {
      toast(res.message);
    }
  };

  return (
    <form onSubmit={handleEditLogSubmit}>
      <DialogDescription className="flex flex-col gap-5">

        {/* SUBJECT */}
        <div className="flex gap-2 items-center">
          <h1 className="font-medium text-lg">Subject:</h1>
          <AutoComplete
            value={subject}
            suggestions={filteredSubjects}
            completeMethod={searchSubject}
            onChange={(e) => setSubject(e.value)}
            className="w-full"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><ArrowDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Subjects</DropdownMenuLabel>
              <DropdownMenuGroup>
                {subjects.map((s) => (
                  <DropdownMenuItem key={s} onSelect={() => setSubject(s)}>
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* DURATION */}
        <div className="flex gap-3 items-center">
          <h1 className="font-medium text-lg">Duration:</h1>
          <Input
            type="number"
            min={0}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours"
            className="w-24"
          />
          <Input
            type="number"
            min={0}
            max={59}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutes"
            className="w-24"
          />
        </div>

        {/* TOPIC */}
        <div className="flex gap-2 items-center">
          <h1 className="font-medium text-lg">Topic:</h1>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Integration"
          />
        </div>

        {/* TAGS */}
        <div>
          <div className="flex gap-2 flex-wrap mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="px-2 py-1 bg-zinc-200 rounded cursor-pointer"
              >
                {tag} ✕
              </span>
            ))}
          </div>

          <AutoComplete
            value={inputValue}
            suggestions={filteredTags}
            completeMethod={searchTag}
            onChange={(e) => setInputValue(e.value)}
            onSelect={(e) => {
              addTag(e.value);
              setInputValue("");
            }}
            placeholder="#revision"
          />
        </div>

        <Button type="submit">Save log</Button>
      </DialogDescription>
    </form>
  );
};

export default EditLog;
