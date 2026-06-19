import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatbotResponses } from "@/data/tourismData";

interface Message {
  role: "user" | "bot";
  content: string;
}

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(chatbotResponses)) {
    if (key !== "default" && lower.includes(key)) return value;
  }
  const countryKeywords = ["france", "spain", "usa", "china", "italy", "turkey", "thailand", "germany", "japan", "australia", "brazil", "canada", "uk", "mexico"];
  const found = countryKeywords.find((c) => lower.includes(c));
  if (found) {
    return `**${found.charAt(0).toUpperCase() + found.slice(1)}** is a popular tourism destination. Try asking about specific topics like revenue, trends, visa information, or employment data for more detailed insights!`;
  }
  return chatbotResponses.default;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "👋 Welcome to the **Tourism AI Assistant**! I can help you explore tourism data, trends, and insights.\n\nTry asking:\n- *Which country has highest tourism?*\n- *Tourism trends in India*\n- *Revenue growth*\n- *COVID impact on tourism*" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: getResponse(userMsg) }]);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-heading mb-2 text-center">
          Tourism <span className="gradient-ocean-text">AI Assistant</span>
        </h1>
        <p className="text-muted-foreground text-center mb-8">Ask questions about global tourism data and get instant insights.</p>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col" style={{ height: "65vh" }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "bot" && (
                    <div className="gradient-ocean w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "gradient-ocean text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="bg-muted w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about tourism data..."
                  className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
                <button
                  onClick={send}
                  className="gradient-ocean text-primary-foreground rounded-xl px-4 py-3 hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
