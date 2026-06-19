import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, X, Mail, Phone, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatbotResponses } from "@/data/tourismData";
import chatbotAvatar from "@/assets/chatbot-avatar.png";

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

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "👋 Welcome to the **Tourism AI Assistant**! I can help you explore tourism data, trends, and insights.\n\nTry asking:\n- *Which country has highest tourism?*\n- *Tourism trends in India*\n- *Revenue growth*\n- *COVID impact on tourism*",
    },
  ]);
  const [input, setInput] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setContactOpen(false);
      setSubmitted(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <>
      {/* Contact Us Button - Above Ask Me */}
      <motion.button
        onClick={() => setContactOpen(true)}
        className="fixed bottom-28 right-6 z-50 flex flex-col items-center gap-1 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-secondary border-2 border-primary/50 flex items-center justify-center shadow-lg overflow-hidden hover:bg-secondary/80 transition-colors">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xs font-display font-semibold text-primary mt-1">Contact Us</span>
        </motion.div>
      </motion.button>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="w-14 h-14 rounded-full gradient-ocean flex items-center justify-center shadow-lg"
            >
              <X className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shadow-lg overflow-hidden">
                <img src={chatbotAvatar} alt="Ask Me" className="w-14 h-14 object-contain" />
              </div>
              <span className="text-xs font-display font-semibold text-primary mt-1">Ask Me</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-ocean px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center overflow-hidden">
                <img src={chatbotAvatar} alt="Bot" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <p className="text-sm font-display font-semibold text-primary-foreground">Tourism AI Assistant</p>
                <p className="text-xs text-primary-foreground/70">Online • Ask me anything</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "bot" && (
                    <div className="gradient-ocean w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "gradient-ocean text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert [&_p]:m-0 [&_ul]:my-1 [&_li]:my-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="bg-muted w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about tourism data..."
                  className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
                <button
                  onClick={send}
                  className="gradient-ocean text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Us Panel */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-ocean px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-display font-semibold text-primary-foreground">Get in Touch</p>
                  <p className="text-xs text-primary-foreground/70">We'd love to hear from you</p>
                </div>
              </div>
              <button onClick={() => setContactOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contact Form */}
            <div className="p-4 space-y-4">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Message Sent!</p>
                  <p className="text-xs text-muted-foreground mt-1">We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full min-h-[80px] bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full gradient-ocean text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              )}

              {/* Contact Info */}
              <div className="border-t border-border pt-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground text-center">Or reach us directly</p>
                <div className="flex justify-center gap-4">
                  <a href="mailto:contact@tourviz.com" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email</span>
                  </a>
                  <a href="tel:+1234567890" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;
