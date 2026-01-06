import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { useNavigate } from "react-router-dom";

const NotesNavPopover = () => {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          ☰
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-48 p-2">
        <nav className="flex flex-col text-sm">
          <NavItem
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <NavItem
            label="Study Logs"
            onClick={() => navigate("/study-logs")}
          />
          <Separator className="my-1" />
          <NavItem
            label="Profile"
            onClick={() => navigate("/profile")}
          />
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default NotesNavPopover;

// ---- helper ----
const NavItem = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        text-left px-3 py-2 rounded-md
        hover:bg-muted transition
      "
    >
      {label}
    </button>
  );
};
