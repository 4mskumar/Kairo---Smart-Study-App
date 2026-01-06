import { useState } from "react"
import { Button } from "../../ui/button"
import { ScrollArea } from "../../ui/scroll-area"
import { Separator } from "../../ui/separator"
import NotesNavPopover from "./NotesNavPopover"
import { MoreVertical, Pencil, Trash } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog"

const chats = [
  { id: 1, title: "Study Plan" },
  { id: 2, title: "React Doubts" },
  { id: 3, title: "DSA Revision" },
]

export function ChatSidebar() {
  const [renameChat, setRenameChat] = useState(null)
  const [deleteChat, setDeleteChat] = useState(null)
  const [newTitle, setNewTitle] = useState("")

  return (
    <div className="w-64 border-r h-screen flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <NotesNavPopover />
        <Button variant="outline" className="w-full">
          + New Chat
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between"
            >
              <button className="flex-1 text-left px-3 py-2 rounded-md hover:bg-muted transition">
                {chat.title}
              </button>

              {/* ACTION POPOVER */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-40 p-1">
                  <button
                    onClick={() => {
                      setRenameChat(chat)
                      setNewTitle(chat.title)
                    }}
                    className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-muted"
                  >
                    <Pencil size={14} />
                    Rename
                  </button>

                  <button
                    onClick={() => setDeleteChat(chat)}
                    className="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-600 rounded hover:bg-muted"
                  >
                    <Trash size={14} />
                    Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* RENAME DIALOG */}
      <Dialog open={!!renameChat} onOpenChange={() => setRenameChat(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
          </DialogHeader>

          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Chat name"
          />

          <DialogFooter>
            <Button
              onClick={() => {
                console.log("Rename to:", newTitle)
                setRenameChat(null)
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE ALERT */}
      <AlertDialog open={!!deleteChat} onOpenChange={() => setDeleteChat(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                console.log("Deleted:", deleteChat)
                setDeleteChat(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
