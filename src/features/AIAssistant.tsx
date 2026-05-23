import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Sparkles, ShieldAlert, Navigation, Search } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AIAssistant() {
  const { isDarkMode } = useSystemStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello! I am GRID SAFE's tactical AI Assistant. I can analyze risk zones, deploy drones, pull CCTV feeds, or answer questions about your urban security environment. How can I assist you today?",
      timestamp: new Date(),
      suggestions: ['Check Sector 4 safety', 'Deploy escort drone', 'Where is the nearest safe zone?']
    }
  ]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userText: string) => {
    const text = userText.toLowerCase();
    let response = "I've analyzed the grid and logged your request. Our operators will monitor the situation.";
    let suggestions: string[] | undefined = undefined;

    if (text.includes('sector 4') || text.includes('safe')) {
      response = "Sector 4 currently has a 'Moderate' risk rating due to a 40% reduction in street lighting. I recommend taking Route B via the Financial District. Would you like me to map this safe route for you?";
      suggestions = ['Yes, map the route', 'Show me CCTV of Sector 4'];
    } else if (text.includes('drone') || text.includes('escort')) {
      response = "Initiating Drone Protocol. Aerial Drone 07 has been dispatched to your location. ETA is 2 minutes and 14 seconds. Stay visible in open areas until it arrives.";
      suggestions = ['Track Drone 07', 'Cancel dispatch'];
    } else if (text.includes('police') || text.includes('emergency')) {
      response = "EMERGENCY RECOGNIZED. Shall I trigger the silent alarm and immediately transmit your real-time coordinates to the nearest patrol unit?";
      suggestions = ['YES, TRIGGER ALARM', 'No, False Alarm'];
    } else if (text.includes('hello') || text.includes('hi')) {
      response = "Greetings. I am actively monitoring 1,420 grid sectors. All primary systems are nominal. What do you need?";
    } else {
      response = `Searching the GridSafe database for "${userText}"... Based on current real-time data, I've found 3 related incident reports in the past 24 hours. Would you like a detailed breakdown?`;
      suggestions = ['Show breakdown', 'Ignore'];
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        text: response,
        timestamp: new Date(),
        suggestions
      }]);
    }, 1500 + Math.random() * 1000); // Realistic typing delay
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    }]);
    
    setInput('');
    setIsTyping(true);
    generateAIResponse(text);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-hidden pb-10"
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Bot className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">Grid AI Navigator</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">System Online</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-blue-500 transition-colors">
             <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={msg.id} 
              className={cn(
                "flex max-w-[85%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded shrink-0 flex items-center justify-center mt-1 border",
                msg.sender === 'user' 
                  ? "ml-3 bg-gs-maroon/20 dark:bg-white/20 border-gs-maroon/30 dark:border-white/30" 
                  : "mr-3 bg-blue-500/20 border-blue-500/30"
              )}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-500" />}
              </div>
              
              <div className="flex flex-col gap-2">
                <div className={cn(
                  "p-4 rounded-xl shadow-sm text-sm",
                  msg.sender === 'user' 
                    ? "bg-gs-maroon dark:bg-white text-white dark:text-black rounded-tr-sm" 
                    : "bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-tl-sm"
                )}>
                  {msg.text}
                </div>
                
                {msg.suggestions && msg.sender === 'ai' && !isTyping && msg.id === messages[messages.length - 1].id && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.suggestions.map((sug, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-500 rounded-full font-mono text-[10px] tracking-wide transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" /> {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
             <div className="flex max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center mt-1 border mr-3 bg-blue-500/20 border-blue-500/30">
                  <Bot className="w-4 h-4 text-blue-500" />
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-tl-sm flex items-center gap-1">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-3 relative"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI Assistant..."
              className="flex-1 bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3">
             <span className="font-mono text-[8px] uppercase tracking-widest opacity-40">AI-generated tactical advice may require human verification.</span>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
