import React, { useState } from 'react';
import BettingControls from '../BettingControls';
import { BetResult } from '../../types';

interface CoinTossProps {
  credits: number;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  onPlaceBet: (result: BetResult) => void;
}

const CoinToss: React.FC<CoinTossProps> = ({ 
  credits, 
  betAmount, 
  setBetAmount, 
  onPlaceBet 
}) => {
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails' | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [coinSide, setCoinSide] = useState<'heads' | 'tails' | null>(null);
  
  const flipCoin = () => {
    if (selectedSide === null) return;
    
    setFlipping(true);
    
    // Animate flipping coin
    let flipCount = 0;
    const maxFlips = 10;
    const flipInterval = setInterval(() => {
      setCoinSide(prev => prev === 'heads' ? 'tails' : 'heads');
      
      flipCount++;
      if (flipCount >= maxFlips) {
        clearInterval(flipInterval);
        
        // Final result
        const finalSide = Math.random() > 0.5 ? 'heads' : 'tails';
        setCoinSide(finalSide);
        setFlipping(false);
        
        // Calculate win/loss
        const isWin = finalSide === selectedSide;
        const payout = isWin ? betAmount * 2 : 0; // 2x payout for correct guess
        
        onPlaceBet({
          isWin,
          payout,
          message: isWin 
            ? `You correctly guessed ${finalSide}!` 
            : `The coin landed on ${finalSide}, you guessed ${selectedSide}.`
        });
      }
    }, 100);
  };
  
  const handlePlaceBet = () => {
    if (selectedSide !== null) {
      flipCoin();
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Coin Toss</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Choose a side:</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'heads' as const, label: 'Heads' },
            { id: 'tails' as const, label: 'Tails' }
          ].map(side => (
            <button
              key={side.id}
              onClick={() => setSelectedSide(side.id)}
              disabled={flipping}
              className={`py-6 px-4 rounded-xl transition-all
                ${selectedSide === side.id 
                  ? 'bg-purple-600 text-white scale-105 shadow-md' 
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                } ${flipping ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 mb-3 flex items-center justify-center shadow-md">
                  <span className="text-yellow-900 font-bold">
                    {side.id === 'heads' ? 'H' : 'T'}
                  </span>
                </div>
                <span className="font-medium">{side.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full md:w-auto">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg p-8 flex justify-center items-center">
            {coinSide ? (
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-md transition-all duration-300 ${flipping ? 'animate-flip' : ''}`}>
                <span className="text-yellow-900 font-bold text-2xl">
                  {coinSide === 'heads' ? 'H' : 'T'}
                </span>
              </div>
            ) : (
              <div className="text-gray-400 dark:text-gray-500 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-2">
                  <span className="text-2xl">?</span>
                </div>
                <span className="text-sm">Flip the coin</span>
              </div>
            )}
          </div>
          <p className="text-sm text-center mt-2 text-gray-500">
            Correctly guess the coin toss and win 2x your bet!
          </p>
        </div>
        
        <div className="flex-1 w-full md:w-auto">
          <BettingControls
            credits={credits}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            onPlaceBet={handlePlaceBet}
            disabled={flipping || selectedSide === null}
          />
          {selectedSide === null && !flipping && (
            <p className="text-red-500 text-sm mt-2">Please select heads or tails first</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinToss;