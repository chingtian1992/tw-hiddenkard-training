
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
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('kard_training_state');
    return saved ? JSON.parse(saved) : {
      songsCompleted: [],
      memoryBeaten: true, // Memory game removed, auto-complete
      messageSent: false,
      userName: 'Hidden KARD'
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
    // 3 songs per member card
    if (count >= 3) suits.push('spades');
    if (count >= 6) suits.push('clubs');
    if (count >= 9) suits.push('hearts');
    if (count >= 12) suits.push('diamonds');
    if (count >= 12 && gameState.messageSent) suits.push('hidden');
    return suits;
  };

  const unlocked = getUnlockedSuits();

  if (isLanding) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center p-6 z-[100] overflow-hidden">
        <div className="absolute inset-0 gold-shimmer opacity-10"></div>
        <div className="relative text-center animate-fadeIn">
          <h1 className="text-6xl font-black font-cinzel text-[#ff0033] mb-2 tracking-tighter">KARD</h1>
          <h2 className="text-[#d4af37] font-cinzel text-xl tracking-[0.3em] mb-12 uppercase">The Hidden Card</h2>
          <div className="flex gap-4 justify-center mb-16">
            <div className="w-12 h-20 bg-white rounded border border-gray-300 shadow-xl -rotate-12 translate-x-4 animate-bounce"></div>
            <div className="w-12 h-20 bg-white rounded border border-gray-300 shadow-xl rotate-12 -translate-x-4 animate-bounce [animation-delay:0.2s]"></div>
          </div>
          <p className="text-gray-400 mb-8 max-w-xs mx-auto">
            應援大集訓：完成 12 首歌曲練習，<br/>湊齊卡牌贏得實體小禮！
          </p>
          <button 
            onClick={() => setIsLanding(false)}
            className="group relative px-12 py-4 bg-[#ff0033] rounded-full overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative text-white font-bold text-lg">接受挑戰</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#d4af37]/20 p-4 flex justify-between items-center">
        <h1 className="font-cinzel text-[#d4af37] font-bold text-lg tracking-widest leading-none">HIDDEN TRAINING</h1>
        <div className="flex gap-1">
          {['spades', 'clubs', 'hearts', 'diamonds', 'hidden'].map((s) => (
            <span key={s} className={`text-sm ${unlocked.includes(s as Suit) ? 'text-[#d4af37] gold-shimmer bg-clip-text' : 'text-gray-800'}`}>
              ●
            </span>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="p-6">
            <section className="mb-12 text-center">
              <h2 className="text-2xl font-cinzel text-white mb-6 uppercase tracking-widest">訓練進度</h2>
              <div className="flex justify-center gap-2 overflow-x-auto pb-6">
                {['spades', 'clubs', 'hearts', 'diamonds', 'hidden'].map((suit, i) => (
                  <div key={suit} className="flex flex-col items-center">
                    <div className={`w-14 h-20 rounded-lg border-2 flex items-center justify-center mb-2 transition-all duration-500 ${
                      unlocked.includes(suit as Suit) 
                      ? 'bg-white border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105' 
                      : 'bg-[#1a1a1a] border-gray-800 opacity-30 grayscale'
                    }`}>
                      <span className={`text-2xl ${unlocked.includes(suit as Suit) ? (i > 1 && i < 4 ? 'text-[#ff0033]' : 'text-black') : 'text-gray-700'}`}>
                        {suit === 'hidden' ? '🃏' : MEMBER_INFO[suit as Suit].symbol}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{MEMBER_INFO[suit as Suit].name}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-900 h-2 rounded-full mt-4 overflow-hidden border border-gray-800">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#ff0033] transition-all duration-1000" 
                  style={{ width: `${(unlocked.length / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 mt-3 font-bold uppercase tracking-widest">目前集牌: {unlocked.length} / 5</p>
            </section>

            <section className="grid grid-cols-1 gap-4">
              <button onClick={() => setActiveTab('fanchant')} className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-3xl flex items-center justify-between group hover:border-[#ff0033] transition-all">
                <div className="text-left">
                  <h3 className="text-xl font-bold">應援翻牌挑戰</h3>
                  <p className="text-sm text-gray-500">已達成 {gameState.songsCompleted.length} / 12 首</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[#ff0033]">
                  <span className="text-xl">🎵</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('guide')} className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-3xl flex items-center justify-between group hover:border-[#d4af37] transition-all">
                <div className="text-left">
                  <h3 className="text-xl font-bold">必勝攻略</h3>
                  <p className="text-sm text-gray-500">練習專用影片與圖卡</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[#d4af37]">
                  <span className="text-xl">📖</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('message')} className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-3xl flex items-center justify-between group hover:border-white transition-all">
                <div className="text-left">
                  <h3 className="text-xl font-bold">Hidden 留言牆</h3>
                  <p className="text-sm text-gray-500">{gameState.messageSent ? '精神喊話已送達 ✓' : '與 The Joker 對話'}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-white group-hover:text-black">
                  <span className="text-xl">✍️</span>
                </div>
              </button>

              {unlocked.includes('hidden') && (
                <button onClick={() => setActiveTab('reward')} className="bg-[#d4af37]/10 border-2 border-[#d4af37] p-6 rounded-3xl flex items-center justify-between group animate-pulse">
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-[#d4af37]">查看 Hidden Card</h3>
                    <p className="text-sm text-[#d4af37]/70">專屬收藏卡已解鎖！</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center">
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
          <RewardScreen userName={gameState.userName} />
        )}
      </main>

      {/* Navigation Footer */}
      <nav className="fixed bottom-0 inset-x-0 h-20 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-gray-800 flex items-center justify-around z-40">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-[#d4af37]' : 'text-gray-600'}`}>
          <div className="text-xl">🏠</div>
          <span className="text-[9px] font-bold uppercase tracking-widest">大廳</span>
        </button>
        <button onClick={() => setActiveTab('fanchant')} className={`flex flex-col items-center gap-1 ${activeTab === 'fanchant' ? 'text-[#ff0033]' : 'text-gray-600'}`}>
          <div className="text-xl">🎵</div>
          <span className="text-[9px] font-bold uppercase tracking-widest">挑戰</span>
        </button>
        <button onClick={() => setActiveTab('guide')} className={`flex flex-col items-center gap-1 ${activeTab === 'guide' ? 'text-white' : 'text-gray-600'}`}>
          <div className="text-xl">📖</div>
          <span className="text-[9px] font-bold uppercase tracking-widest">攻略</span>
        </button>
        <button onClick={() => setActiveTab('message')} className={`flex flex-col items-center gap-1 ${activeTab === 'message' ? 'text-blue-500' : 'text-gray-600'}`}>
          <div className="text-xl">✍️</div>
          <span className="text-[9px] font-bold uppercase tracking-widest">留言</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
