
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface MessageWallProps {
  onSent: () => void;
}

const MessageWall: React.FC<MessageWallProps> = ({ onSent }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  const [history, setHistory] = useState<{name: string, text: string}[]>([]);

  // Fix: Integrated Gemini API to provide character-accurate responses from the "Hidden Card" Joker
  const getJokerReply = async (fanMsg: string, fanName: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are "The Joker" (the mysterious 5th member/Hidden Card) of the K-pop group KARD. 
        A fan named ${fanName} just left this message on the Hidden Wall: "${fanMsg}". 
        Write a short (under 40 words), cool, charismatic, and encouraging response. 
        Refer to the fan as a 'Hidden KARD' and keep the vibe mysterious and legendary.`,
      });
      return response.text;
    } catch (error) {
      console.error("AI interaction failed:", error);
      return "The Joker has seen your message. Keep the fire burning, Hidden KARD.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !userName.trim()) return;

    const currentMsg = message;
    const currentName = userName;

    setIsFlying(true);
    
    // Animate and update wall
    setTimeout(async () => {
      setHistory(prev => [{ name: currentName, text: currentMsg }, ...prev.slice(0, 9)]);
      setMessage('');
      setIsFlying(false);
      onSent();

      // Trigger AI interaction
      const reply = await getJokerReply(currentMsg, currentName);
      if (reply) {
        setHistory(prev => [{ name: 'The Joker 🃏', text: reply }, ...prev.slice(0, 9)]);
      }
    }, 1000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-cinzel text-[#d4af37] text-center mb-6">Hidden's 精神喊話</h2>
      
      <div className="relative mb-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 shadow-2xl border-4 border-gray-200 w-full max-w-sm mx-auto relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[#ff0033] font-cinzel text-xl font-bold">J</span>
            <span className="text-[#ff0033] font-cinzel text-xl font-bold rotate-180">J</span>
          </div>
          
          <input
            type="text"
            placeholder="你的暱稱"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-gray-50 border-b border-gray-300 text-gray-800 p-2 mb-4 outline-none focus:border-[#ff0033]"
          />
          <textarea
            rows={4}
            placeholder="寫下給 KARD 的應援話語..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 resize-none outline-none focus:border-[#ff0033]"
          />
          
          <button 
            type="submit"
            disabled={isFlying}
            className="w-full mt-4 bg-[#ff0033] text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            {isFlying ? '傳遞中...' : '扔入牌堆'}
          </button>
        </form>

        {isFlying && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 bg-white rounded-xl shadow-2xl border-2 border-gray-100 flex items-center justify-center animate-[fly_1s_ease-in-out_forwards] z-20">
             <span className="text-2xl">🃏</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fly {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(200%, -500%) scale(0.2) rotate(720deg); opacity: 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="space-y-4">
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest border-b border-gray-800 pb-2">牌堆動態</h3>
        {history.length === 0 && <p className="text-gray-600 text-center italic">還沒有人發牌，成為第一個吧！</p>}
        {history.map((h, i) => (
          <div key={i} className={`p-3 rounded-lg border-l-4 animate-fadeIn ${
            h.name.includes('Joker') ? 'bg-[#1a1a1a] border-[#ff0033] shadow-[0_0_15px_rgba(255,0,51,0.2)]' : 'bg-[#111111] border-[#d4af37]'
          }`}>
            <p className={`text-xs font-bold mb-1 ${h.name.includes('Joker') ? 'text-[#ff0033]' : 'text-[#d4af37]'}`}>{h.name}</p>
            <p className="text-gray-300 text-sm">{h.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageWall;
