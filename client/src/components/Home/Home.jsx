import { useAuth, UserButton } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { ArrowDown, ArrowDownAZ, PenBox } from "lucide-react";
import { subjects } from "../../data/subjects";
import { AutoComplete } from "primereact/autocomplete";
import StudyLog from "../StudyLog";
import Hero from "./Hero";
import WeekLog from "../WeekLog";
import axios from "axios";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { userId } = useAuth();

  return (
    <div
      className="w-[94%] relative ml-24 pt-14 px-4 min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #fffaf3 0%, #fffdf9 40%, #ffffff 100%)",
      }}
    >
      <div className="w-[100.5%] h-20 bg-gradient-to-b from-orange-200/20 via-orange-300/10 to-transparent -z-10 absolute top-0 left-0"></div>
      <div className="flex items-center gap-4">
        <Dialog open={open} onOpenChange={setOpen} className="">
          <DialogTrigger>
            <Button
              className=" font-semibold text-white tracking-tighter flex items-center gap-2"
              variant={"destructive"}
            >
              <PenBox
                style={{
                  scale: 1.3,
                }}
              />{" "}
              <span className="text-[1.05rem]">Create a log</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[120%]">
            <DialogHeader>
              <DialogTitle>Create a study log</DialogTitle>
              <StudyLog onSuccess={() => setOpen(false)} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog open={open2} onOpenChange={setOpen2}>
          <DialogTrigger>
            <Button
              className="border-zinc-800 font-semibold text-zinc-800 tracking-tighter flex items-center gap-2"
              variant={"outline"}
            >
              <span className="text-[1.05rem]">Set week goal</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[120%]">
            <DialogHeader>
              <DialogTitle>How many hours a day</DialogTitle>
              <WeekLog onSuccess={() => setOpen(false)} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Hero />
      </div>
    </div>
  );
};

export default Home;
