import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Send } from "lucide-react"

export function ChatInput() {
  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          className="resize-none min-h-[44px]"
        />
        <Button size="icon">
          <Send size={16} />
        </Button>
      </div>
    </div>
  )
}
