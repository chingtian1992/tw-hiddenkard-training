
import { Song, Suit } from './types';

export const COLORS = {
  black: '#0a0a0a',
  crimson: '#ff0033',
  gold: '#d4af37',
  charcoal: '#1a1a1a',
};

export const MEMBER_INFO: Record<Suit, { name: string; symbol: string; desc: string }> = {
  spades: { name: 'BM', symbol: '♠', desc: 'King - Power' },
  clubs: { name: 'J.Seph', symbol: '♣', desc: 'Ace - Key' },
  hearts: { name: 'Somin', symbol: '♥', desc: 'Black Joker - Charm' },
  diamonds: { name: 'Jiwoo', symbol: '♦', desc: 'Color Joker - Unique' },
  hidden: { name: 'Hidden', symbol: '🃏', desc: 'Fan - The Hidden Card' },
};

/**
 * 【內容調整中心】
 * 如果要更換影片、圖片或應援題目，請直接修改下方的 SONGS 陣列即可。
 */
export const SONGS: Song[] = [
  {
    id: 1, title: 'Oh NaNa', artist: 'KARD', member: 'BM', suit: 'spades',
    question: '副歌開始時的第一個應援動作是？', options: ['大聲喊 Oh NaNa', '拍手兩次', '喊 BM 名字', '安靜看表演'],
    correctAnswer: 0, 
    imageUrl: 'https://picsum.photos/seed/ohnana/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=yPTcK_S-0tE', // 這裡替換成真實 YouTube
    chartUrl: 'https://picsum.photos/seed/chart1/800/1200',  // 這裡替換成應援圖卡連結
  },
  {
    id: 2, title: 'Don\'t Recall', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: '這首歌最具代表性的哨音部分要跟著做什麼？', options: ['原地跳躍', '左右搖擺', '喊 K.A.R.D', '拿出應援燈揮舞'],
    correctAnswer: 2, 
    imageUrl: 'https://picsum.photos/seed/recall/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=41Zzh-mO0vA',
    chartUrl: 'https://picsum.photos/seed/chart2/800/1200',
  },
  {
    id: 3, title: 'Hola Hola', artist: 'KARD', member: 'Somin', suit: 'hearts',
    question: '副歌 "Hola Hola" 出現時要喊幾次？', options: ['1次', '2次', '3次', '4次'],
    correctAnswer: 1, 
    imageUrl: 'https://picsum.photos/seed/hola/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=fS_O8D82_T8',
    chartUrl: 'https://picsum.photos/seed/chart3/800/1200',
  },
  {
    id: 4, title: 'Bomb Bomb', artist: 'KARD', member: 'Jiwoo', suit: 'diamonds',
    question: '重低音強烈的 Break 時，應援口號是？', options: ['Go KARD!', 'Bomb Bomb!', 'Jump!', 'Hidden KARD!'],
    correctAnswer: 1, 
    imageUrl: 'https://picsum.photos/seed/bomb/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=8mBv_LId-D0',
    chartUrl: 'https://picsum.photos/seed/chart4/800/1200',
  },
  {
    id: 5, title: 'Dumb Litty', artist: 'KARD', member: 'BM', suit: 'spades',
    question: '開頭 BM 的 Rap 部分應援是要喊什麼？', options: ['Get It!', 'Litty!', 'Dumb!', 'Oh Yeah!'],
    correctAnswer: 0, 
    imageUrl: 'https://picsum.photos/seed/dumb/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=2n6f4B4-78A',
  },
  {
    id: 6, title: 'RED MOON', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: '這首歌的應援節奏是？', options: ['快節奏', '慢節奏', '切分音節奏', '無應援'],
    correctAnswer: 2, 
    imageUrl: 'https://picsum.photos/seed/redmoon/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=0hYq52lB1yQ',
  },
  {
    id: 7, title: 'GUNSHOT', artist: 'KARD', member: 'Somin', suit: 'hearts',
    question: '槍聲特效出現時要喊？', options: ['Bang!', 'Kill!', 'Fire!', 'Boom!'],
    correctAnswer: 0, 
    imageUrl: 'https://picsum.photos/seed/gunshot/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=m4GfL0g3x6w',
  },
  {
    id: 8, title: 'Ring The Alarm', artist: 'KARD', member: 'Jiwoo', suit: 'diamonds',
    question: '鬧鐘聲響起時要喊什麼？', options: ['Wake up!', 'Ring it!', 'KARD is back!', 'Now!'],
    correctAnswer: 2, 
    imageUrl: 'https://picsum.photos/seed/alarm/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=6v7CgYmYq-8',
  },
  {
    id: 9, title: 'ICKY', artist: 'KARD', member: 'BM', suit: 'spades',
    question: '副歌黏膩感十足的應援詞是？', options: ['ICKY ICKY!', 'Sticky!', 'Ooh!', 'Yeah!'],
    correctAnswer: 0, 
    imageUrl: 'https://picsum.photos/seed/icky/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=E_yV5k9K5z0',
  },
  {
    id: 10, title: 'Cake', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: '這首歌要大家一起慶祝什麼？', options: ['KARD 生日', 'Hidden KARD 出道', '演唱會成功', '單純好心情'],
    correctAnswer: 1, 
    imageUrl: 'https://picsum.photos/seed/cake/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=Kz698C2OayE',
  },
  {
    id: 11, title: 'Without You', artist: 'KARD', member: 'Somin', suit: 'hearts',
    question: '這首歌抒情段落的應援氣氛是？', options: ['熱血', '溫馨', '悲傷', '無應援'],
    correctAnswer: 1, 
    imageUrl: 'https://picsum.photos/seed/without/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=kYJ0MvLpC0Y',
  },
  {
    id: 12, title: 'Tell My Momma', artist: 'KARD', member: 'Jiwoo', suit: 'diamonds',
    question: '副歌動感節奏時的動作是？', options: ['揮手', '指尖舞蹈', '原地旋轉', '全體大跳'],
    correctAnswer: 0, 
    imageUrl: 'https://picsum.photos/seed/momma/400/600',
    videoUrl: 'https://www.youtube.com/watch?v=mYdO1X_X5z0',
  },
];
