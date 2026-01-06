
import React from 'react';
import { Suit } from '../types';
import { MEMBER_INFO, COLORS } from '../constants';

interface PokerCardProps {
  suit: Suit;
  rank?: string;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const PokerCard: React.FC<PokerCardProps> = ({ 
  suit, 
  rank = 'K', 
  isFlipped, 
  onClick, 
  className = '',
  children
}) => {
  const info = MEMBER_INFO[suit];
  const color = suit === 'hearts' || suit === 'diamonds' ? COLORS.crimson : '#ffffff';

  return (
    <div 
      className={`card-3d w-32 h-48 cursor-pointer relative ${className}`}
      onClick={onClick}
    >
      <div className={`card-inner w-full h-full relative ${isFlipped ? 'card-flipped' : ''}`}>
        {/* Front Face (Hidden Card Back) */}
        <div className="absolute inset-0 w-full h-full bg-[#1a1a1a] border-2 border-[#d4af37] rounded-xl backface-hidden flex items-center justify-center p-2 shadow-lg">
          <div className="w-full h-full border border-[#d4af37]/30 rounded-lg flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
             <span className="text-3xl font-cinzel text-[#d4af37] font-bold">KARD</span>
             <span className="text-xs text-[#d4af37]/60 mt-2">HIDDEN CARD</span>
          </div>
        </div>

        {/* Back Face (Revealed Card) */}
        <div className="absolute inset-0 w-full h-full bg-white border-2 border-white rounded-xl backface-hidden flex flex-col justify-between p-3 rotate-y-180 shadow-2xl">
          {children ? children : (
            <>
              <div className="flex flex-col items-start" style={{ color }}>
                <span className="text-xl font-bold font-cinzel leading-none">{rank}</span>
                <span className="text-lg leading-none">{info.symbol}</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl" style={{ color }}>{info.symbol}</span>
                <span className="text-[10px] mt-1 text-gray-800 font-bold uppercase tracking-widest">{info.name}</span>
              </div>
              <div className="flex flex-col items-end rotate-180" style={{ color }}>
                <span className="text-xl font-bold font-cinzel leading-none">{rank}</span>
                <span className="text-lg leading-none">{info.symbol}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokerCard;
