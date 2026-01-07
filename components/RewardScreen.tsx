import React, { useState, useRef } from 'react';

interface RewardScreenProps {
  userName: string;
  memberId: string;
}

// 假設你的環境已經透過 CDN 或其他方式載入了 html2canvas
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

  // 方法一：優化後的 html2canvas 擷取邏輯
  const captureCard = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);

    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 3, 
        backgroundColor: '#0a0a0a',
        // 核心修正：在擷取瞬間修改副本樣式
        onclone: (clonedDoc: Document) => {
          const gradientTexts = clonedDoc.querySelectorAll('.text-transparent');
          gradientTexts.forEach((el) => {
            const htmlEl = el as HTMLElement;
            // 移除漸層與透明，改為實心金色以確保正確渲染
            htmlEl.style.background = 'none';
            htmlEl.style.webkitBackgroundClip = 'unset';
            htmlEl.style.backgroundClip = 'unset';
            htmlEl.style.color = '#d4af37'; 
            htmlEl.style.opacity = '1';
            // 針對 Hidden KARD 字樣 (原本是銀白漸層)
            if (htmlEl.innerText.includes('Hidden KARD')) {
              htmlEl.style.color = '#ffffff';
            }
          });
        }
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob: Blob) => resolve(blob), 'image/jpeg', 0.95);
      });
    } catch (err) {
      console.error("擷取失敗:", err);
      return null;
    }
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
        } catch (err) { console.log('Share failed', err); }
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KARD: THE HIDDEN CARD',
          text: text,
          url: window.location.href,
        });
      } catch (err) { console.log('Text share failed'); }
    } else {
      alert(`已準備好分享資訊！\n\n專屬編號：${memberId}\n\n請長按卡面「下載圖片」後，發布至 IG 限動並標記 @KARD_OFFICIAL 吧！`);
    }
  };

  return (
    <div className="p-6 pb-32 flex flex-col items-center">
      {showFlash && <div className="fixed inset-0 bg-white z-[100] pointer-events-none opacity-50" />}
      
      <h2 className="text-3xl font-cinzel text-[#d4af37] text-center mb-2">集牌完成！</h2>
      <p className="text-gray-400 text-center mb-8">專屬【Hidden KARD】收藏卡</p>

      {/* 自訂區域 */}
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
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      {/* 卡片本體 */}
      <div className="relative group mb-10">
        <div 
          ref={cardRef}
          id="hidden-card" 
          className="relative w-full max-w-[300px] aspect-[2/3] bg-[#0a0a0a] border-4 border-[#d4af37] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.3)]"
        >
          {/* 背景光效 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/10 via-transparent to-[#d4af37]/10 opacity-60 pointer-events-none z-10"></div>
          
          <div className="relative h-full flex flex-col p-5 z-20">
            {/* 頂部文字 K A */}
            <div className="w-full flex justify-between font-cinzel text-3xl font-black leading-none filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-b from-[#f9e498] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent">K</span>
              <span className="bg-gradient-to-b from-[#f9e498] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent">A</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 border-4 border-[#d4af37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)]"></div>
                <div className="absolute inset-1.5 bg-[#050505] rounded-full overflow-hidden flex items-center justify-center border border-[#d4af37]/40 shadow-inner">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" crossOrigin="anonymous" />
                  ) : (
                    <div className="text-[#d4af37] text-4xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">🃏</div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 text-2xl font-bold font-cinzel tracking-tighter filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  Hidden KARD
                </h3>
                <div className="mt-3 inline-block">
                  <p className="text-[#d4af37] text-xl font-black bg-black/80 px-6 py-2 rounded-lg border border-[#d4af37]/40 shadow-[inset_0_0_10px_rgba(212,175,55,0.1),0_5_15px_rgba(0,0,0,0.5)] tracking-wide">
                    {userName || 'HIDDEN'}
                  </p>
                </div>
                <div className="mt-5">
                  <span className="px-4 py-1.5 bg-[#ff0033] text-white rounded-full text-[9px] font-black tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(255,0,51,0.6)] border border-white/20">
                    CERTIFIED JOKER
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full mt-auto">
               <p className="text-[10px] text-[#d4af37]/70 font-cinzel tracking-[0.3em] mb-4 text-center uppercase font-black filter drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                 Member ID: {memberId}
               </p>
               <div className="w-full flex justify-between font-cinzel text-3xl font-black leading-none filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
                  <span className="bg-gradient-to-b from-[#f9e498] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent">R</span>
                  <span className="bg-gradient-to-b from-[#f9e498] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent">D</span>
               </div>
            </div>
          </div>
          
          {/* 菱格紋背景 */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none z-0" 
            style={{
              backgroundColor: '#0a0a0a',
              backgroundImage: `
                linear-gradient(30deg, #d4af37 12%, transparent 12.5%, transparent 87%, #d4af37 87.5%, #d4af37),
                linear-gradient(150deg, #d4af37 12%, transparent 12.5%, transparent 87%, #d4af37 87.5%, #d4af37),
                linear-gradient(30deg, #d4af37 12%, transparent 12.5%, transparent 87%, #d4af37 87.5%, #d4af37),
                linear-gradient(150deg, #d4af37 12%, transparent 12.5%, transparent 87%, #d4af37 87.5%, #d4af37),
                linear-gradient(60deg, #d4af37 25%, transparent 25.5%, transparent 75%, #d4af37 75%, #d4af37),
                linear-gradient(60deg, #d4af37 25%, transparent 25.5%, transparent 75%, #d4af37 75%, #d4af37)
              `,
              backgroundSize: '45px 80px',
              backgroundPosition: '0 0, 0 0, 22.5px 40px, 22.5px 40px, 0 0, 22.5px 40px'
            }}
          ></div>
        </div>
      </div>

      {/* 按鈕組 */}
      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={handleDownload}
          disabled={isCapturing}
          className="w-full bg-white text-black py-4 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl disabled:opacity-50"
        >
          <span>{isCapturing ? '⌛ 生成中' : '💾 下載收藏卡'}</span>
        </button>

        <button 
          onClick={handleShare}
          disabled={isCapturing}
          className="w-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl disabled:opacity-50"
        >
          <span>📱 分享至 Instagram</span>
        </button>
      </div>
    </div>
  );
};

{/* Verification Area - 確保這段在按鈕下方 */}
      <div className="mt-12 bg-[#1a1a1a] p-8 rounded-[2.5rem] border-2 border-[#d4af37]/40 text-center w-full max-w-sm shadow-[0_20px_50px_rgba(212,175,55,0.1)]">
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
        </div>
      </div>
export default RewardScreen;
