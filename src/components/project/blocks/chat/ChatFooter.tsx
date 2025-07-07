import { useRef, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export type messagesType = { role: string; text: string; timestamp: string };
const ChatFooter = ({
  setMessages,
}: {
  setMessages: Dispatch<SetStateAction<messagesType[]>>;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const getGeminisResponse = async (text: string) => {
    const response = await fetch(import.meta.env.VITE_GEMINI_API_KEY, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text,
              },
            ],
          },
        ],
      }),
    });
    const data = await response.json();
    console.log(data);
    setMessages((prev) => [
      ...prev,
      {
        role: data.candidates[0].content.role,
        text: data.candidates[0].content.parts[0].text,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const sendMessage = async (
    e: React.FormEvent | React.KeyboardEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!inputRef.current) return;
    const input = inputRef.current.value.trim();
    const message = {
      role: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    // socket.emit('message', message)
    setMessages((prev) => [...prev, message]);
    inputRef.current.value = "".trim();
    await getGeminisResponse(input);
  };
  return (
    <form onSubmit={sendMessage} className="grid w-full gap-2 px-4">
      <Textarea
        placeholder="Ask a question or type a new message here..."
        ref={inputRef}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(e)}
      />

      <Button type="submit">
        <Send size={16} /> Send
      </Button>
    </form>
  );
};
export default ChatFooter;
