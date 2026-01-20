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
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
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
      audio.loop = false;
      
      audio.onplay = () => setIsAudioPlaying(true);
      audio.onpause = () => setIsAudioPlaying(false);
      audio.onended = () => setIsAudioPlaying(false);
      
      audioRef.current = audio;
      
      // 嘗試播放
      audio.play().catch(err => {
        console.log('音訊自動播放受阻:', err);
        setIsAudioPlaying(false);
      });
    }

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

  const handleReplay = () => {
    if (audioRef.current && !showResult) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('重播失敗:', err));
    }
  };

  const handleAnswer = (index: number) => {
    if (!currentSong) return;
    const correct = index === currentSong.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (audioRef.current) {
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
            <h3 className="text-xl font-bold text-white mb-6 text-center">{currentSong.title}</h3>
            
            <div className="bg-black/50 p-6 rounded-xl mb-6 flex flex-col items-center border border-white/5">
              <button 
                onClick={handleReplay}
                disabled={showResult}
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-all ${
                  showResult 
                    ? 'bg-gray-800' 
                    : isAudioPlaying 
                      ? 'bg-[#ff0033] animate-pulse shadow-[0_0_25px_rgba(255,0,51,0.6)] scale-110' 
                      : 'bg-[#ff0033]/20 border-2 border-[#ff0033] hover:bg-[#ff0033]/40'
                }`}
              >
                {showResult ? (
                  isCorrect ? (
                    <span className="text-4xl text-green-500">✓</span>
                  ) : (
                    <span className="text-4xl text-red-500">✗</span>
                  )
                ) : isAudioPlaying ? (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-[8px] text-white font-black mt-1 uppercase tracking-tighter">REPLAY</span>
                  </div>
                )}
              </button>
              <span className="text-xs text-gray-400 font-medium">
                {showResult ? '判定完成' : isAudioPlaying ? '聆聽旋律中...' : '播放結束，點擊圖示可重播'}
              </span>
            </div>

            <p className="text-white mb-6 text-center font-bold px-2 leading-relaxed">{currentSong.question}</p>
            
            <div className="space-y-3">
              {currentSong.options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={showResult}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full py-4 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                    showResult && idx === currentSong.correctAnswer 
                      ? 'bg-green-600 border-green-400 text-white translate-x-1' 
                      : showResult && idx !== currentSong.correctAnswer && isCorrect === false
                      ? 'bg-red-900/50 border-red-500 text-red-100 opacity-60'
                      : 'bg-[#0a0a0a] border-gray-700 text-gray-300 hover:border-[#ff0033] hover:text-white active:bg-[#ff0033]/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button 
              onClick={handleExit}
              className="mt-8 w-full text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors py-2"
            >
              — 暫時退出 —
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FanchantGame;
