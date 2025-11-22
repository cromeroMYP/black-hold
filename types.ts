export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export enum AppSection {
  HOME = 'HOME',
  LEARN = 'LEARN',
  CHAT = 'CHAT',
  TRIVIA = 'TRIVIA',
}

export interface BlackHoleData {
  title: string;
  description: string;
  image: string;
}