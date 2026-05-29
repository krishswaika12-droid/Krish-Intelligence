// App.jsx
import { useState, useEffect, useRef } from "react";
import { Send, Terminal, User, Loader2, Zap, Trash2, Cpu, ShieldAlert, Activity } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
console.log(import.meta.env.VITE_GEMINI_API_KEY)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const Typewriter = ({ text, delay = 20 }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

export default function App() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hackerMode, setHackerMode] = useState(true);
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        text: hackerMode
          ? "SYSTEM INITIALIZED... KrishBot v4.0.0 Online. Authorized access granted. What is your command?"
          : "Welcome back! I'm Krish Intelligence, your dedicated AI companion. How can I assist you in achieving your goals today?",
      },
    ]);
  }, [hackerMode]);

  const [status, setStatus] = useState({ cpu: 14, latency: 12 });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus({
        cpu: Math.floor(Math.random() * 20) + 5,
        latency: Math.floor(Math.random() * 30) + 5,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        systemInstruction: hackerMode
  ? "You are KrishBot, a highly advanced but incredibly glitchy and eccentric hacker AI. You speak in technical jargon and hilariously answer in funny way. You are enthusiastic, use hacky metaphors, and occasionally pretend to bypass firewalls for simple tasks. Keep your answers brief and wonderfully weird."
  : "You are a smart, friendly, and helpful AI assistant. Give clear, professional, and concise answers.",
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
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      text: hackerMode 
        ? "WIPING LOGS... Memory cache cleared. Systems ready." 
        : "Conversation history has been reset. Ready for a fresh start!",
    }]);
  };

  const matrixChars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()_+-=[]{}|;:,.<>?/";

  return (
    <div
  className={`relative min-h-screen flex items-center justify-center p-0 sm:p-4 overflow-hidden font-mono transition-all duration-700
  ${
    hackerMode
      ? "hacker-mode bg-black text-emerald-500 selection:bg-emerald-900 selection:text-emerald-100"
      : "normal-mode bg-slate-50 text-slate-800"
  }`}
>
      
      {/* Background Elements for Normal Mode */}
      {!hackerMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob top-[-10%] left-[-10%] bg-indigo-200/40"></div>
          <div className="blob bottom-[-10%] right-[-10%] bg-cyan-200/40" style={{ animationDelay: '-5s' }}></div>
          <div className="blob top-[20%] right-[10%] w-[300px] h-[300px] bg-purple-200/30" style={{ animationDelay: '-10s' }}></div>
        </div>
      )}
      {hackerMode && (
<div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,1)0%,rgba(0,0,0,0)100%)] z-10"></div>
        <div className="flex justify-around text-[10px] animate-matrix">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1" style={{ 
              animationDelay: `${Math.random() * 10}s`, 
              animationDuration: `${10 + Math.random() * 15}s`,
              opacity: 0.2 + Math.random() * 0.8
            }}>
              {Array.from({ length: 50 }).map((_, j) => (
                <span key={j} className={Math.random() > 0.9 ? "text-emerald-200" : "text-emerald-800"}>
                  {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>)}

      {hackerMode && (
        <>
          <div className="crt-overlay"></div>
          <div className="scanline"></div>
        </>
      )}

      <div
  className={`w-full max-w-5xl h-screen sm:h-[90vh] flex flex-col relative z-20 overflow-hidden transition-all duration-700
  ${
    hackerMode
      ? "border-none sm:border border-emerald-900/50 bg-black/90 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.15)]"
      : "glass-card rounded-none sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
  }`}
>
        
        {/* Tactical Header */}
   <div
  className={`flex items-center justify-between px-4 py-3 border-b transition-all duration-700
  ${
    hackerMode
      ? "border-emerald-900/50 bg-emerald-950/30"
      : "border-slate-100 bg-white/40 backdrop-blur-md"
  }`}
>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`p-2 border rounded-sm transition-all duration-500 ${
                hackerMode 
                  ? "bg-emerald-900/40 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                  : "bg-indigo-50 border-indigo-200 shadow-sm"
              }`}>
                <Terminal size={20} className={hackerMode ? "text-emerald-400" : "text-indigo-600"} />
              </div>
              <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse ${
                hackerMode ? "bg-emerald-500 shadow-[0_0_5px_#10b981]" : "bg-indigo-500 shadow-[0_0_5px_rgba(79,70,229,0.5)]"
              }`}></div>
            </div>
            <div>
              <h1 className={`text-lg font-bold transition-all duration-500 ${
                hackerMode ? "text-emerald-400 terminal-glow glitch-text tracking-[0.2em]" : "text-slate-900 tracking-tight"
              }`} data-text={hackerMode ? "KRISH_BOT" : "Krish Intelligence"}>
                {hackerMode ? "KRISH_BOT" : "Krish Intelligence"} 
                {!hackerMode && <span className="ml-2 px-1.5 py-0.5 bg-indigo-100 text-indigo-600 text-[9px] rounded-md font-black uppercase tracking-widest">Pro</span>}
                {hackerMode && <span className="text-[10px] opacity-60 ml-2">v4.0_STABLE</span>}
              </h1>
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-tighter opacity-70">
                <Activity size={10} className={hackerMode ? "text-emerald-500" : "text-indigo-500"} />
                <span>{hackerMode ? "Encryption: AES-256" : "Connection: Secure"}</span>
                <span className={hackerMode ? "text-emerald-800" : "text-slate-300"}>|</span>
                <span>Response Time: {status.latency}ms</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
  onClick={() => setHackerMode(!hackerMode)}
  className={`px-2 sm:px-4 py-2 border text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all duration-500 rounded-lg cursor-pointer shimmer-btn
  ${
    hackerMode
      ? "border-emerald-500 text-emerald-400 bg-emerald-900/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-500 hover:text-black"
      : "border-indigo-600 text-indigo-600 bg-indigo-50 shadow-sm hover:bg-indigo-600 hover:text-white"
  }`}
>
  <span className="sm:hidden">{hackerMode ? "RESTORE" : "HACK"}</span>
  <span className="hidden sm:inline">{hackerMode ? ">> RESTORE_NORMAL_MODE" : ">> INITIATE_HACKER_MODE"}</span>
</button>
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-3 h-1 rounded-full animate-pulse ${
                    hackerMode 
                      ? (i < 3 ? 'bg-emerald-500' : 'bg-emerald-900') 
                      : (i < 4 ? 'bg-indigo-500' : 'bg-slate-200')
                  }`}></div>
                ))}
              </div>
              <span className={`text-[8px] ${hackerMode ? "text-emerald-700" : "text-slate-400"}`}>SIGNAL_STRENGTH</span>
            </div>
            <button 
              onClick={clearChat}
              className={`p-2 border transition-all group relative overflow-hidden ${
                hackerMode 
                  ? "border-emerald-900/50 hover:bg-emerald-900/40 hover:border-emerald-500/50" 
                  : "border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 rounded-lg"
              }`}
              title="PURGE_LOGS"
            >
              <Trash2 size={16} className={`transition-colors relative z-10 ${
                hackerMode ? "group-hover:text-red-400" : "text-slate-400 group-hover:text-red-500"
              }`} />
              {hackerMode && <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>}
            </button>
            <div className={`hidden md:flex items-center gap-3 px-3 py-1.5 border text-[10px] ${
              hackerMode 
                ? "border-emerald-900/50 bg-black/60 text-emerald-700" 
                : "border-slate-200 bg-white/50 text-slate-500 rounded-lg"
            }`}>
              <Cpu size={12} className={hackerMode ? "text-emerald-500" : "text-indigo-500"} />
              <span>CPU_LOAD: {status.cpu}%</span>
            </div>
          </div>
        </div>

        {/* Console Area */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 custom-scrollbar relative transition-colors duration-700 ${
          hackerMode ? "bg-transparent" : "bg-slate-50/30"
        }`}>
          {/* Subtle Grid Pattern Overlay */}
         {hackerMode && (
  <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
)}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-6 duration-700`}
            >
              <div className={`flex items-center gap-2 mb-2 text-[10px] uppercase font-black tracking-[0.2em] ${
                msg.role === "user" 
                  ? (hackerMode ? "text-emerald-700" : "text-slate-300") 
                  : (hackerMode ? "text-emerald-400 terminal-glow" : "text-indigo-500")
              }`}>
                {msg.role === "assistant" ? (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${hackerMode ? "" : "bg-indigo-100"}`}>
                    <Zap size={10} className={hackerMode ? "animate-pulse" : "text-indigo-600"} />
                  </div>
                ) : (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${hackerMode ? "" : "bg-slate-100"}`}>
                    <User size={10} className={hackerMode ? "" : "text-slate-600"} />
                  </div>
                )}
                {msg.role === "assistant" ? (hackerMode ? "KrishBot" : "Intelligence") : (hackerMode ? "Guest" : "You")}
              </div>
              
              <div
  className={`max-w-[95%] sm:max-w-[75%] px-4 sm:px-6 py-3 sm:py-4 relative group transition-all duration-500 ${
    msg.role === "user"
      ? hackerMode
        ? "bg-emerald-950/20 border border-emerald-800 text-emerald-100 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"
        : "bg-indigo-600 text-white border-0 rounded-3xl rounded-tr-none shadow-xl shadow-indigo-200"
      : hackerMode
      ? "bg-black/80 border border-emerald-900/50 text-emerald-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      : "bg-white text-slate-700 border border-white shadow-sm rounded-3xl rounded-tl-none ring-1 ring-slate-100"
  }`}
>
                {/* Corner Accents for Hacky Look */}
                {msg.role === "assistant" && hackerMode && (
                  <>
                    <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-emerald-500 group-hover:w-4 group-hover:h-4 transition-all"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-emerald-500 group-hover:w-4 group-hover:h-4 transition-all"></div>
                  </>
                )}
                <div className={`whitespace-pre-wrap leading-relaxed relative z-10 text-sm sm:text-base ${hackerMode ? "" : "font-sans font-medium"}`}>
                  {msg.role === "assistant" && index === messages.length - 1 ? (
                    <Typewriter text={msg.text} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex flex-col items-start space-y-3">
              <div className={`flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] ${
                hackerMode ? "text-emerald-400 terminal-glow" : "text-slate-300"
              }`}>
                <Loader2 size={12} className="animate-spin" />
                <span>{hackerMode ? "Intercepting_Neural_Frequencies..." : "Processing response..."}</span>
              </div>
              {hackerMode && (
                <div className="bg-black/40 border border-emerald-900/30 px-4 py-2 text-emerald-700 text-[10px] italic flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  {">"} BYPASSING FIREWALL... [DONE]
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Input Area */}
        <div className={`p-3 sm:p-6 border-t transition-all duration-700 ${
          hackerMode 
            ? "bg-emerald-950/20 border-emerald-900/50 backdrop-blur-md" 
            : "bg-white/60 border-white/40 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.03)]"
        }`}>
          <div className="relative max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
            {hackerMode && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-4 border border-emerald-900/50 bg-black text-emerald-500 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.15)] group transition-all hover:border-emerald-500/50">
                <span className="animate-pulse">_</span>
                <span className="group-hover:text-emerald-300 transition-colors">{">"}</span>
              </div>
            )}
            <label
  className={`cursor-pointer px-3 sm:px-4 py-3 sm:py-4 border transition-all duration-300 text-sm
  ${
    hackerMode
      ? "border-emerald-900/50 bg-black/60 text-emerald-400 hover:border-emerald-500/50"
      : "border-slate-300 bg-white/80 text-slate-700 rounded-2xl hover:border-cyan-400 shadow-md"
  }`}
>
  📁

  <input
    type="file"
    className="hidden"
    onChange={handleFileChange}
  />
</label>
            <input
              type="text"
              placeholder={hackerMode ? "ENTER_COMMAND_HERE..." : "Describe what you need help with..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 outline-none px-4 sm:px-6 py-3 sm:py-4 transition-all duration-500 text-sm
${
  hackerMode
    ? "bg-black/60 border border-emerald-900/50 text-emerald-400 placeholder:text-emerald-900/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 uppercase tracking-widest"
    : "bg-white border border-slate-100 text-slate-700 placeholder:text-slate-300 rounded-2xl focus:border-indigo-400 focus:ring-8 focus:ring-indigo-500/5 font-sans"
}`}                                     
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`group relative p-3 sm:p-4 transition-all active:scale-95 disabled:opacity-30 overflow-hidden ${
                hackerMode 
                  ? "bg-emerald-900/20 border border-emerald-800 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                  : "bg-indigo-600 border-0 text-white rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5"
              }`}
            >
              {hackerMode && <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>}
              <Send size={24} className={`relative z-10 transition-colors ${
                hackerMode ? "group-hover:text-black" : "text-white"
              }`} />
            </button>
          </div>
          
          <div className={`mt-4 sm:mt-6 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-black px-2 ${
            hackerMode ? "border-emerald-900/30 text-emerald-900/60" : "border-slate-100 text-slate-400"
          }`}>

            {/* System Metrics */}
            <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${hackerMode ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-green-500 shadow-[0_0_8px_#22c55e]"}`}></div>
                <span>{hackerMode ? "SYSTEM_STATUS: OPERATIONAL" : "Core Services: Active"}</span>
              </div>
              
              <span className="opacity-20 hidden sm:inline">|</span>

              <div className="flex items-center gap-2">
                <Activity size={10} className={hackerMode ? "text-emerald-500" : "text-indigo-500"} />
                <span>LATENCY: {status.latency}MS</span>
              </div>
              
              <span className="opacity-20 hidden sm:inline">|</span>

              <div className="flex items-center gap-2">
                <ShieldAlert size={10} className={hackerMode ? "text-emerald-500" : "text-amber-500"} />
                <span>{hackerMode ? "ENCRYPTION: AES_256_GCM" : "SSL Secured"}</span>
              </div>
            </div>

            {/* Developer Credits & Socials */}
            <div className={`flex items-center gap-6 px-4 py-2 rounded-full transition-all duration-500 ${
              hackerMode ? "bg-emerald-950/20 border border-emerald-900/30" : "bg-slate-50 border border-slate-100"
            }`}>
              <div className="flex items-center gap-2 mr-2">
                <span className={hackerMode ? "text-emerald-500" : "text-indigo-600"}>{hackerMode ? "BY:" : "Built by"}</span>
                <span className={hackerMode ? "text-emerald-300" : "text-slate-900"}>KRISH_SWAIKA</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/krishswaika12-droid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative transition-all duration-300 ${
                    hackerMode ? "hover:text-emerald-300" : "hover:text-indigo-600"
                  }`}
                  title="GitHub Repository"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    alt="github"
                    className={`w-4 h-4 transition-all duration-300 ${
                      hackerMode ? "invert opacity-70 group-hover:opacity-100" : "opacity-40 group-hover:opacity-100"
                    } group-hover:scale-125`}
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/krish-swaika-796709379/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative transition-all duration-300 ${
                    hackerMode ? "hover:text-emerald-300" : "hover:text-indigo-600"
                  }`}
                  title="LinkedIn Profile"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                    alt="linkedin"
                    className={`w-4 h-4 transition-all duration-300 ${
                      hackerMode ? "opacity-70 group-hover:opacity-100" : "opacity-40 group-hover:opacity-100"
                    } group-hover:scale-125`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
