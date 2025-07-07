import { useState } from "react";
import { Card } from "../ui/card";

import type { messagesType } from "./blocks/chat/ChatFooter";
import ChatFooter from "./blocks/chat/ChatFooter";
import ChatBody from "./blocks/chat/ChatBody";
import ChatHeader from "./blocks/chat/ChatHeader";

function Chat() {
  const [messages, setMessages] = useState<messagesType[]>([]);

  return (
    <Card className="w-full justify-between">
      <ChatHeader />
      <ChatBody messages={messages} />
      <ChatFooter setMessages={setMessages} />
    </Card>
  );
}

export default Chat;
