
import React, { useState, useEffect } from 'react';
import { GameState, Suit } from './types';
import { MEMBER_INFO, SONGS, COLORS } from './constants';
import FanchantGame from './components/FanchantGame';
import TrainingGuide from './components/TrainingGuide';
import MessageWall from './components/MessageWall';
import RewardScreen from './components/RewardScreen';

type Tab = 'dashboard' | 'fanchant' | 'guide' | 'message' | 'reward';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  
  // 計算挑戰歌曲總數
  const challengeSongsCount = SONGS.filter(s => s.isChallenge).length;

  // 生成隨機 ID 函式
  const generateMemberId = () => {
    const randomHex = () => Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
    return `HIDDENs-2026-${randomHex()}`;
  };

  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('kard_training_state');
    const parsed = saved ? JSON.parse(saved) : null;
    
    return {
      songsCompleted: parsed?.songsCompleted || [],
      memoryBeaten: true,
      messageSent: parsed?.messageSent || false,
      userName: parsed?.userName || 'Hidden KARD',
      memberId: parsed?.memberId || generateMemberId()
    };
  });

  const [isLanding, setIsLanding] = useState(true);

  useEffect(() => {
    localStorage.setItem('kard_training_state', JSON.stringify(gameState));
  }, [gameState]);

  const handleSongComplete = (id: number) => {
    if (!gameState.songsCompleted.includes(id)) {
      setGameState(prev => ({
        ...prev,
        songsCompleted: [...prev.songsCompleted, id]
      }));
    }
  };

  const getUnlockedSuits = (): Suit[] => {
    const suits: Suit[] = [];
    const count = gameState.songsCompleted.length;
    // 根據 12 首 challenge 歌曲分配進度 (每 3 首一階)
    if (count >= 3) suits.push('spades');
    if (count >= 6) suits.push('clubs');
    if (count >= 9) suits.push('hearts');
    if (count >= 12) suits.push('diamonds');
    if (count >= challengeSongsCount && gameState.messageSent) suits.push('hidden');
    return suits;
  };

  const unlocked = getUnlockedSuits();

  if (isLanding) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center p-6 z-[100] overflow-hidden">
        <div className="absolute inset-0 gold-shimmer opacity-10"></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff0033]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 blur-[120px] rounded-full"></div>

        <div className="relative text-center animate-fadeIn flex flex-col items-center">
          <h1 className="text-7xl font-black font-cinzel text-[#ff0033] mb-2 tracking-tighter shadow-2xl drop-shadow-[0_0_15px_rgba(255,0,51,0.5)]">KARD</h1>
          <h2 className="text-[#d4af37] font-cinzel text-xl tracking-[0.4em] mb-16 uppercase font-bold">The Hidden Card</h2>
          
          <div className="flex gap-10 justify-center mb-16 relative">
            {/* "KARD" Noble Card - Member Representation (Removed 'K') */}
            <div className="w-24 h-36 bg-white rounded-2xl border-[3px] border-[#d4af37] shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.3)] -rotate-12 translate-x-4 animate-bounce flex flex-col items-center justify-center p-3 relative overflow-hidden group">
              <div className="absolute inset-0 gold-shimmer opacity-20 pointer-events-none"></div>
              
              {/* Scattered Suits Design */}
              <div className="relative w-full h-full flex items-center justify-center scale-110">
                <span className="absolute top-2 left-3 text-black text-xl rotate-[-15deg]">♠</span>
                <span className="absolute bottom-1 right-2 text-[#ff0033] text-xl rotate-[20deg]">♥</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-3xl rotate-[10deg] drop-shadow-sm">♣</span>
                <span className="absolute top-3 right-3 text-[#ff0033] text-lg rotate-[-25deg]">♦</span>
              </div>
              
              {/* Internal Ornate Edge */}
              <div className="absolute inset-1 border border-[#d4af37]/20 rounded-xl pointer-events-none"></div>
            </div>
            
            {/* "HIDDEN" Mystery Card - Fan Representation (Removed 'H') */}
            <div className="w-24 h-36 bg-white rounded-2xl border-[3px] border-[#d4af37] shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_25px_rgba(212,175,55,0.4)] rotate-12 -translate-x-4 animate-bounce [animation-delay:0.2s] flex flex-col items-center justify-center p-3 relative overflow-hidden">
              <div className="absolute inset-0 gold-shimmer opacity-30 pointer-events-none"></div>
              
              {/* Mystery Question Mark Design */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                 <div className="text-[#d4af37] text-5xl font-cinzel font-black drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] animate-pulse">?</div>
                 <div className="text-[9px] text-gray-500 font-cinzel tracking-[0.25em] mt-3 font-black">HIDDEN</div>
              </div>
              
              {/* Gold Edge Shimmer Effect */}
              <div className="absolute inset-0 border-[1px] border-white/80 rounded-xl pointer-events-none"></div>
            </div>
          </div>

          <p className="text-gray-400 mb-10 max-w-xs mx-auto text-sm leading-relaxed font-medium">
            應援大集訓：完成 {challengeSongsCount} 首歌曲挑戰，<br/>湊齊卡牌贏得專屬隱藏勳章！
          </p>
          
          <button 
            onClick={() => setIsLanding(false)}
            className="group relative px-16 py-4 bg-[#ff0033] rounded-full overflow-hidden hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,0,51,0.4)] active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative text-white font-black text-lg uppercase tracking-[0.2em]">接受挑戰</span>
          </button>
        </div>
        
        <div className="absolute bottom-8 text-[10px] text-gray-700 font-bold tracking-[0.5em] uppercase pointer-events-none">
          CHINGTIAN1992 ▲ KARDSWAGGIN
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 text-white selection:bg-[#ff0033] selection:text-white">
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#d4af37]/20 p-4 flex justify-between items-center">
        <h1 className="font-cinzel text-[#d4af37] font-black text-sm tracking-[0.3em] leading-none uppercase">Hidden Training</h1>
        <div className="flex gap-1.5">
          {['spades', 'clubs', 'hearts', 'diamonds', 'hidden'].map((s) => (
            <span key={s} className={`text-xs transition-all duration-500 ${unlocked.includes(s as Suit) ? 'text-[#d4af37] drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]' : 'text-gray-900'}`}>
              ●
            </span>
          ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="p-6">
            <section className="mb-12 text-center">
              <h2 className="text-xl font-cinzel text-[#d4af37] mb-8 uppercase tracking-[0.2em] font-black">訓練進度總覽</h2>
              <div className="flex justify-center gap-2 overflow-x-auto pb-8 no-scrollbar">
                {['spades', 'clubs', 'hearts', 'diamonds', 'hidden'].map((suit, i) => (
                  <div key={suit} className="flex flex-col items-center">
                    <div className={`w-14 h-20 rounded-xl border-2 flex items-center justify-center mb-3 transition-all duration-700 ${
                      unlocked.includes(suit as Suit) 
                      ? 'bg-white border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.3)] scale-105' 
                      : 'bg-[#111] border-gray-900 opacity-40 grayscale'
                    }`}>
                      <span className={`text-2xl ${unlocked.includes(suit as Suit) ? (i > 1 && i < 4 ? 'text-[#ff0033]' : 'text-black') : 'text-gray-800'}`}>
                        {suit === 'hidden' ? '🃏' : MEMBER_INFO[suit as Suit].symbol}
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">{MEMBER_INFO[suit as Suit].name}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-[#111] h-1.5 rounded-full mt-2 overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4af37] via-[#ff0033] to-[#d4af37] bg-[length:200%_auto] animate-shimmer transition-all duration-1000" 
                  style={{ width: `${(unlocked.length / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-600 mt-4 font-black uppercase tracking-[0.2em]">解鎖卡牌: {unlocked.length} / 5</p>
            </section>

            <section className="grid grid-cols-1 gap-4 px-2">
              <button onClick={() => setActiveTab('fanchant')} className="bg-[#111] border border-gray-800/50 p-6 rounded-[2rem] flex items-center justify-between group hover:border-[#ff0033]/50 transition-all active:scale-95 shadow-lg">
                <div className="text-left">
                  <h3 className="text-lg font-black tracking-tight mb-1 uppercase">應援挑戰</h3>
                  <p className="text-xs text-gray-500 font-medium">挑戰進度 {gameState.songsCompleted.length} / {challengeSongsCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:bg-[#ff0033] group-hover:border-transparent transition-all">
                  <span className="text-xl">🎵</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('guide')} className="bg-[#111] border border-gray-800/50 p-6 rounded-[2rem] flex items-center justify-between group hover:border-[#d4af37]/50 transition-all active:scale-95 shadow-lg">
                <div className="text-left">
                  <h3 className="text-lg font-black tracking-tight mb-1 uppercase">精選清單</h3>
                  <p className="text-xs text-gray-500 font-medium">所有主打與必看應援指南</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-transparent transition-all">
                  <span className="text-xl">📖</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('message')} className="bg-[#111] border border-gray-800/50 p-6 rounded-[2rem] flex items-center justify-between group hover:border-white/30 transition-all active:scale-95 shadow-lg">
                <div className="text-left">
                  <h3 className="text-lg font-black tracking-tight mb-1 uppercase">精神喊話</h3>
                  <p className="text-xs text-gray-500 font-medium">{gameState.messageSent ? '訊息已送往後台 ✓' : '留下給成員的留言'}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all">
                  <span className="text-xl">✍️</span>
                </div>
              </button>

              {unlocked.includes('hidden') && (
                <button onClick={() => setActiveTab('reward')} className="relative overflow-hidden bg-[#d4af37]/10 border-2 border-[#d4af37] p-6 rounded-[2rem] flex items-center justify-between group animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <div className="absolute inset-0 gold-shimmer opacity-20"></div>
                  <div className="text-left relative z-10">
                    <h3 className="text-lg font-black text-[#d4af37] tracking-tight uppercase">查看 Hidden Card</h3>
                    <p className="text-xs text-[#d4af37]/70 font-medium">領取專屬收藏號碼與好禮</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center relative z-10 shadow-lg">
                    <span className="text-xl text-black">🏆</span>
                  </div>
                </button>
              )}
            </section>
          </div>
        )}

        {activeTab === 'fanchant' && (
          <FanchantGame 
            completedSongs={gameState.songsCompleted} 
            onComplete={handleSongComplete} 
          />
        )}

        {activeTab === 'guide' && <TrainingGuide />}

        {activeTab === 'message' && (
          <MessageWall 
            onSent={() => setGameState(prev => ({ ...prev, messageSent: true }))} 
          />
        )}

        {activeTab === 'reward' && (
          <RewardScreen userName={gameState.userName} memberId={gameState.memberId} />
        )}
      </main>

      <nav className="fixed bottom-0 inset-x-0 h-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-40 px-6">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'dashboard' ? 'text-[#d4af37] scale-110' : 'text-gray-600'}`}>
          <div className="text-xl">🏠</div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">大廳</span>
        </button>
        <button onClick={() => setActiveTab('fanchant')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'fanchant' ? 'text-[#ff0033] scale-110' : 'text-gray-600'}`}>
          <div className="text-xl">🎵</div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">挑戰</span>
        </button>
        <button onClick={() => setActiveTab('guide')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'guide' ? 'text-white scale-110' : 'text-gray-600'}`}>
          <div className="text-xl">📖</div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">攻略</span>
        </button>
        <button onClick={() => setActiveTab('message')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'message' ? 'text-blue-500 scale-110' : 'text-gray-600'}`}>
          <div className="text-xl">✍️</div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">留言</span>
        </button>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
          background-size: 200% 100%;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
