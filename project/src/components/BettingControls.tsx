import React from 'react';
import { Minus, Plus, CreditCard } from 'lucide-react';

interface BettingControlsProps {
  credits: number;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  onPlaceBet: () => void;
  disabled?: boolean;
}

const BettingControls: React.FC<BettingControlsProps> = ({ 
  credits, 
  betAmount, 
  setBetAmount, 
  onPlaceBet,
  disabled = false
}) => {
  const presetAmounts = [10, 50, 100, 500];

  const increaseBet = () => {
    if (betAmount < credits) {
      setBetAmount(Math.min(credits, betAmount + 10));
    }
  };

  const decreaseBet = () => {
    if (betAmount > 10) {
      setBetAmount(betAmount - 10);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-medium">Your Bet:</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={decreaseBet}
              disabled={betAmount <= 10 || disabled}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full p-1 transition-colors disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            
            <span className="font-bold text-lg min-w-16 text-center">${betAmount}</span>
            
            <button 
              onClick={increaseBet}
              disabled={betAmount >= credits || disabled}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full p-1 transition-colors disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {presetAmounts.map(amount => (
            <button
              key={amount}
              onClick={() => setBetAmount(Math.min(amount, credits))}
              disabled={amount > credits || disabled}
              className={`py-1 px-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm
                ${betAmount === amount ? 'ring-2 ring-purple-500 font-bold' : ''}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              ${amount}
            </button>
          ))}
        </div>
        
        <button
          onClick={onPlaceBet}
          disabled={credits < betAmount || betAmount <= 0 || disabled}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard size={18} />
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default BettingControls;