import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { messagesType } from "./ChatFooter";
import { MessageSquareText } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatBody = ({ messages }: { messages: messagesType[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div ref={scrollRef} className="h-96 max-h-96 overflow-y-auto p-4 pb-0">
      {messages.map((msg, i) => (
        <>
          <div key={i} className="flex items-end gap-1 justify-end">
            {msg.role !== "user" && (
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  <MessageSquareText />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`w-fit rounded-t-xl rounded-bl-xl p-4 mx-2 mb-2 ${
                msg.role === "user"
                  ? "text-right bg-primary text-primary-foreground"
                  : "text-left mr-auto bg-secondary text-secondary-foreground"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
          <span
            className={`block text-xs text-muted-foreground ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
          </span>
        </>
      ))}
    </div>
  );
};
export default ChatBody;
