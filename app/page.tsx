import { ChatInput1 } from "@/components/chat-input-1";
import { Background } from "@/components/background";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">


      {/* 输入框 */}
      <div className="flex-1 flex w-full items-center justify-center relative z-10">
        <ChatInput1 />
      </div>

    </div>
  );
}
