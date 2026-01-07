
import React, { useState } from 'react';

interface MessageEntry {
  id: string;
  name: string;
  text: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  colorTheme: 'white' | 'dark';
}

interface MessageWallProps {
  onSent: () => void;
}

const MessageWall: React.FC<MessageWallProps> = ({ onSent }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  
  // 初始模擬數據，營造「全球 Hidden KARD 應援中」的集訓氛圍
  const [history, setHistory] = useState<MessageEntry[]>([
    { id: '1', name: 'Hidden_Taiwan', text: 'KARD Forever! Waiting for the tour!', rotation: -5, offsetX: -10, offsetY: 0, colorTheme: 'white' },
    { id: '2', name: 'Ace_J', text: 'J.Seph 的 Rap 真的太帥了！', rotation: 8, offsetX: 15, offsetY: 5, colorTheme: 'white' },
    { id: '3', name: 'Training_hidden', text: 'Welcome to the Training Camp, Hidden KARD!', rotation: -2, offsetX: 0, offsetY: 10, colorTheme: 'dark' },
    { id: '4', name: 'BM_Stans', text: 'Big Matthew check in! 🔥 Keep the fire burning!', rotation: -12, offsetX: -20, offsetY: -10, colorTheme: 'white' },
    { id: '5', name: 'Somin_Love', text: '全能女神 Somin 加油！！', rotation: 6, offsetX: 5, offsetY: -5, colorTheme: 'white' },
    { id: '6', name: 'Jiwoo_Queen', text: 'Jiwoo 的音色真的沒人能代替 ❤️', rotation: -4, offsetX: 12, offsetY: 8, colorTheme: 'white' },
  ]);

  const createCard = (name: string, text: string): MessageEntry => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    text,
    rotation: Math.floor(Math.random() * 24) - 12, // 隨機旋轉 -12 ~ 12 度
    offsetX: Math.floor(Math.random() * 50) - 25, // 隨機水平位移
    offsetY: Math.floor(Math.random() * 30) - 15, // 隨機垂直位移
    colorTheme: Math.random() > 0.9 ? 'dark' : 'white', // 極低機率抽中黑卡
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !userName.trim()) return;

    const currentMsg = message;
    const currentName = userName;

    setIsFlying(true);
    
    // 模擬發牌動畫落地的時間感
    setTimeout(() => {
      const newCard = createCard(currentName, currentMsg);
      // 將新卡片放在陣列最前面，使其在畫面上疊在上方
      setHistory(prev => [newCard, ...prev]);
      setMessage('');
      setIsFlying(false);
      onSent();
    }, 800);
  };

  return (
    <div className="p-4 min-h-screen bg-[#0a0a0a]">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-cinzel text-[#d4af37] mb-2 tracking-tight">Hidden's 告白</h2>
        <div className="inline-block px-3 py-1 bg-[#ff0033]/10 border border-[#ff0033]/30 rounded-full">
          <p className="text-[#ff0033] text-[9px] font-black uppercase tracking-[0.2em]">Message Wall</p>
        </div>
      </div>
      
      {/* 留言輸入區 - 空白撲克牌設計 */}
      <div className="relative mb-20 z-30">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-4 border-gray-100 w-full max-w-xs mx-auto transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col items-center">
              <span className="text-[#ff0033] font-cinzel text-xl font-black leading-none">H</span>
              <span className="text-[#ff0033] text-sm">♥</span>
            </div>
            <span className="text-gray-300 font-cinzel text-[10px] tracking-widest mt-1">HIDDEN CARD</span>
            <div className="flex flex-col items-center rotate-180">
              <span className="text-[#ff0033] font-cinzel text-xl font-black leading-none">H</span>
              <span className="text-[#ff0033] text-sm">♥</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="YOUR NAME"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-100 text-gray-800 p-2 text-sm font-bold outline-none focus:border-[#ff0033] transition-colors"
            />
            <textarea
              rows={3}
              placeholder="寫下給 KARD 的應援..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-gray-800 text-sm resize-none outline-none focus:border-[#ff0033] transition-all"
            />
            
            <button 
              type="submit"
              disabled={isFlying}
              className="w-full bg-[#ff0033] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-900/20"
            >
              {isFlying ? 'SHUFFLING...' : 'DEAL YOUR MESSAGE'}
            </button>
          </div>
        </form>

        {/* 發牌動畫 */}
        {isFlying && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-40 bg-white rounded-xl shadow-2xl border-4 border-gray-50 flex items-center justify-center animate-cardDeal z-50">
             <div className="flex flex-col items-center">
               <span className="text-[#ff0033] text-3xl font-black font-cinzel">H</span>
               <span className="text-[#ff0033] text-lg">♥</span>
             </div>
          </div>
        )}
      </div>

      {/* 牌堆視覺區 (Card Sea) */}
      <div className="relative w-full h-[600px] mt-10 overflow-hidden rounded-t-[3rem] bg-gradient-to-b from-[#111] to-[#0a0a0a] border-t border-white/5">
        <div className="absolute inset-0 flex flex-wrap justify-center items-start gap-1 p-8 overflow-y-auto pb-48 pt-12 custom-scrollbar">
          {history.map((h, i) => (
            <div 
              key={h.id} 
              className={`relative w-36 sm:w-44 p-4 rounded-xl shadow-2xl border-2 transition-all duration-700 animate-cardLand
                ${h.colorTheme === 'dark' 
                  ? 'bg-[#1a1a1a] border-[#d4af37] text-white z-20' 
                  : 'bg-white border-gray-200 text-gray-800 z-10'
                }`}
              style={{ 
                transform: `rotate(${h.rotation}deg) translate(${h.offsetX}px, ${h.offsetY}px)`,
                marginTop: i > 0 ? '-60px' : '0' 
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col items-center">
                  <span className={`text-[10px] font-black leading-none ${h.colorTheme === 'dark' ? 'text-[#d4af37]' : 'text-red-500'}`}>H</span>
                  <span className={`text-[8px] ${h.colorTheme === 'dark' ? 'text-[#d4af37]' : 'text-red-500'}`}>♥</span>
                </div>
                <span className={`text-[9px] font-bold truncate max-w-[70px] ${h.colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                  @{h.name}
                </span>
              </div>
              
              <p className="text-[11px] leading-relaxed font-medium mb-2 min-h-[40px] line-clamp-4 italic">
                "{h.text}"
              </p>
              
              <div className="flex justify-between items-end rotate-180">
                <div className="flex flex-col items-center">
                  <span className={`text-[10px] font-black leading-none ${h.colorTheme === 'dark' ? 'text-[#d4af37]' : 'text-red-500'}`}>H</span>
                  <span className={`text-[8px] ${h.colorTheme === 'dark' ? 'text-[#d4af37]' : 'text-red-500'}`}>♥</span>
                </div>
                <span className="text-[7px] text-gray-300 font-cinzel">KARD</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* 裝飾性遮罩 */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#111] to-transparent pointer-events-none z-30"></div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-30 flex items-end justify-center pb-10">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em] animate-pulse">Hidden CARD Pile</p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        @keyframes cardDeal {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; filter: blur(0); }
          40% { transform: translate(-50%, -120%) scale(1.1) rotate(15deg); opacity: 1; filter: blur(1px); }
          100% { transform: translate(180%, -450%) scale(0.4) rotate(1080deg); opacity: 0; filter: blur(4px); }
        }
        @keyframes cardLand {
          from { opacity: 0; transform: scale(1.6) translateY(-100px) rotate(45deg); filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        .animate-cardDeal {
          animation: cardDeal 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
        }
        .animate-cardLand {
          animation: cardLand 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default MessageWall;
