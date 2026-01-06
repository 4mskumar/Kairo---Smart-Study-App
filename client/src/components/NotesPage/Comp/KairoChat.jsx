import { ChatSidebar } from "./ChatSidebar"
import { ChatWindow } from "./ChatWindow"
import { ChatInput } from "./ChatInput"

function KairoChat() {
  return (
    <div className="flex w-full h-screen bg-background text-foreground">
      <ChatSidebar />

      <div className="flex flex-col flex-1">
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  )
}

export default KairoChat
