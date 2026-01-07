
import React from 'react';
import { SONGS } from '../constants';

const TrainingGuide: React.FC = () => {
  const openVideo = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("影片資源準備中，敬請期待！");
    }
  };

  const handleChartClick = (isChallenge: boolean, url?: string) => {
    if (!isChallenge) {
      alert("這首沒有應援詞，請盡情享受歌曲～");
      return;
    }
    
    if (url && url !== 'https://i.imgur.com') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("應援圖卡製作中，請參考應援影片練習！");
    }
  };

  return (
    <div className="p-6 pb-32">
      <h2 className="text-2xl font-cinzel text-[#d4af37] text-center mb-6">必勝攻略：應援練習庫</h2>
      <p className="text-gray-400 text-sm mb-8 text-center px-4 leading-relaxed">收錄 KARD 精選曲目，點擊按鈕進入練習或欣賞模式</p>
      
      <div className="grid grid-cols-1 gap-4">
        {SONGS.map(song => (
          <div key={song.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden flex items-center group hover:border-[#d4af37]/50 transition-all shadow-lg">
            <div 
              className="w-24 h-24 bg-cover bg-center shrink-0 border-r border-gray-800" 
              style={{ backgroundImage: `url(${song.imageUrl})` }}
            ></div>
            
            <div className="flex-1 p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold truncate text-sm">{song.title}</h3>
                {!song.isChallenge && (
                  <span className="text-[7px] bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">無應援</span>
                )}
              </div>
               <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black"></p>
            </div>
            
            <div className="flex flex-col gap-2 p-4 shrink-0">
              <button 
                onClick={() => openVideo(song.videoUrl)}
                className="bg-[#ff0033] text-white text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-tighter hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-900/20"
              >
                影片
              </button>
              <button 
                onClick={() => handleChartClick(song.isChallenge, song.chartUrl)}
                className={`text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-tighter transition-all ${
                  song.isChallenge 
                    ? 'bg-gray-800 text-white hover:bg-gray-700 active:scale-95' 
                    : 'bg-transparent border border-gray-800 text-gray-600'
                }`}
              >
                {song.isChallenge ? '圖卡' : '說明'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-3xl text-center">
        <p className="text-[10px] text-gray-400 leading-relaxed italic font-medium">
          💡 練習小撇步：<br/>標記 <span className="text-white font-bold">「圖卡」</span> 的歌曲有應援挑戰，<br/>先記口號再看影片，最後挑戰集牌換好禮！
        </p>
      </div>
    </div>
  );
};

export default TrainingGuide;
