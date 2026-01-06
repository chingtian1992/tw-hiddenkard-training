
import React, { useState, useEffect } from 'react';
import PokerCard from './PokerCard';
import { Suit } from '../types';

interface MemoryGameProps {
  onBeaten: () => void;
}

const CARDS: Suit[] = ['spades', 'clubs', 'hearts', 'diamonds', 'spades', 'clubs', 'hearts', 'diamonds'];

const MemoryGame: React.FC<MemoryGameProps> = ({ onBeaten }) => {
  const [shuffledCards, setShuffledCards] = useState<{ id: number; suit: Suit }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    const deck = CARDS.map((suit, index) => ({ id: index, suit }));
    setShuffledCards(deck.sort(() => Math.random() - 0.5));
  }, []);

  const handleFlip = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIds.includes(shuffledCards[index].id)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const first = shuffledCards[newFlipped[0]];
      const second = shuffledCards[newFlipped[1]];

      if (first.suit === second.suit) {
        setMatchedIds(prev => [...prev, first.id, second.id]);
        setFlippedIndices([]);
        if (matchedIds.length + 2 === shuffledCards.length) {
          setIsWon(true);
          onBeaten();
        }
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-cinzel text-[#d4af37] text-center mb-4">成員花色配對</h2>
      <p className="text-gray-400 text-sm mb-6 text-center">找出所有成對的成員符號以解鎖進度</p>
      
      <div className="grid grid-cols-4 gap-3">
        {shuffledCards.map((card, idx) => (
          <PokerCard
            key={idx}
            suit={card.suit}
            isFlipped={flippedIndices.includes(idx) || matchedIds.includes(card.id)}
            onClick={() => handleFlip(idx)}
            className="w-16 h-24 sm:w-20 sm:h-32"
          />
        ))}
      </div>

      {isWon && (
        <div className="mt-8 p-4 bg-green-900/30 border border-green-500 rounded-xl animate-bounce">
          <span className="text-green-400 font-bold">✓ 配對成功！集牌進度提升</span>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
