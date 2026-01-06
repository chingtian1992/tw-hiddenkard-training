
import React, { useState, useRef } from 'react';

interface RewardScreenProps {
  userName: string;
  memberId: string; // 新增：接收編號
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

  const handleShare = () => {
    alert(`已準備好分享！專屬編號：${memberId}\n請截圖此【Hidden KARD】限定收藏卡，發布至 IG 限動並標記 @KARD_OFFICIAL 吧！`);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-cinzel text-[#d4af37] text-center mb-2">集牌完成！</h2>
      <p className="text-gray-400 text-center mb-8">專屬【Hidden KARD】收藏卡</p>

      {/* Personalization UI */}
      <div className="w-full max-w-sm mb-8 space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">自訂暱稱</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-800 text-white rounded-lg p-2 focus:border-[#d4af37] outline-none"
            placeholder="輸入你的暱稱"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">上傳頭像</label>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-800 text-gray-300 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            {profilePic ? '更換頭像' : '選擇個人相片'}
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
      <div id="hidden-card" className="relative w-full max-w-[300px] aspect-[2/3] bg-[#0a0a0a] border-4 border-[#d4af37] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.4)] group">
        <div className="absolute inset-0 gold-shimmer opacity-20 pointer-events-none"></div>
        
        <div className="relative h-full flex flex-col p-5 z-10">
          <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-3xl font-black opacity-80 leading-none">
            <span>K</span>
            <span>A</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-5">
              <div className="absolute inset-0 border-4 border-[#d4af37] rounded-full gold-shimmer animate-pulse"></div>
              <div className="absolute inset-1.5 bg-black rounded-full overflow-hidden flex items-center justify-center">
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
                  {userName}
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

      <button 
        onClick={handleShare}
        className="mt-8 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-12 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
      >
        分享至 Instagram
      </button>

      {/* Verification Area */}
      <div className="mt-12 bg-[#1a1a1a] p-6 rounded-3xl border border-gray-800 text-center w-full max-w-sm">
        <h4 className="text-white font-bold mb-4 text-xs tracking-widest uppercase">現場領獎專用 QR</h4>
        <div className="bg-white p-3 rounded-xl inline-block shadow-inner">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=KARD_FAN_${memberId}`} alt="QR" className="w-24 h-24" />
        </div>
        <p className="text-[10px] text-gray-500 mt-4 leading-relaxed italic">請於演唱會攤位出示此動態畫面<br/>領取實體限定透卡 (驗證碼: {memberId})</p>
      </div>
    </div>
  );
};

export default RewardScreen;
