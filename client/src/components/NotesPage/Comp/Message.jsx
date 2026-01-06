export function Message({
    role,
    content,
  }) {
    const isUser = role === "user"
  
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
            isUser
              ? "bg-black text-white"
              : "bg-muted text-foreground"
          }`}
        >
          {content}
        </div>
      </div>
    )
  }
  