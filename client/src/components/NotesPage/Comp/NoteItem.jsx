export function NoteItem({ note }) {
    return (
      <div
        className="
          p-3 rounded-md border cursor-pointer
          hover:bg-muted transition
        "
      >
        <div className="font-medium text-sm truncate">
          {note.title}
        </div>
  
        <div className="text-xs text-muted-foreground truncate">
          {note.content || "No content"}
        </div>
  
        <div className="text-[10px] text-muted-foreground mt-1">
          {note.updatedAt}
        </div>
      </div>
    )
  }
  