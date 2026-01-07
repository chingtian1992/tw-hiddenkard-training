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
    
    // 顯示快門效果
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);

    // 使用 html2canvas 擷取
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 3, // 提高解析度
      backgroundColor: '#0a0a0a',
      borderRadius: 24,
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
      link.download = `KARD_HIDDEN_CARD_${memberId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setIsCapturing(false);
  };

  const handleShare = async () => {
    const text = `我是 Hidden KARD [${userName}]，這是我的專屬收藏編號：${memberId}！快來跟我一起應援！ @KARD_OFFICIAL`;
    
    setIsCapturing(true);
    const blob = await captureCard();
    setIsCapturing(false);

    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], 'HiddenCard.jpg', { type: 'image/jpeg' });
      const shareData = {
        title: 'KARD: THE HIDDEN CARD',
        text: text,
        files: [file],
      };

      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          console.log('Share failed', err);
        }
      }
    }

    // Fallback if file sharing not supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KARD: THE HIDDEN CARD',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Text share failed');
      }
    } else {
      alert(`已準備好分享資訊！\n\n專屬編號：${memberId}\n\n請長按卡面「下載圖片」後，發布至 IG 限動並標記 @KARD_OFFICIAL 吧！`);
    }
  };

  return (
    <div className="p-6 pb-32 flex flex-col items-center">
      {showFlash && <div className="shutter-flash" />}
      
      <h2 className="text-3xl font-cinzel text-[#d4af37] text-center mb-2">集牌完成！</h2>
      <p className="text-gray-400 text-center mb-8 text-xs tracking-widest font-bold">專屬【Hidden KARD】收藏卡</p>

      {/* Personalization UI */}
      <div className="w-full max-w-sm mb-8 space-y-4 bg-[#1a1a1a] p-4 rounded-2xl border border-gray-800 shadow-xl">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Step 1: 自訂暱稱</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            className="bg-black border border-gray-800 text-white rounded-xl p-3 text-sm focus:border-[#d4af37] outline-none transition-all font-bold text-center"
            placeholder="輸入你的暱稱"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Step 2: 上傳個人相片</label>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-800 text-white py-3 rounded-xl text-xs font-bold hover:bg-gray-700 transition-colors border border-gray-700 uppercase tracking-widest"
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

      {/* Digital Certificate Card Container */}
      <div className="relative group mb-10">
        <div 
          ref={cardRef}
          id="hidden-card" 
          className="relative w-full max-w-[300px] aspect-[2/3] bg-[#0a0a0a] border-4 border-[#d4af37] rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
        >
          {/* 背景層 1: 隱約的消光絲絨菱格紋理 */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          {/* 背景層 2: 靜態消光漸層（模擬絲絨受光效果） */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40 pointer-events-none"></div>
          
          <div className="relative h-full flex flex-col p-6 z-10">
            {/* 卡面頂部標誌 */}
            <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-3xl font-black opacity-80 leading-none">
              <span>K</span>
              <span>A</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              {/* 中央頭像環 - 靜態高質感 */}
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 border-4 border-[#d4af37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)]"></div>
                <div className="absolute inset-1.5 bg-black rounded-full overflow-hidden flex items-center justify-center border border-[#d4af37]/20">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" crossOrigin="anonymous" />
                  ) : (
                    <div className="text-[#d4af37] text-4xl">🃏</div>
                  )}
                </div>
              </div>

              {/* 資訊區 */}
              <div className="text-center">
                <p className="text-[10px] text-gray-500 font-cinzel tracking-[0.4em] uppercase mb-1 font-bold">Hidden KARD</p>
                <div className="mb-4">
                  <h3 className="text-white text-3xl font-black font-cinzel tracking-tight drop-shadow-md">
                    {userName || 'HIDDEN'}
                  </h3>
                </div>
                
                <div>
                  <span className="px-5 py-1.5 bg-[#ff0033] text-white rounded-full text-[9px] font-black tracking-[0.2em] uppercase shadow-[0_8px_20px_rgba(255,0,51,0.3)]">
                    CERTIFIED JOKER
                  </span>
                </div>
              </div>
            </div>

            {/* 卡面底部資訊 */}
            <div className="w-full mt-auto">
               <p className="text-[9px] text-[#d4af37]/60 font-mono tracking-[0.2em] mb-3 text-center uppercase font-bold">
                 NO. {memberId}
               </p>
               <div className="w-full flex justify-between text-[#d4af37] font-cinzel text-3xl font-black opacity-80 leading-none">
                  <span>R</span>
                  <span>D</span>
               </div>
            </div>
          </div>
          
          {/* 反光效果 - 僅限網頁端 Hover，不影響下載圖片 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
        </div>
      </div>

      {/* Button Group */}
      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={handleDownload}
          disabled={isCapturing}
          className="w-full bg-white text-black py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
        >
          <span className="text-lg">💾</span>
          <span>{isCapturing ? '正在生成圖片...' : '下載絲絨認證卡'}</span>
        </button>

        <button 
          onClick={handleShare}
          disabled={isCapturing}
          className="w-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink-900/10"
        >
          <span className="text-lg">📱</span>
          <span>分享至 Instagram</span>
        </button>
      </div>

      {/* Share Instructions */}
      <div className="text-center mt-10 mb-6 px-4">
        <p className="text-gray-500 text-[10px] leading-relaxed font-bold">
          <span className="text-gray-300">已套用消光絲絨紋理。</span><br/>
          下載圖片後發布至 <span className="text-[#bc1888]">Instagram 限動</span><br/>
          並標記 <span className="text-[#d4af37]">@KARD_OFFICIAL</span>
        </p>
      </div>

      {/* Verification Area */}
      <div className="mt-12 bg-[#121212] p-8 rounded-[2.5rem] border border-gray-800 text-center w-full max-w-sm shadow-inner">
        <div className="mb-4">
          <span className="bg-[#d4af37]/10 text-[#d4af37] text-[10px] px-5 py-1.5 rounded-full font-black uppercase tracking-widest border border-[#d4af37]/20">
            Staff Verification
          </span>
        </div>
        
        <div className="bg-white p-5 rounded-3xl inline-block shadow-2xl mb-6 ring-4 ring-white/5">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KARD_FAN_${memberId}`} 
            alt="QR" 
            className="w-32 h-32 opacity-90" 
          />
        </div>

        <div className="space-y-1">
          <p className="text-[9px] text-gray-700 uppercase tracking-widest font-black">MEMBER ID</p>
          <p className="text-lg font-mono font-black text-white/30 tracking-tighter italic">
            {memberId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardScreen;

