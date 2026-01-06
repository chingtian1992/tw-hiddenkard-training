
import React from 'react';
import { SONGS } from '../constants';

const TrainingGuide: React.FC = () => {
  const openLink = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("資源準備中，敬請期待！");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-cinzel text-[#d4af37] text-center mb-6">必勝攻略：應援練習庫</h2>
      <p className="text-gray-400 text-sm mb-8 text-center">完整的應援影片與節奏圖卡，點擊進入練習模式</p>
      
      <div className="grid grid-cols-1 gap-4">
        {SONGS.map(song => (
          <div key={song.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden flex items-center group hover:border-[#d4af37] transition-all">
            <div 
              className="w-24 h-24 bg-cover bg-center shrink-0" 
              style={{ backgroundImage: `url(${song.imageUrl})` }}
            ></div>
            
            <div className="flex-1 p-4 overflow-hidden">
              <h3 className="text-white font-bold truncate">{song.title}</h3>
            </div>
            
            <div className="flex flex-col gap-2 p-4 shrink-0">
              <button 
                onClick={() => openLink(song.videoUrl)}
                className="bg-[#ff0033] text-white text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-transform"
              >
                影片
              </button>
              <button 
                onClick={() => openLink(song.chartUrl)}
                className="bg-gray-800 text-white text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-transform"
              >
                圖卡
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-3xl text-center">
        <p className="text-xs text-gray-400 leading-relaxed italic">
          💡 練習小撇步：<br/>先看「圖卡」記憶口號，再跟著「影片」實際練習，<br/>最後到「挑戰」頁面完成解鎖任務！
        </p>
      </div>
    </div>
  );
};

export default TrainingGuide;
