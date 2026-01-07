
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

    // 擷取圖片，確保背景與樣式正確
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 3, // 高解析度
      backgroundColor: '#050505',
      borderRadius: 40,
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
    } catch (error) {
      console.error("Download failed:", error);
      alert("下載失敗，請嘗試長按圖片保存。");
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
      alert("建議：長按上方卡片圖片保存後，分享至社交平台！");
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

      {/* 收藏卡本體 - 靜態高質感設計 */}
      <div className="relative group mb-10">
        <div 
          ref={cardRef}
          className="relative w-[300px] aspect-[2/3] bg-[#050505] border-[5px] border-[#d4af37] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
        >
          {/* 靜態紋理背景 */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          
          <div className="relative h-full flex flex-col p-8 z-10">
            {/* 卡面頂部字母 */}
            <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-4xl font-black opacity-90 leading-none">
              <span>K</span>
              <span>A</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              {/* 中央頭像環 */}
              <div className="relative w-36 h-36 mb-6">
                <div className="absolute inset-0 border-[4px] border-[#d4af37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)]"></div>
                <div className="absolute inset-2 bg-black rounded-full overflow-hidden flex items-center justify-center border border-[#d4af37]/20">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" crossOrigin="anonymous" />
                  ) : (
                    <div className="text-[#d4af37] text-5xl">🃏</div>
                  )}
                </div>
              </div>

              {/* 暱稱與身分標籤 */}
              <div className="text-center">
                <p className="text-[10px] text-gray-500 font-cinzel tracking-[0.3em] uppercase mb-1 font-bold">Hidden KARD</p>
                <h3 className="text-3xl font-black font-cinzel text-white drop-shadow-lg mb-4">
                  {userName || 'HIDDEN'}
                </h3>
                
                <span className="px-5 py-1.5 bg-[#ff0033] text-white rounded-full text-[9px] font-black tracking-[0.2em] uppercase shadow-[0_8px_20px_rgba(255,0,51,0.3)]">
                  CERTIFIED JOKER
                </span>
              </div>
            </div>

            {/* 卡面底部資訊 */}
            <div className="w-full mt-auto">
              <p className="text-[9px] text-[#d4af37]/60 font-mono tracking-widest mb-3 text-center font-bold">
                ID: {memberId}
              </p>
              <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-4xl font-black opacity-90 leading-none">
                <span>R</span>
                <span>D</span>
              </div>
            </div>
          </div>
          
          {/* 反光效果 (僅網頁互動顯示) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={handleDownload}
          disabled={isCapturing}
          className="w-full bg-[#d4af37] text-black py-4 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-[#d4af37]/20"
        >
          <span className="text-xl">💾</span>
          <span>{isCapturing ? '處理中...' : '下載認證卡'}</span>
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
        已恢復穩定版設計。若下載失敗，可長按卡片直接保存圖片。<br/>
        標記 <span className="text-white">@KARD_OFFICIAL</span> 展示你的訓練成果！
      </p>

      {/* 核銷區 */}
      <div className="mt-16 bg-[#1a1a1a] p-8 rounded-[2.5rem] border border-gray-800 text-center w-full max-w-sm">
        <div className="mb-4">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">現場核銷專區</span>
        </div>
        <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl mb-6">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KARD_FAN_${memberId}`} 
            alt="QR" 
            className="w-32 h-32 opacity-90" 
          />
        </div>
        <div className="space-y-1">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black">MEMBER AUTH CODE</p>
          <p className="text-lg font-mono font-black text-white/30 tracking-tight">{memberId}</p>
        </div>
      </div>
    </div>
  );
};

export default RewardScreen;
