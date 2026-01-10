import { Song, Suit } from './types.ts';

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

export const SONGS: Song[] = [
  {
    id: 1, title: 'Oh NaNa', artist: 'KARD', member: 'BM', suit: 'spades',
    question: '副歌開始時的第一個應援動作是？', options: ['大聲喊 Oh NaNa', '拍手兩次', '喊 BM 名字', '安靜看表演'],
    correctAnswer: 0, isChallenge: true,
    imageUrl: 'https://m.media-amazon.com/images/I/61tewdt1daL._UXNaN_FMjpg_QL85_.jpg',
    videoUrl: 'https://youtu.be/yPTcKSVAEvA?si=j112PL4A46u0HjEy',
    chartUrl: 'https://i.imgur.com',
  },
  {
    id: 2, title: 'Don\'t Recall', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: '', options: [], correctAnswer: 0, isChallenge: false,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFfb3D1T16n8_r2aPee6Xtr6boYu_ZBSuTw&s',
    videoUrl: 'https://youtu.be/41Dp7Q-SM1Y?si=9roXE_yXSRiCTGos',
  },
  {
    id: 102, title: 'RUMOR', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: '', options: [], correctAnswer: 0, isChallenge: false,
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music127/v4/34/af/cc/34afcca4-914a-9880-4fec-74aa7d36a26d/cover-K.A.R.D_DS.jpg/1200x630bb.jpg',
    videoUrl: 'https://youtu.be/8LPjJ1p4dYs?si=gzmDoiDKgqsmNwCn',
  },
  {
    id: 3, title: 'Hola Hola', artist: 'KARD', member: 'Somin', suit: 'hearts',
    question: '副歌 "Hola Hola" 出現時要喊幾次？', options: ['1次', '2次', '3次', '4次'],
    correctAnswer: 1, isChallenge: true,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/zh/7/7d/KARD_-_Hola_Hola_%28EP%29.png',
    videoUrl: 'https://youtu.be/USx4WyrkfU4?si=3gatR7i-ok1U1Ozp',
  },
  {
    id: 13, title: 'You In Me', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: '這首歌曲的最後段落要依序喊出什麼？', options: ['L / O / V / E', 'D / S / P / ya', 'K / A / R / D', '0 / 7 / 1 / 9'],
    correctAnswer: 2, isChallenge: true,
    imageUrl: 'https://i.kfs.io/album/global/30370735,0v1/fit/500x500.jpg',
    videoUrl: 'https://youtu.be/tz23WFb8HM0?si=LjYlAL4D5aaFvSPL',
  },
  {
    id: 101, title: 'Ride on the wind', artist: 'KARD', member: 'BM', suit: 'spades',
    question: 'Jiwoo 的 Rap 部分，一開始應援是要喊什麼？？', options: ['Pull up!', 'JIWOO!', 'K.A.R.D', 'wo~'],
    correctAnswer: 0, isChallenge: true,
    imageUrl: 'https://m.media-amazon.com/images/I/51jPe9NEdbL._AC_UF894,1000_QL80_.jpg',
    videoUrl: 'https://youtu.be/6AZ3BAydZqI?si=1cYLav8ESm90mpKW',
  },
  {
    id: 4, title: 'Bomb Bomb', artist: 'KARD', member: 'Jiwoo', suit: 'diamonds',
    question: '重低音強烈的 Break 時，應援口號是？', options: ['Go KARD!', 'Bomb Bomb!', 'Jump!', 'Hidden KARD!'],
    correctAnswer: 1, isChallenge: true,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhPyhfas7KgGer_GvgA_indBCGcJaDqJKmw&s$0/400/600',
    videoUrl: 'https://youtu.be/TW8zWq-bWAU?si=4-IE2-dIDPocpnN2',
  },
  {
    id: 5, title: 'Dumb Litty', artist: 'KARD', member: 'BM', suit: 'spades',
    question: '開頭 BM 的 Rap 部分應援是要喊什麼？', options: ['Get It!', 'Litty!', 'Dumb!', 'Oh Yeah!'],
    correctAnswer: 0, isChallenge: true,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/01/KARD%27s_Dumb_Litty_2nd_Digital_Single_Cover.jpg',
    videoUrl: 'https://youtu.be/W01_e6hw288?si=l0YEeB3sh6TOTZ9s',
  },
  {
    id: 6, title: 'RED MOON', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: 'Oh run baby run Oh run baby run 這句歌詞後，要跟著？', options: ['原地跑步', '左右晃動', '大聲唱 On and on and on and on', '安靜看表演'],
    correctAnswer: 2, isChallenge: true,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTNYI1tHuWR9hurWHD9_rPS5ue0ceW5P0L1Q&s',
    videoUrl: 'https://youtu.be/aAmKkZo9A7M?si=XnuH49txDyXMe-gG',
  },
  {
    id: 7, title: 'GUNSHOT', artist: 'KARD', member: 'Somin', suit: 'hearts',
    question: '歌曲前奏時要喊？', options: ['尖叫', '김매紋!김태형!전소민!전지우!', '내마음을!저격한!K.A.R.D（把我的心狙擊的KARD)', '以上皆是'],
    correctAnswer: 3, isChallenge: true,
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2731fa689610fdceeb2060840ef',
    videoUrl: 'https://youtu.be/eD0peafO7Pw?si=7tDOeDmyn5HcvQdJ',
  },
  {
    id: 8, title: 'Ring The Alarm', artist: 'KARD', member: 'Jiwoo', suit: 'diamonds',
    question: '開頭的鈴響起時，要喊什麼？', options: ['Wake up!', 'Ring it!', '매紋!태형!소민!지우!K.A.R.D!', 'Now!'],
    correctAnswer: 2, isChallenge: true,
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b27394485b7db792dd0512adf258',
    videoUrl: 'https://youtu.be/Zo0zu0lgzIk?si=gaYgMjaI0qWfqi1e',
  },
  {
    id: 9, title: 'ICKY', artist: 'KARD', member: 'BM', suit: 'spades',
    question: '副歌黏膩感十足的應援詞是？', options: ['ICKY ICKY ICKY!(ay ay ay)', 'Sticky!', 'Ooh!', 'Yeah!'],
    correctAnswer: 0, isChallenge: true,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgAd_AVO1uGwvmygaWRjrE-ZBz-hpiezMmcA&s',
    videoUrl: 'https://youtu.be/L-i-_XSIgWQ?si=PRydR9988eER7pxB',
  },
  {
    id: 10, title: 'Cake', artist: 'KARD', member: 'J.Seph', suit: 'clubs',
    question: '', options: [], correctAnswer: 0, isChallenge: false,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgAd_AVO1uGwvmygaWRjrE-ZBz-hpiezMmcA&s',
    videoUrl: 'https://youtu.be/uho3n38lq7o?si=znaQITfupCti8hau',
  },
  {
    id: 11, title: 'Tell My Momma', artist: 'KARD', member: 'Jiwoo', suit: 'diamonds',
    question: "Cause I'm ready to dive in?", options: ['K!A!R!D!', 'My Momma', 'True', 'Hidden KARD'],
    correctAnswer: 0, isChallenge: true,
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273735a45653bf69f7f50843a44',
    videoUrl: 'https://youtu.be/7UciiiKGGYA?si=83m-L172_YV1GzbP',
    musicUrl: 'https://chingtian1992.github.io/exam-audio/Tell My Momma cut.mp3',
    phoneticUrl: '', // 預留位置，等之後放上 TY 連結
  },
  {
    id: 12, title: 'Touch', artist: 'KARD', member: 'Somin', suit: 'hearts',
    question: '副歌需要一起唱的部分？', options: ['One', 'One touch One touch', 'oh, na-na-na-na', '無應援'],
    correctAnswer: 1, isChallenge: true,
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b27311743685504d9a75ffeabf36',
    videoUrl: 'https://youtu.be/i3gaErmAQCk?si=mVYygDYPQem4k65p',
  },
  {
    id: 103, title: 'Before We Go', artist: 'KARD', member: 'Somin', suit: 'hearts',
    question: '', options: [], correctAnswer: 0, isChallenge: false,
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b27311743685504d9a75ffeabf36',
    videoUrl: 'https://youtu.be/8G-fNVBPrH0?si=OkccziCOXoaSEfWV',
  }
];
