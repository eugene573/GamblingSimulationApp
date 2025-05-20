import React, { useState } from 'react';
import { Game, BetResult } from './types';
import { useGameState } from './hooks/useGameState';

// Components
import Header from './components/Header';
import GameSelector from './components/GameSelector';
import DiceRoll from './components/games/DiceRoll';
import CoinToss from './components/games/CoinToss';
import NumberRange from './components/games/NumberRange';
import ResultDisplay from './components/ResultDisplay';
import GameHistory from './components/GameHistory';

function App() {
  const { 
    credits, 
    currentGame, 
    setCurrentGame, 
    history,
    betAmount,
    setBetAmount,
    placeBet,
    recordGame,
    resetGame
  } = useGameState();
  
  const [betResult, setBetResult] = useState<BetResult | null>(null);
  
  const handlePlaceBet = (result: BetResult) => {
    if (currentGame) {
      setBetResult(result);
      recordGame(currentGame, betAmount, result);
    }
  };
  
  const handleGameSelect = (game: Game) => {
    setCurrentGame(game);
    setBetResult(null);
  };
  
  const clearBetResult = () => {
    setBetResult(null);
  };
  
  const renderCurrentGame = () => {
    const props = {
      credits,
      betAmount,
      setBetAmount,
      onPlaceBet: (result: BetResult) => {
        if (placeBet(betAmount)) {
          handlePlaceBet(result);
        }
      }
    };
    
    switch (currentGame) {
      case 'dice-roll':
        return <DiceRoll {...props} />;
      case 'coin-toss':
        return <CoinToss {...props} />;
      case 'number-range':
        return <NumberRange {...props} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Header credits={credits} onReset={resetGame} />
      
      <main className="container mx-auto py-6 px-4">
        <GameSelector onSelectGame={handleGameSelect} currentGame={currentGame} />
        
        <div className="mt-4">
          {currentGame ? (
            <div className="space-y-8">
              {renderCurrentGame()}
              
              <div className="max-w-xl mx-auto">
                <GameHistory history={history} />
              </div>
            </div>
          ) : (
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-xl mx-auto">
              <h3 className="text-xl font-semibold mb-3">Welcome to Casino Royale</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Select a game from above to start playing. You have ${credits} in your account.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Dice Roll</h4>
                  <p>Guess the outcome of a dice roll and win 5x your bet!</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Coin Toss</h4>
                  <p>Call heads or tails and double your money if you're right!</p>
                </div>
                <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Number Range</h4>
                  <p>Pick a range and win 3x your bet if the number falls within it!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <ResultDisplay result={betResult} onClose={clearBetResult} />
      
      <footer className="bg-gray-200 dark:bg-gray-800 py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>This application is for educational purposes only. No real money is involved.</p>
          <p className="mt-1">© {new Date().getFullYear()} Casino Royale Study Edition</p>
        </div>
      </footer>
    </div>
  );
}

export default App;