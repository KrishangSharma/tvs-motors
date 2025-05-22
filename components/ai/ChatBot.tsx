"use client";
import { useState, useRef, useEffect } from "react";
import type React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  X,
  Send,
  Loader2,
  CircleStop,
  Command,
  MessageCircle,
} from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
  });

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      setHasInteracted(false); // Reset interaction state when opening
    }
  };

  // Focus input when chat opens or after loading completes
  useEffect(() => {
    if (isChatOpen && !isLoading && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isChatOpen, isLoading]);

  // Prevent background scrolling when chat is open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isChatOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Set hasInteracted to true when there are messages
    if (messages.length > 0 && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [messages, hasInteracted]);

  // Custom submit handler to prevent multiple submissions while loading
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleSubmit(e);
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        size="icon"
        variant="ghost"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg text-white hover:from-blue-600 hover:to-blue-700 hover:text-white transition duration-300 ease-in-out h-14 w-14"
        onClick={toggleChat}
        ref={chatIconRef}
        aria-label={isChatOpen ? "Close command center" : "Open command center"}
      >
        <div className="transition-transform duration-300 ease-in-out">
          {isChatOpen ? <X size={26} /> : <MessageCircle size={26} />}
        </div>
      </Button>

      {/* Overlay with blur effect */}
      {/* <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
            onClick={toggleChat}
            aria-hidden="true"
          />
        )}
      </AnimatePresence> */}

      {/* Command Center Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-50 w-full"
            style={{
              top: "15%",
              transform: hasInteracted
                ? "translate(-50%, -50%)"
                : "translate(-50%, 0)",
            }}
          >
            <div
              className={cn(
                "w-[95%] max-w-4xl mx-auto transition-all duration-500 ease-in-out",
                hasInteracted
                  ? "bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl"
                  : ""
              )}
            >
              {/* Command Center Header - Only visible after interaction */}
              {hasInteracted && (
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Command size={20} className="text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      TVS Command Center
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </Button>
                </div>
              )}

              {/* Messages Area - Only visible after interaction */}
              {hasInteracted && (
                <div className="p-4">
                  <ScrollArea className="h-[400px] pr-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                      >
                        <div
                          className={cn(
                            "inline-block rounded-lg px-2",
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          )}
                        >
                          <ReactMarkdown
                            children={message.content}
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ inline, children, ...props }) {
                                return inline ? (
                                  <code
                                    {...props}
                                    className="bg-gray-200 px-1 rounded text-blue-600"
                                  >
                                    {children}
                                  </code>
                                ) : (
                                  <pre
                                    {...props}
                                    className="bg-gray-200 p-3 rounded-lg my-2 text-gray-800 overflow-x-auto"
                                  >
                                    <code>{children}</code>
                                  </pre>
                                );
                              },
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 my-2">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-5 my-2">
                                  {children}
                                </ol>
                              ),
                              p: ({ children }) => (
                                <p className="my-2">{children}</p>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  className="text-blue-600 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Loader2 className="animate-spin" size={18} />
                        <span>TVS AI is thinking...</span>
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-center justify-between">
                        <p>Couldn&apos;t generate a response</p>
                        <Button
                          variant="ghost"
                          onClick={() => reload()}
                          className="text-red-600 hover:text-red-700 hover:bg-red-100"
                        >
                          Retry
                        </Button>
                      </div>
                    )}
                    <div ref={scrollRef} />
                  </ScrollArea>
                </div>
              )}

              {/* Command Input */}
              <div className={cn("p-4", hasInteracted ? "" : "w-full")}>
                <form
                  onSubmit={onSubmit}
                  className="flex items-center space-x-2 w-full"
                >
                  <div
                    className={cn(
                      "relative flex items-center w-full transition-all duration-300",
                      hasInteracted ? "" : "max-w-2xl mx-auto"
                    )}
                  >
                    <div className="relative w-full">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Command size={20} />
                      </div>
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        className={cn(
                          "flex-1 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                          hasInteracted ? "rounded-lg h-14" : "rounded-lg h-14"
                        )}
                        placeholder={
                          hasInteracted
                            ? "Type your message..."
                            : "Ask TVS Command Center..."
                        }
                        disabled={isLoading}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isLoading ? (
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => stop()}
                            className="h-10 w-10 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                          >
                            <CircleStop size={20} />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            disabled={!input.trim()}
                            className="h-10 w-10 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 disabled:opacity-50"
                          >
                            <Send size={20} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
