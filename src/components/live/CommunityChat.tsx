import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Card } from "../ui/Card";

type ChatMessage = {
  id: string;
  author: string;
  text: string;
  time: string;
  isOwn?: boolean;
};

const SEED_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    author: "BicolHoopsFan",
    text: "Let's go BU! Defense needs to lock in this quarter 🔥",
    time: "8:02 PM",
  },
  {
    id: "2",
    author: "ADNU_Eagles",
    text: "ADNU comeback loading...",
    time: "8:03 PM",
  },
  {
    id: "3",
    author: "LegazpiLocal",
    text: "Coliseum is packed tonight, what an atmosphere!",
    time: "8:04 PM",
  },
  {
    id: "4",
    author: "BUCAL_Official",
    text: "Welcome to the live broadcast chat. Keep it respectful!",
    time: "8:05 PM",
  },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function CommunityChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        author: "You",
        text,
        time: formatTime(new Date()),
        isOwn: true,
      },
    ]);
    setDraft("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-[var(--accent)]" />
          <h2 className="text-sm font-bold">Community Chat</h2>
        </div>
        <span className="rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
          {128 + messages.length} online
        </span>
      </div>

      <div
        ref={listRef}
        className="flex max-h-56 flex-col gap-3 overflow-y-auto px-4 py-3"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col gap-0.5 ${message.isOwn ? "items-end" : "items-start"}`}
          >
            <div className="flex items-baseline gap-2">
              <span
                className={`text-[11px] font-bold ${
                  message.isOwn ? "text-[var(--accent)]" : "text-[var(--text)]"
                }`}
              >
                {message.author}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">{message.time}</span>
            </div>
            <p
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-snug ${
                message.isOwn
                  ? "rounded-br-sm bg-[var(--accent)]/15 text-[var(--text)]"
                  : "rounded-bl-sm bg-[var(--bg)] text-[var(--text)]/90"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-[var(--border)] p-3">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!draft.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] transition-opacity disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </Card>
  );
}
