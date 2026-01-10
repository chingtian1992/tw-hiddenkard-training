
export type Suit = 'spades' | 'clubs' | 'hearts' | 'diamonds' | 'hidden';

export interface Song {
  id: number;
  title: string;
  artist: string;
  member: string;
  suit: Suit;
  question: string;
  options: string[];
  correctAnswer: number;
  imageUrl: string;      // 歌曲封面/背景圖
  videoUrl?: string;     // 官方 MV/練習影片
  phoneticUrl?: string;  // 新增：空耳/歌詞輔助影片連結
  chartUrl?: string;     // 應援圖卡圖片連結
  musicUrl?: string;     // 背景試聽音樂連結
  isChallenge: boolean;  // 是否納入應援挑戰題目
}

export interface GameState {
  songsCompleted: number[];
  memoryBeaten: boolean;
  messageSent: boolean;
  userName: string;
  memberId: string;
}

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}
