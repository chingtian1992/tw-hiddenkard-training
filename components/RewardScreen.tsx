
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
    
    // 視覺快門效果
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);

    // 使用 html2canvas 擷取，scale 設為 3 以提供列印級品質
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 3, 
      backgroundColor: '#050505',
      borderRadius: 40,
      logging: false,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob: Blob) => resolve(blob), 'image/jpeg', 0.95);
    });
  };

  const handleDownload = async () => {
    setIsCapturing(true);
    try {
      const blob = await captureCard();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `KARD_HIDDEN_CARD_${memberId}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      alert("下載失敗，請長按圖片保存。");
    }
    setIsCapturing(false);
  };

  const handleShare = async () => {
    const text = `我是 Hidden KARD [${userName}]，這是我的專屬應援卡！ @KARD_OFFICIAL`;
    setIsCapturing(true);
    const blob = await captureCard();
    setIsCapturing(false);

    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], 'HiddenCard.jpg', { type: 'image/jpeg' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ title: 'KARD HIDDEN CARD', text, files: [file] });
          return;
        } catch (err) { console.log(err); }
      }
    }
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'KARD HIDDEN CARD', text, url: window.location.href });
      } catch (err) { console.log(err); }
    } else {
      alert("請下載圖片後分享至 IG 限動並標記 @KARD_OFFICIAL！");
    }
  };

  return (
    <div className="p-6 pb-32 flex flex-col items-center">
      {showFlash && <div className="shutter-flash" />}
      
      <h2 className="text-3xl font-cinzel text-[#d4af37] text-center mb-2">應援認證</h2>
      <p className="text-gray-400 text-center mb-8 text-[10px] tracking-[0.3em] font-black uppercase">Official Hidden KARD Identity Card</p>

      {/* 個人化介面 */}
      <div className="w-full max-w-xs mb-8 space-y-4 bg-[#1a1a1a] p-5 rounded-3xl border border-gray-800 shadow-xl">
        <div className="flex flex-col gap-2">
          <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-black ml-1">自訂暱稱</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            className="bg-black border border-gray-800 text-white rounded-2xl p-3 text-sm focus:border-[#d4af37] outline-none transition-all text-center font-bold"
            placeholder="輸入你的暱稱"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-black ml-1">上傳頭像</label>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/5 text-white/60 py-3 rounded-2xl text-[10px] font-black tracking-widest uppercase border border-white/5 hover:bg-white/10 transition-all"
          >
            {profilePic ? '更換照片 📸' : '選擇照片 📸'}
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      {/* 收藏卡本體 - 雷射虹彩邊框 + 消光菱格紋背景 */}
      <div className="relative group mb-10">
        <div 
          ref={cardRef}
          className="relative w-[300px] aspect-[2/3] rounded-[2.2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        >
          {/* 雷射虹彩流動邊框層 */}
          <div className="absolute inset-0 p-[6px] bg-holographic animate-holographic">
            
            {/* 內層卡面：消光菱格紋背景 */}
            <div className="w-full h-full bg-[#080808] rounded-[1.85rem] overflow-hidden relative">
              
              {/* 深沉消光菱格紋理 (Diamond Pattern) */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-30 pointer-events-none mix-blend-overlay"></div>
              
              {/* 微弱漸層光影 (靜態，確保擷取不殘影) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/5 pointer-events-none"></div>

              <div className="relative h-full flex flex-col p-8 z-10">
                {/* 卡面頂部字母 */}
                <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-4xl font-black opacity-90 drop-shadow-md leading-none">
                  <span>K</span>
                  <span>A</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center -mt-2">
                  {/* 中央頭像環 */}
                  <div className="relative w-36 h-36 mb-6">
                    <div className="absolute inset-0 border-[4px] border-[#d4af37] rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)]"></div>
                    <div className="absolute inset-2 bg-black rounded-full overflow-hidden flex items-center justify-center border border-[#d4af37]/20 shadow-inner">
                      {profilePic ? (
                        <img src={profilePic} alt="P" className="w-full h-full object-cover" crossOrigin="anonymous" />
                      ) : (
                        <div className="text-[#d4af37] text-5xl">🃏</div>
                      )}
                    </div>
                  </div>

                  {/* 暱稱與身分標籤 */}
                  <div className="text-center">
                    <p className="text-[9px] text-gray-500 font-cinzel tracking-[0.4em] uppercase mb-1 font-black">Hidden KARD</p>
                    <h3 className="text-3xl font-black font-cinzel bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent drop-shadow-lg mb-4">
                      {userName || 'HIDDEN'}
                    </h3>
                    
                    <span className="px-6 py-2 bg-[#ff0033] text-white rounded-full text-[9px] font-black tracking-[0.2em] uppercase shadow-[0_10px_25px_rgba(255,0,51,0.4)] border border-white/10">
                      CERTIFIED JOKER
                    </span>
                  </div>
                </div>

                {/* 卡面底部資訊 */}
                <div className="w-full mt-auto">
                  <p className="text-[9px] text-[#d4af37]/70 font-mono tracking-[0.2em] mb-4 text-center font-black">
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
          
          {/* 反光效果 (僅網頁互動顯示，不影響下載圖片) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={handleDownload}
          disabled={isCapturing}
          className="w-full bg-[#d4af37] text-black py-4 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-[#d4af37]/30"
        >
          <span className="text-xl">💾</span>
          <span>{isCapturing ? '生成中...' : '下載虹彩認證卡'}</span>
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

      <p className="mt-10 text-gray-600 text-[10px] text-center max-w-xs font-bold leading-relaxed tracking-tight">
        已套用 <span className="text-white">雷射虹彩邊框</span> 與 <span className="text-white">消光菱格紋</span>。<br/>
        若下載失敗，可長按卡片直接保存圖片。<br/>
        標記 <span className="text-[#d4af37]">@KARD_OFFICIAL</span> 展示你的訓練成果！
      </p>

      {/* 底部核銷區 */}
      <div className="mt-16 bg-[#121212] p-8 rounded-[3rem] border border-white/5 text-center w-full max-w-sm shadow-inner">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] mb-4">Official Verification</span>
          <div className="bg-white p-5 rounded-3xl shadow-2xl ring-4 ring-white/5">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KARD_FAN_${memberId}`} 
              alt="QR" 
              className="w-32 h-32 opacity-80" 
            />
          </div>
        </div>
        <p className="text-[9px] text-gray-800 uppercase tracking-widest font-black mb-1">MEMBER AUTHENTICATION</p>
        <p className="text-lg font-mono font-black text-white/20 tracking-tighter">{memberId}</p>
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
          animation: holographic-move 10s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default RewardScreen;
