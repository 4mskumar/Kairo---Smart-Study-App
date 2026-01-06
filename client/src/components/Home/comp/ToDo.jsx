import { PenBox, Plus, SeparatorHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ToDoLog from "../../ToDoLog";
import TodoList from "./TodoList";

const ToDo = () => {
  const [open, setOpen] = useState(false); 

  return (
    <div className=" w-2/3 bg-orange-100 p-3 rounded-lg ">
      <div className="text-xl  flex justify-between  items-center text-zinc-800 font-semibold tracking-tighter">
        <h3 className="text-orange-700">Your To-Dos</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange-700 hover:shadow-lg duration-200 hover:bg-orange-600/70">
              <span className="font-medium text-lg">Create</span>{" "}
              <Plus className="border-1 rounded-full border-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[120%]">
            <DialogHeader>
              <DialogTitle>Create your to-do task 😉</DialogTitle>
              <ToDoLog onSuccess={() => setOpen(false)} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border-sinc-200 mt-2 w-full px-3 py-1 border-orange-200 rounded-lg border-[1px]">
        <div className="flex justify-between items-center mt-3 border-b border-orange-200 pb-1 mb-1 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-zinc-700 tracking-tight">
            Title
          </h1>
          <h1 className="text-lg font-semibold text-zinc-700 tracking-tight">
            Completed
          </h1>
        </div>

        {/* Scrollable logs */}
        <ScrollArea className="h-[25.5rem]">
          <TodoList />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ToDo;
