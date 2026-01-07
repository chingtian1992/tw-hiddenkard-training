
import React, { useState, useRef } from 'react';

interface RewardScreenProps {
  userName: string;
  memberId: string;
}

declare var html2canvas: any;

const RewardScreen: React.FC<RewardScreenProps> = ({ userName: initialName, memberId }) => {
  const [userName, setUserName] = useState(initialName);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const captureCard = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    
    // 拍照快門視覺效果
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);

    // 擷取圖片
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 3, // 高清倍率
      backgroundColor: '#0a0a0a',
      borderRadius: 40,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob: Blob) => resolve(blob), 'image/jpeg', 0.95);
    });
  };

  const handleDownload = async () => {
    setIsCapturing(true);
    const blob = await captureCard();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KARD_HOLOGRAPHIC_CARD_${memberId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setIsCapturing(false);
  };

  const handleShare = async () => {
    const text = `我是 Hidden KARD [${userName}]，我已獲得 KARD 專屬應援卡！ @KARD_OFFICIAL`;
    setIsCapturing(true);
    const blob = await captureCard();
    setIsCapturing(false);

    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], 'HiddenCard.jpg', { type: 'image/jpeg' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ title: 'KARD HIDDEN CARD', text, files: [file] });
          return;
        } catch (err) { console.log('Share error', err); }
      }
    }
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'KARD HIDDEN CARD', text, url: window.location.href });
      } catch (err) { console.log('Text share error'); }
    } else {
      alert("請長按圖片保存分享至 IG 限動！");
    }
  };

  return (
    <div className="p-6 pb-32 flex flex-col items-center">
      {showFlash && <div className="shutter-flash" />}
      
      <h2 className="text-3xl font-cinzel text-[#d4af37] text-center mb-2">集牌完成！</h2>
      <p className="text-gray-400 text-center mb-8 text-[10px] tracking-[0.3em] font-black uppercase">ULTRA RARE HOLOGRAPHIC CARD</p>

      {/* 個人化自訂 UI */}
      <div className="w-full max-w-xs mb-10 space-y-4 bg-[#1a1a1a] p-5 rounded-3xl border border-gray-800 shadow-2xl">
        <div className="flex flex-col gap-2">
          <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-black ml-1">自訂暱稱</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            className="bg-black border border-gray-800 text-white rounded-2xl p-3 text-sm focus:border-[#d4af37] outline-none transition-all text-center font-bold"
            placeholder="ENTER NAME"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-black ml-1">個人頭像</label>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/5 text-white/60 py-3 rounded-2xl text-[10px] font-black tracking-widest uppercase border border-white/5 hover:bg-white/10 transition-all"
          >
            {profilePic ? 'CHANGE AVATAR 📸' : 'SELECT AVATAR 📸'}
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      {/* 雷射邊框卡片本體 */}
      <div className="relative group mb-12">
        <div 
          ref={cardRef}
          className="relative w-[300px] aspect-[2/3] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          {/* 雷射虹彩邊框層 (Holographic Border) */}
          <div className="absolute inset-0 p-[5px] bg-holographic animate-holographic">
             {/* 靜態背景層：確保擷取時不會有動畫導致的色塊 */}
             <div className="w-full h-full bg-[#050505] rounded-[1.7rem] overflow-hidden relative">
                
                {/* 靜態紋理 (固定位置，無動畫) */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                
                {/* 裝飾性漸層（靜態） */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                <div className="relative h-full flex flex-col p-8 z-10">
                  {/* 卡面四角標識 */}
                  <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-4xl font-black opacity-90 drop-shadow-md leading-none">
                    <span>K</span>
                    <span>A</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center -mt-4">
                    {/* 頭像區域 */}
                    <div className="relative w-36 h-36 mb-6">
                      {/* 固定金邊 */}
                      <div className="absolute inset-0 border-[5px] border-[#d4af37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)]"></div>
                      <div className="absolute inset-2 bg-[#000] rounded-full overflow-hidden flex items-center justify-center border border-white/10">
                        {profilePic ? (
                          <img src={profilePic} alt="P" className="w-full h-full object-cover" crossOrigin="anonymous" />
                        ) : (
                          <div className="text-[#d4af37] text-5xl">🃏</div>
                        )}
                      </div>
                      {/* 裝飾星星 */}
                      <div className="absolute -top-1 -right-1 text-[#f7ef8a] text-xs">✦</div>
                      <div className="absolute -bottom-1 -left-1 text-[#f7ef8a] text-[10px]">✦</div>
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] text-gray-500 font-cinzel tracking-[0.4em] uppercase mb-1 font-black">Hidden KARD</p>
                      <div className="relative inline-block">
                        <h3 className="text-4xl font-black font-cinzel bg-gradient-to-b from-[#f7ef8a] via-[#d4af37] to-[#8a6e2f] bg-clip-text text-transparent drop-shadow-[0_4px_4px_rgba(0,0,0,1)] tracking-tight">
                          {userName || 'HIDDEN'}
                        </h3>
                      </div>
                      
                      <div className="mt-6">
                        <span className="px-6 py-2 bg-[#ff0033] text-white rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_10px_30px_rgba(255,0,51,0.4)] border border-white/10">
                          CERTIFIED JOKER
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 底部資訊 */}
                  <div className="w-full mt-auto">
                    <p className="text-[10px] text-[#d4af37]/60 font-cinzel tracking-[0.3em] mb-4 text-center uppercase font-black">
                      ID: {memberId}
                    </p>
                    <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-4xl font-black opacity-90 drop-shadow-md leading-none">
                      <span>R</span>
                      <span>D</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* 卡片反光掃描感 (僅在網頁顯示，不影響下載圖片的純淨度) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-40 rounded-[2rem]"></div>
      </div>

      {/* 按鈕組 */}
      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={handleDownload}
          disabled={isCapturing}
          className="w-full bg-[#d4af37] text-black py-4 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-[#d4af37]/30"
        >
          <span className="text-xl">💾</span>
          <span>{isCapturing ? 'GENERATING...' : '下載雷射收藏卡'}</span>
        </button>

        <button 
          onClick={handleShare}
          disabled={isCapturing}
          className="w-full bg-white text-black py-4 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-white/5"
        >
          <span className="text-xl">📱</span>
          <span>分享至 Instagram</span>
        </button>
      </div>

      <p className="mt-12 text-gray-600 text-[10px] text-center max-w-xs font-bold leading-relaxed tracking-tight">
        我們已移除背景動畫以確保圖片存檔品質。<br/>
        <span className="text-white">雷射虹彩邊框</span> 在圖片中將呈現精緻的七彩漸層效果！
      </p>

      {/* 底部核銷區 */}
      <div className="mt-16 bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/5 text-center w-full max-w-sm shadow-inner">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mb-4">Official Verification</span>
          <div className="bg-white p-5 rounded-3xl shadow-2xl ring-4 ring-white/5">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KARD_FAN_${memberId}`} 
              alt="QR" 
              className="w-32 h-32 opacity-90" 
            />
          </div>
        </div>
        <p className="text-[9px] text-gray-700 uppercase tracking-widest font-black mb-1">MEMBER AUTHENTICATION CODE</p>
        <p className="text-xl font-mono font-black text-white/30 tracking-tight">{memberId}</p>
      </div>

      <style>{`
        .bg-holographic {
          background: linear-gradient(
            135deg,
            #d4af37 0%,
            #f7ef8a 12%,
            #ffffff 20%,
            #00d2ff 35%,
            #92fe9d 50%,
            #ff00cc 65%,
            #ffffff 80%,
            #f7ef8a 88%,
            #d4af37 100%
          );
          background-size: 400% 400%;
        }
        @keyframes holographic-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-holographic {
          animation: holographic-move 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default RewardScreen;
