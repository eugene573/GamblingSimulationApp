export type Game = 'dice-roll' | 'coin-toss' | 'number-range';

export interface GameHistoryItem {
  game: Game;
  bet: number;
  result: 'win' | 'loss';
  payout: number;
  timestamp: Date;
}

export interface BetResult {
  isWin: boolean;
  payout: number;
  message: string;
}