import { useState, useEffect } from 'react';
import { GameHistoryItem, Game, BetResult } from '../types';

const INITIAL_CREDIT = 1000;
const LOCAL_STORAGE_KEY = 'gambling-app-state';

export const useGameState = () => {
  const [credits, setCredits] = useState(INITIAL_CREDIT);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [history, setHistory] = useState<GameHistoryItem[]>([]);
  const [betAmount, setBetAmount] = useState(10);
  
  // Load saved state on initial mount
  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      try {
        const { credits, history } = JSON.parse(savedState);
        setCredits(credits);
        setHistory(history.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);
  
  // Save state when credits or history changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      credits,
      history
    }));
  }, [credits, history]);
  
  const placeBet = (amount: number): boolean => {
    if (amount <= 0) return false;
    if (amount > credits) return false;
    
    setCredits(prev => prev - amount);
    return true;
  };
  
  const recordGame = (game: Game, bet: number, result: BetResult) => {
    const historyItem: GameHistoryItem = {
      game,
      bet,
      result: result.isWin ? 'win' : 'loss',
      payout: result.payout,
      timestamp: new Date()
    };
    
    setHistory(prev => [historyItem, ...prev]);
    setCredits(prev => prev + result.payout);
  };
  
  const resetGame = () => {
    setCredits(INITIAL_CREDIT);
    setHistory([]);
    setBetAmount(10);
  };
  
  return {
    credits,
    currentGame,
    setCurrentGame,
    history,
    betAmount,
    setBetAmount,
    placeBet,
    recordGame,
    resetGame
  };
};