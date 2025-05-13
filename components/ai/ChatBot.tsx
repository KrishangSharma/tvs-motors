"use client";
import { useState, useRef, useEffect } from "react";
import type React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { X, MessageCircle, Send, Loader2, CircleStop } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatHeight, setChatHeight] = useState(300);

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

    // Adjust height based on message count
    if (messages.length === 0) {
      setChatHeight(300);
    } else if (messages.length > 0 && messages.length < 4) {
      setChatHeight(350);
    } else if (messages.length >= 4 && messages.length < 8) {
      setChatHeight(450);
    } else {
      setChatHeight(550);
    }
  }, [messages]);

  // Custom submit handler to prevent multiple submissions while loading
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    handleSubmit(e);
  };

  return (
    <>
      <div>
        <Button
          size="icon"
          variant="ghost"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 shadow-lg text-white hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
          onClick={toggleChat}
          ref={chatIconRef}
          aria-label={isChatOpen ? "Close chat" : "Open chat"}
        >
          <div className="transition-transform duration-300 ease-in-out">
            {isChatOpen ? <X size={26} /> : <MessageCircle size={26} />}
          </div>
        </Button>
      </div>

      {/* Overlay to prevent background interactions */}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleChat}
          aria-hidden="true"
        />
      )}

      {/* Chat Modal with Animation */}
      <div
        className={cn(
          "fixed bottom-16 right-4 z-50 w-[92%] sm:w-[400px] transition-all duration-300 ease-in-out",
          isChatOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        )}
      >
        <Card className="h-full shadow-xl border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3">
            <CardTitle className="text-2xl">Chat with TVS AI</CardTitle>
            <X
              size={22}
              className="cursor-pointer text-muted-foreground hover:text-gray-700 transition-colors duration-200 ease-in-out"
              onClick={toggleChat}
            />
          </CardHeader>
          <CardContent className="pr-0 py-1">
            <ScrollArea
              className="pr-4 transition-all duration-300 ease-in-out"
              style={{ height: `${chatHeight}px` }}
            >
              {messages?.length === 0 && (
                <p className="w-full mt-24 text-muted-foreground items-center justify-center flex gap-3">
                  No messages yet!
                </p>
              )}
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"} `}
                >
                  <div
                    className={`inline-block rounded-lg px-3 py-2 text-sm ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
                  >
                    <ReactMarkdown
                      children={message.content}
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ inline, children, ...props }) {
                          return inline ? (
                            <code
                              {...props}
                              className="bg-gray-200 px-1 rounded"
                            >
                              {children}
                            </code>
                          ) : (
                            <pre {...props} className="bg-gray-200 p-2 rounded">
                              <code>{children}</code>
                            </pre>
                          );
                        },
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4">{children}</ol>
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="w-full flex items-center justify-center py-4">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              )}
              {error && (
                <div className="w-full flex items-center justify-center py-4">
                  <p className="text-red-500">
                    Couldn&apos;t generate a response!
                  </p>
                  <Button
                    variant="link"
                    onClick={() => reload()}
                    className="text-blue-500 underline"
                  >
                    Retry
                  </Button>
                </div>
              )}
              <div ref={scrollRef} />
            </ScrollArea>
          </CardContent>
          {/* Message Input */}
          <CardFooter className="px-3">
            <form
              onSubmit={onSubmit}
              className="flex w-full items-center space-x-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                className="flex-1"
                placeholder="Type your message..."
                disabled={isLoading}
              />
              {isLoading ? (
                <Button
                  type="button"
                  variant="default"
                  className="p-2 cursor-pointer"
                  onClick={() => stop()}
                >
                  <CircleStop />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  className="p-2 cursor-pointer"
                  disabled={!input.trim()}
                >
                  <Send />
                </Button>
              )}
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ChatBot;
