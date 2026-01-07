
import React, { useState, useRef } from 'react';

interface RewardScreenProps {
  userName: string;
  memberId: string;
}

const RewardScreen: React.FC<RewardScreenProps> = ({ userName: initialName, memberId }) => {
  const [userName, setUserName] = useState(initialName);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'KARD: THE HIDDEN CARD',
      text: `我是 Hidden KARD [${userName}]，這是我的專屬收藏編號：${memberId}！快來跟我一起應援！ @KARD_OFFICIAL`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      alert(`已準備好分享資訊！\n\n專屬編號：${memberId}\n\n請截圖此卡片，發布至 IG 限動並標記 @KARD_OFFICIAL 吧！`);
    }
  };

  return (
    <div className="p-6 pb-32 flex flex-col items-center">
      <h2 className="text-3xl font-cinzel text-[#d4af37] text-center mb-2">集牌完成！</h2>
      <p className="text-gray-400 text-center mb-8">專屬【Hidden KARD】收藏卡</p>

      {/* Personalization UI */}
      <div className="w-full max-w-sm mb-8 space-y-4 bg-[#1a1a1a] p-4 rounded-2xl border border-gray-800">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Step 1: 自訂暱稱</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            className="bg-black border border-gray-800 text-white rounded-xl p-3 text-sm focus:border-[#d4af37] outline-none transition-all"
            placeholder="輸入你的暱稱"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Step 2: 上傳個人相片</label>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-800 text-white py-3 rounded-xl text-xs font-bold hover:bg-gray-700 transition-colors border border-gray-700"
          >
            {profilePic ? '更換頭像 📸' : '選擇頭像 📸'}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
        </div>
      </div>

      {/* Digital Certificate Card */}
      <div id="hidden-card" className="relative w-full max-w-[300px] aspect-[2/3] bg-[#0a0a0a] border-4 border-[#d4af37] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.3)] group mb-10">
        <div className="absolute inset-0 gold-shimmer opacity-20 pointer-events-none"></div>
        
        <div className="relative h-full flex flex-col p-5 z-10">
          <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-3xl font-black opacity-80 leading-none">
            <span>K</span>
            <span>A</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-5">
              <div className="absolute inset-0 border-4 border-[#d4af37] rounded-full gold-shimmer animate-pulse"></div>
              <div className="absolute inset-1.5 bg-black rounded-full overflow-hidden flex items-center justify-center border border-[#d4af37]/30">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[#d4af37] text-4xl">🃏</div>
                )}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-white text-2xl font-bold font-cinzel tracking-tighter">Hidden KARD</h3>
              <div className="mt-2 inline-block">
                <p className="text-[#d4af37] text-xl font-black bg-black/60 px-5 py-1.5 rounded-lg border border-[#d4af37]/30 shadow-lg">
                  {userName || 'HIDDEN'}
                </p>
              </div>
              
              <div className="mt-4">
                <span className="px-3 py-1 bg-[#ff0033] text-white rounded-full text-[8px] font-black tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,0,51,0.5)]">
                  CERTIFIED JOKER
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-auto">
             <p className="text-[9px] text-[#d4af37]/60 font-cinzel tracking-[0.2em] mb-3 text-center uppercase font-bold">
               Member ID: {memberId}
             </p>
             <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-3xl font-black opacity-80 leading-none">
                <span>R</span>
                <span>D</span>
             </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 pointer-events-none"></div>
      </div>

      {/* Share Instructions */}
      <div className="text-center mb-6 px-4">
        <p className="text-gray-400 text-xs leading-relaxed">
          <span className="text-white font-bold">分享說明：</span><br/>
          點擊下方按鈕並選擇「儲存圖片」或直接截圖卡面，<br/>
          發布至 <span className="text-[#bc1888] font-bold">Instagram 限動</span> 並標記 <span className="text-[#d4af37] font-bold">@KARD_OFFICIAL</span>
        </p>
      </div>

      <button 
        onClick={handleShare}
        className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-12 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink-900/20"
      >
        <span>保存並分享至 Instagram</span>
      </button>

      {/* Verification Area - Improved for Staff */}
      <div className="mt-16 bg-[#1a1a1a] p-8 rounded-[2.5rem] border-2 border-[#d4af37]/40 text-center w-full max-w-sm shadow-[0_20px_50px_rgba(212,175,55,0.1)]">
        <div className="mb-4">
          <span className="bg-[#d4af37] text-black text-[10px] px-4 py-1 rounded-full font-black uppercase tracking-widest">
            Staff Only 現場核銷區
          </span>
        </div>
        
        <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl mb-6">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KARD_FAN_${memberId}`} 
            alt="QR" 
            className="w-32 h-32" 
          />
        </div>

        <div className="space-y-1">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">核銷識別碼</p>
          <p className="text-2xl font-mono font-black text-white tracking-tighter">
            {memberId}
          </p>
          <p className="text-[9px] text-gray-600 mt-4 leading-relaxed italic">
            工作人員請掃描上方 QR Code<br/>
            或手動輸入編號至核銷表單完成領獎紀錄
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardScreen;
