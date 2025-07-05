import React from "react";

type Message = {
  role: "developer" | "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  chatWindowRef: React.RefObject<HTMLDivElement>;
};

const roleStyles = {
  user: {
    bg: "bg-primary-light text-text-default",
    icon: "👤",
    align: "justify-end",
    bubble: "rounded-br-2xl rounded-tl-2xl rounded-bl-md border border-primary-dark",
  },
  developer: {
    bg: "bg-accent-light text-text-default",
    icon: "💻",
    align: "justify-start",
    bubble: "rounded-bl-2xl rounded-tr-2xl rounded-br-md border border-accent-dark",
  },
  assistant: {
    bg: "bg-white text-text-default",
    icon: "🤖",
    align: "justify-start",
    bubble: "rounded-bl-2xl rounded-tr-2xl rounded-br-md border border-gray-200",
  },
};

export default function ChatWindow({ messages, chatWindowRef }: Props) {
  return (
    <div
      ref={chatWindowRef}
      className="bg-background-light border border-border rounded-xl p-4 h-80 overflow-y-auto mb-2 shadow-inner"
    >
      {messages.length === 0 ? (
        <div className="text-gray-400 text-center">No messages yet.</div>
      ) : (
        messages.map((msg, i) => {
          const style = roleStyles[msg.role];
          return (
            <div key={i} className={`mb-3 flex ${style.align}`}>
              <div className={`flex items-end gap-2 max-w-[80%]`}>
                {style.align === "justify-start" && (
                  <span className="text-xl select-none" title={msg.role}>{style.icon}</span>
                )}
                <div
                  className={`px-4 py-2 ${style.bg} ${style.bubble} shadow-md whitespace-pre-wrap break-words text-sm`}
                >
                  {msg.content}
                </div>
                {style.align === "justify-end" && (
                  <span className="text-xl select-none" title={msg.role}>{style.icon}</span>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
} 