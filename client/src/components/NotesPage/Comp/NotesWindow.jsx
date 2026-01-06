import React, { useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
// import { Textarea } from "../../ui/textarea"
import { ScrollArea } from "../../ui/scroll-area"
import {  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../../ui/dialog"
import { Plus } from "lucide-react"
import {NoteItem} from './NoteItem'

const dummyNotes = [
  {
    id: "1",
    title: "Spaced Repetition",
    content: "Revise after 1, 3, 7 days",
    updatedAt: "Today",
  },
  {
    id: "2",
    title: "React useEffect",
    content: "Cleanup function runs on unmount",
    updatedAt: "Yesterday",
  },
]

export default function NotesWindow() {
  const [notes, setNotes] = useState(dummyNotes)

  const createNewNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      updatedAt: "Just now",
    }

    setNotes([newNote, ...notes])
  }

  return (
    <div className="w-[20%] h-full border rounded-lg bg-background flex flex-col">
      {/* Header */}

      <div className="p-3 border-b">
        <Dialog>
          <DialogTrigger asChild>

        <Button
          className="w-full gap-2"
          >
          <Plus size={16} />
          Create Note
        </Button>
            </DialogTrigger>
            <DialogContent className="w-[120%]">
              <DialogHeader>
                <DialogTitle>Create a new note</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <Input type="text" placeholder="Title" />
                {/* <Textarea placeholder="Content" /> */}
              </DialogDescription>
            </DialogContent>
        </Dialog>
      </div>

      {/* Notes List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
