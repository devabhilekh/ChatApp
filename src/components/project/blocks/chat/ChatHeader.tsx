import { CardHeader, CardTitle } from "@/components/ui/card";

const ChatHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between gap-2 px-0">
        How can we help you?
      </CardTitle>
    </CardHeader>
  );
};

export default ChatHeader;
