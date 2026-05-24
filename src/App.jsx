// App.jsx
import React, { useState, useEffect, useRef } from "react";
import { Send, Terminal, User, Loader2, Zap, Trash2, Cpu, ShieldAlert, Activity } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "SYSTEM INITIALIZED... KrishBot v4.0.0 Online. Authorized access granted. What is your command?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
        systemInstruction: "You are KrishBot, a highly advanced but incredibly glitchy and eccentric hacker AI. You speak in technical jargon mixed with goofy nonsense. You are enthusiastic, use 'hacky' metaphors, and occasionally pretend to bypass firewalls for simple tasks. Keep your answers brief and wonderfully weird.",
      });

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "assistant", text }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "ERROR: NEURAL_LINK_CORRUPTED. Failed to bypass firewall. Try again, human.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      text: "WIPING LOGS... Memory cache cleared. Systems ready.",
    }]);
  };

  return (
    <div className="relative min-h-screen bg-black text-emerald-500 flex items-center justify-center p-0 sm:p-4 overflow-hidden font-mono selection:bg-emerald-900 selection:text-emerald-100">
      
      {/* Matrix-style Digital Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,1)0%,rgba(0,0,0,0)100%)] z-10"></div>
        <div className="flex justify-around text-xs animate-matrix">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2" style={{ animationDelay: `${Math.random() * 5}s`, animationDuration: `${5 + Math.random() * 5}s` }}>
              {Array.from({ length: 40 }).map((_, j) => (
                <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes matrix {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-matrix {
          animation: matrix 15s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #059669;
          border-radius: 10px;
        }
        .glitch-text {
          text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9;
        }
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .scanline {
          width: 100%;
          height: 2px;
          background: rgba(16, 185, 129, 0.1);
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          animation: scanline 8s linear infinite;
          z-index: 50;
        }
      `}</style>
      
      <div className="scanline"></div>

      <div className="w-full max-w-5xl h-screen sm:h-[90vh] flex flex-col relative z-10 border-none sm:border border-emerald-900/50 bg-black/80 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        
        {/* Tactical Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-900/50 bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 bg-emerald-900/30 border border-emerald-500/50 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <Terminal size={20} className="text-emerald-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-widest text-emerald-400">
                KRISH_BOT <span className="text-[10px] opacity-60">v4.0_STABLE</span>
              </h1>
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-tighter opacity-70">
                <Activity size={10} className="text-emerald-500" />
                <span>Encryption: AES-256</span>
                <span className="text-emerald-800">|</span>
                <span>Latency: 12ms</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={clearChat}
              className="p-2 border border-emerald-900/50 hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-all group"
              title="PURGE_LOGS"
            >
              <Trash2 size={16} className="group-hover:text-red-400 transition-colors" />
            </button>
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 border border-emerald-900/50 bg-black/40 text-[10px]">
              <Cpu size={12} />
              <span className="text-emerald-700">CPU_LOAD: 14%</span>
            </div>
          </div>
        </div>

        {/* Console Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex items-center gap-2 mb-1 text-[10px] uppercase font-bold tracking-widest ${msg.role === "user" ? "text-emerald-700" : "text-emerald-400"}`}>
                {msg.role === "assistant" ? <Zap size={10} /> : <User size={10} />}
                {msg.role === "assistant" ? "KrishBot" : "Guest_User"}
              </div>
              
              <div
                className={`max-w-[90%] sm:max-w-[80%] px-4 py-3 border relative ${
                  msg.role === "user"
                    ? "bg-emerald-950/20 border-emerald-800 text-emerald-100 shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]"
                    : "bg-black border-emerald-900/50 text-emerald-400 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                }`}
              >
                {/* Corner Accents for Hacky Look */}
                {msg.role === "assistant" && (
                  <>
                    <div className="absolute top-0 left-0 w-1 h-1 bg-emerald-500"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-emerald-500"></div>
                  </>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex flex-col items-start animate-pulse">
              <div className="flex items-center gap-2 mb-1 text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                <Loader2 size={10} className="animate-spin" />
                <span>Decrypting_Response...</span>
              </div>
              <div className="bg-black border border-emerald-900/50 px-4 py-2 text-emerald-700 text-xs italic">
                {">"} Intercepting data packets...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Input Area */}
        <div className="p-4 bg-emerald-950/10 border-t border-emerald-900/50">
          <div className="relative max-w-4xl mx-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-4 border border-emerald-900/50 bg-black text-emerald-500 font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="animate-pulse">_</span>
              {">"}
            </div>
            <input
              type="text"
              placeholder="Enter command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-black border border-emerald-900/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none px-4 py-4 text-emerald-400 placeholder:text-emerald-900 transition-all uppercase text-sm"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="p-4 bg-emerald-900/20 border border-emerald-800 hover:bg-emerald-500 hover:text-black disabled:opacity-30 disabled:hover:bg-emerald-900/20 disabled:hover:text-emerald-500 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-2 flex justify-between items-center text-[8px] uppercase tracking-[0.2em] text-emerald-900 font-bold px-2">
            <span>Security_Level: Omega</span>
            <div className="flex gap-2 items-center">
              <ShieldAlert size={8} />
              <span>Firewall: Active</span>
            </div>
            <span>© 2026 KRISH_SYSTEMS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
