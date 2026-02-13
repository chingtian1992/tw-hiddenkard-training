import React, { useState, useEffect } from 'react';

interface MessageEntry {
  id: string;
  name: string;
  text: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  colorTheme: 'white' | 'dark';
  isLocal?: boolean; // 標記是否為該使用者本次發送的留言
}

interface MessageWallProps {
  onSent: () => void;
}

const MessageWall: React.FC<MessageWallProps> = ({ onSent }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  
  // 模擬數據
  const initialSimulation: MessageEntry[] = [
    { id: '2', name: 'Hidden_Taiwan', text: 'KARD Forever! Waiting for the tour!', rotation: -5, offsetX: -10, offsetY: 0, colorTheme: 'white' },
    { id: '3', name: 'Ace_J', text: 'J.seph 的 Rap 真的太帥了！', rotation: 8, offsetX: 15, offsetY: 5, colorTheme: 'white' },
    { id: '4', name: 'Training_hidden', text: 'Welcome to the Training Camp, Hidden KARD!', rotation: -2, offsetX: 0, offsetY: 10, colorTheme: 'dark' },
    { id: '5', name: 'BM_Stans', text: 'Big Matthew check in! 🔥 Keep the fire burning!', rotation: -12, offsetX: -20, offsetY: -10, colorTheme: 'white' },
    { id: '6', name: 'Somin_Love', text: '全能女神 Somin 加油！！', rotation: 6, offsetX: 5, offsetY: -5, colorTheme: 'white' },
    { id: '7', name: 'Jiwoo_Queen', text: 'Jiwoo 的音色真的沒人能代替 ❤️', rotation: -4, offsetX: 12, offsetY: 8, colorTheme: 'white' },
    { id: '8', name: 'Carrie Luk', text: '謝謝你們一直堅持，沒有放棄！', rotation: -11, offsetX: -18, offsetY: -12, colorTheme: 'white' },
  ];

  const [history, setHistory] = useState<MessageEntry[]>(initialSimulation);

  // 初始化讀取 LocalStorage 中的個人留言
  useEffect(() => {
    const saved = localStorage.getItem('kard_user_messages');
    if (saved) {
      const userMsgs = JSON.parse(saved);
      // 將本地留言放在最前面（最新）
      setHistory(prev => [...userMsgs, ...prev]);
    }
  }, []);

  const createCard = (name: string, text: string): MessageEntry => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    text,
    rotation: Math.floor(Math.random() * 24) - 12,
    offsetX: Math.floor(Math.random() * 50) - 25,
    offsetY: Math.floor(Math.random() * 30) - 15,
    colorTheme: Math.random() > 0.9 ? 'dark' : 'white',
    isLocal: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !userName.trim()) return;

    const currentMsg = message;
    const currentName = userName;

    setIsFlying(true);
    
    setTimeout(() => {
      const newCard = createCard(currentName, currentMsg);
      
      // 更新狀態：新留言放在陣列最前方
      const updatedHistory = [newCard, ...history];
      setHistory(updatedHistory);
      
      // 僅將標記為 isLocal 的留言存入本地
      const localOnly = updatedHistory.filter(h => h.isLocal);
      localStorage.setItem('kard_user_messages', JSON.stringify(localOnly));

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
      
      {/* 留言輸入區 */}
      <div className="relative mb-8 z-[100]">
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
              className="w-full bg-transparent border-b-2 border-gray-100 text-gray-800 p-2 text-sm font-bold outline-none focus:border-[#ff0033] transition-colors text-center"
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
              {isFlying ? 'SHUFFLING...' : '發牌應援'}
            </button>
          </div>
        </form>

        {/* 發牌動畫 */}
        {isFlying && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-40 bg-white rounded-xl shadow-2xl border-4 border-gray-50 flex items-center justify-center animate-cardDeal z-[200]">
             <div className="flex flex-col items-center">
               <span className="text-[#ff0033] text-3xl font-black font-cinzel">H</span>
               <span className="text-[#ff0033] text-lg">♥</span>
             </div>
          </div>
        )}
      </div>

      {/* 牌堆視覺區 (Card Sea) */}
      <div className="relative w-full h-[500px] mt-4 overflow-hidden rounded-t-[3rem] bg-gradient-to-b from-[#111] to-[#0a0a0a] border-t border-white/5 shadow-inner">
        <div className="absolute inset-0 flex flex-wrap justify-center items-start gap-1 p-8 overflow-y-auto pb-48 pt-12 custom-scrollbar">
          {history.map((h, i) => (
            <div 
              key={h.id} 
              className={`relative w-36 sm:w-44 p-4 rounded-xl shadow-2xl border-2 transition-all duration-700 animate-cardLand
                ${h.colorTheme === 'dark' 
                  ? 'bg-[#1a1a1a] border-[#d4af37] text-white' 
                  : 'bg-white border-gray-200 text-gray-800'
                }
                ${h.isLocal ? 'ring-2 ring-[#ff0033]/50' : ''}`}
              style={{ 
                transform: `rotate(${h.rotation}deg) translate(${h.offsetX}px, ${h.offsetY}px)`,
                marginTop: i > 0 ? '-60px' : '0',
                // 核心改動：最新的留言 z-index 越高。i=0 是最新，故 zIndex 設為 (總數 - 0)
                zIndex: (history.length - i) + (h.isLocal ? 100 : 0)
              }}
            >
              {h.isLocal && (
                <div className="absolute -top-2 -right-2 bg-[#ff0033] text-white text-[7px] font-black px-1.5 py-0.5 rounded-md z-[110] shadow-md">
                  YOURS
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col items-center">
                  <span className={`text-[10px] font-black leading-none ${h.colorTheme === 'dark' ? 'text-[#d4af37]' : 'text-red-500'}`}>H</span>
                  <span className={`text-[8px] ${h.colorTheme === 'dark' ? 'text-[#d4af37]' : 'text-red-500'}`}>♥</span>
                </div>
                {/* 改動：移除 truncate 與 max-w，確保暱稱完整顯示 */}
                <span className={`text-[9px] font-bold break-words leading-tight flex-1 px-1 text-right ${h.colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                  @{h.name}
                </span>
              </div>
              
              <p className="text-[11px] leading-relaxed font-medium mb-2 min-h-[40px] italic">
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
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#111] to-transparent pointer-events-none z-[150]"></div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-[150] flex items-end justify-center pb-6">
          <p className="text-[8px] text-gray-700 font-bold uppercase tracking-[0.5em] animate-pulse italic">The Sea of Hidden Cards</p>
        </div>
      </div>

         {/* 邀請分享文字 */}
        <div className="mt-6 text-center animate-fadeIn px-6">
          <p className="text-gray-500 text-[10px] leading-relaxed font-medium">
            💡 <span className="text-white">隱藏小任務：</span><br/>
            發牌成功後，歡迎<span className="text-[#d4af37]">截圖留言畫面</span>並分享至限動，<br/>
            標記 <span className="text-[#ff0033] font-bold">@chingtian1992_kard</span> ，<br/>
            讓更多人看見！也將有機會收錄進官方收藏卡堆喔！
          </p>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MessageWall;
