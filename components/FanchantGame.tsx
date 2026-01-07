import React, { useState, useEffect, useRef } from 'react';
import { SONGS } from '../constants.tsx';
import PokerCard from './PokerCard.tsx';

interface FanchantGameProps {
  completedSongs: number[];
  onComplete: (songId: number) => void;
}

const FanchantGame: React.FC<FanchantGameProps> = ({ completedSongs, onComplete }) => {
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const challengeSongs = SONGS.filter(s => s.isChallenge);
  const currentSong = SONGS.find(s => s.id === selectedSongId);

  // 音訊播放控制邏輯
  useEffect(() => {
    if (selectedSongId && currentSong?.musicUrl) {
      // 停止舊音訊並建立新音訊
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      const audio = new Audio(currentSong.musicUrl);
      audio.loop = false; // 應援測試通常播放一次即可
      audioRef.current = audio;
      
      // 嘗試播放 (瀏覽器可能需要使用者互動才能自動播放，但在點擊卡片後通常可執行)
      audio.play().catch(err => console.log('音訊自動播放受阻:', err));
    }

    // 清理函數：當彈窗關閉或組件卸載時停止音樂
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedSongId, currentSong]);

  const handleCardClick = (id: number) => {
    if (completedSongs.includes(id)) return;
    setSelectedSongId(id);
    setShowResult(false);
    setIsCorrect(null);
  };

  const handleAnswer = (index: number) => {
    if (!currentSong) return;
    const correct = index === currentSong.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // 答題後淡出或停止音樂
    if (audioRef.current) {
      // 簡單起見直接停止，也可以做音量漸減
      audioRef.current.pause();
    }

    setTimeout(() => {
      if (correct) {
        onComplete(currentSong.id);
      }
      setSelectedSongId(null);
      setShowResult(false);
      setIsCorrect(null);
    }, 1500);
  };

  const handleExit = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedSongId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-cinzel text-[#d4af37] text-center mb-6">翻牌應援挑戰</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
        {challengeSongs.map(song => (
          <PokerCard
            key={song.id}
            suit={song.suit}
            isFlipped={completedSongs.includes(song.id)}
            onClick={() => handleCardClick(song.id)}
            className="w-full max-w-[120px]"
          >
            <div className="w-full h-full bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${song.imageUrl})` }}>
              <div className="w-full h-full bg-black/40 flex items-end p-1 rounded-lg border border-white/10">
                <span className="text-[10px] font-bold text-white truncate w-full px-1">{song.title}</span>
              </div>
            </div>
          </PokerCard>
        ))}
      </div>

      {selectedSongId && currentSong && !completedSongs.includes(selectedSongId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border-2 border-[#ff0033] rounded-3xl p-6 w-full max-w-md shadow-[0_0_30px_rgba(255,0,51,0.3)]">
            <h3 className="text-xl font-bold text-white mb-2">{currentSong.title}</h3>
            <p className="text-gray-400 text-sm mb-4"></p>
            
            <div className="bg-black/50 p-4 rounded-xl mb-6 flex flex-col items-center border border-white/5">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${showResult ? 'bg-gray-800' : 'bg-[#ff0033] animate-pulse shadow-[0_0_20px_rgba(255,0,51,0.5)]'}`}>
                {showResult ? (
                  isCorrect ? (
                    <span className="text-3xl text-green-500">✓</span>
                  ) : (
                    <span className="text-3xl text-red-500">✗</span>
                  )
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-300">
                {currentSong.musicUrl ? (showResult ? '判定中...' : '音樂播放中，請仔細聆聽...') : '應援題目考驗中...'}
              </span>
            </div>

            <p className="text-white mb-4 text-center font-bold px-2">{currentSong.question}</p>
            
            <div className="space-y-3">
              {currentSong.options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={showResult}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-300 ${
                    showResult && idx === currentSong.correctAnswer 
                      ? 'bg-green-600 border-green-400 text-white' 
                      : showResult && idx !== currentSong.correctAnswer && isCorrect === false
                      ? 'bg-red-900/50 border-red-500 text-red-100'
                      : 'bg-[#0a0a0a] border-gray-700 text-gray-300 hover:border-[#d4af37] hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button 
              onClick={handleExit}
              className="mt-6 w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              暫時退出
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FanchantGame;
