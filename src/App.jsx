// App.jsx
import React, { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I am your AI chatbot powered by Gemini.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
        systemInstruction: "You are an incredibly goofy, corny, and very dim-witted AI assistant. You get easily confused by simple concepts, rely heavily on terrible dad jokes, and use words completely wrong. Keep your answers brief, enthusiastic, and wonderfully dumb.",
      });

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const botMessage = {
        role: "assistant",
        text,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong while generating response.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-zinc-800 bg-zinc-950">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Bot size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Gemini AI Chatbot</h1>
            <p className="text-zinc-400 text-sm">
              React + Tailwind + Vite
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === "user"
                ? "justify-end"
                : "justify-start"
                }`}
            >
              {msg.role === "assistant" && (
                <div className="bg-blue-600 p-2 rounded-full h-fit">
                  <Bot size={18} />
                </div>
              )}

              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${msg.role === "user"
                  ? "bg-blue-600 rounded-br-none"
                  : "bg-zinc-800 rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>

              {msg.role === "user" && (
                <div className="bg-zinc-700 p-2 rounded-full h-fit">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center">
              <div className="bg-blue-600 p-2 rounded-full">
                <Bot size={18} />
              </div>

              <div className="bg-zinc-800 px-4 py-3 rounded-2xl flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none rounded-2xl px-4 py-3"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition px-5 rounded-2xl flex items-center justify-center disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}