import React from 'react';
import { SONGS } from '../constants.tsx';

const TrainingGuide: React.FC = () => {
  const openUrl = (url?: string, type: string = '影片') => {
    if (url && url !== '') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`${type}資源準備中，敬請期待！`);
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
      <h2 className="text-2xl font-cinzel text-[#d4af37] text-center mb-6">精選清單：入門的必看指南</h2>
      <p className="text-gray-400 text-sm mb-8 text-center px-4 leading-relaxed">收錄 KARD 精選曲目，點擊按鈕進入練習或欣賞模式</p>
      
      <div className="grid grid-cols-1 gap-5">
        {SONGS.map(song => (
          <div key={song.id} className="bg-[#1a1a1a] border border-gray-800 rounded-3xl overflow-hidden flex items-center group hover:border-[#d4af37]/50 transition-all shadow-xl">
            <div 
              className="w-24 h-full min-h-[100px] bg-cover bg-center shrink-0 border-r border-gray-800" 
              style={{ backgroundImage: `url(${song.imageUrl})` }}
            ></div>
            
            <div className="flex-1 p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold truncate text-sm">{song.title}</h3>
                {!song.isChallenge && (
                  <span className="text-[7px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">無應援</span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 p-4 shrink-0 min-w-[140px]">
              {/* 第一排：官方影片 */}
              <button 
                onClick={() => openUrl(song.videoUrl, '官方影片')}
                className="w-full bg-[#ff0033] text-white text-[10px] py-2 rounded-xl font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-900/20"
              >
                官方影片
              </button>

              {/* 第二排：根據是否有應援呈現不同按鈕 */}
              <div className="flex gap-2">
                {song.isChallenge ? (
                  <>
                    <button 
                      onClick={() => openUrl(song.phoneticUrl, '空耳影片')}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-[9px] py-2 rounded-xl font-black uppercase tracking-tighter hover:bg-white/10 active:scale-95 transition-all"
                    >
                      空耳
                    </button>
                    <button 
                      onClick={() => handleChartClick(true, song.chartUrl)}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-[9px] py-2 rounded-xl font-black uppercase tracking-tighter hover:bg-white/10 active:scale-95 transition-all"
                    >
                      圖卡
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleChartClick(false)}
                    className="w-full bg-transparent border border-gray-800 text-gray-500 text-[9px] py-2 rounded-xl font-black uppercase tracking-widest"
                  >
                    說明
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-3xl text-center">
        <p className="text-[10px] text-gray-400 leading-relaxed italic font-medium">
          💡 練習小撇步：<br/>
          推薦先點擊 <span className="text-white font-bold">「空耳」</span> 熟悉發音，<br/>
          再看 <span className="text-white font-bold">「官方影片」</span> 配合動作，<br/>
          最後挑戰應援集牌換好禮！
        </p>
      </div>
    </div>
  );
};

export default TrainingGuide;
