import { UserButton } from "@clerk/clerk-react";
import React from "react";
import NotesNavPopover from "./Comp/NotesNavPopover";
import KairoChat from "./Comp/KairoChat";
import NotesWindow from "./Comp/NotesWindow";

const Hero = () => {
  return (
    <div className="w-full flex justify-between h-screen">
      {/* <NotesNavPopover /> */}
      <KairoChat />
      <NotesWindow />
    </div>
  );
};

export default Hero;
