import { ScrollArea } from "../../ui/scroll-area"
import {Message} from './Message'

const messages = [
  { id: 1, role: "assistant", content: "How can I help you today?" },
  { id: 2, role: "user", content: "Explain spaced repetition." },
  { id: 3, role: "assistant", content: "Space repition i a spacde repition is a vitual comllin where we can do as many things as we want now the thing is we can virtue anything and that will happen" },
]


export function ChatWindow() {
  return (
    <ScrollArea className="flex-1 p-6">
      <div className="space-y-4 pt-14">
        {messages.map(msg => (
          <Message
            key={msg.id}
            role={msg.role}
            content={msg.content}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
