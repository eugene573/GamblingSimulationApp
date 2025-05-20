import React, { useState } from 'react';
import BettingControls from '../BettingControls';
import { BetResult } from '../../types';

interface NumberRangeProps {
  credits: number;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  onPlaceBet: (result: BetResult) => void;
}

const NumberRange: React.FC<NumberRangeProps> = ({ 
  credits, 
  betAmount, 
  setBetAmount, 
  onPlaceBet 
}) => {
  const [selectedRange, setSelectedRange] = useState<'low' | 'medium' | 'high' | null>(null);
  const [rolling, setRolling] = useState(false);
  const [numberResult, setNumberResult] = useState<number | null>(null);
  
  const ranges = [
    { id: 'low' as const, label: 'Low (1-33)', range: [1, 33], multiplier: 3 },
    { id: 'medium' as const, label: 'Medium (34-66)', range: [34, 66], multiplier: 3 },
    { id: 'high' as const, label: 'High (67-100)', range: [67, 100], multiplier: 3 }
  ];
  
  const rollNumber = () => {
    if (selectedRange === null) return;
    
    setRolling(true);
    
    // Animate rolling number
    let rollCount = 0;
    const maxRolls = 15;
    const rollInterval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      setNumberResult(randomNumber);
      
      rollCount++;
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        
        // Final result
        const finalNumber = Math.floor(Math.random() * 100) + 1;
        setNumberResult(finalNumber);
        setRolling(false);
        
        // Get the selected range data
        const rangeData = ranges.find(r => r.id === selectedRange)!;
        
        // Check if number is in the selected range
        const inRange = finalNumber >= rangeData.range[0] && finalNumber <= rangeData.range[1];
        const payout = inRange ? betAmount * rangeData.multiplier : 0;
        
        onPlaceBet({
          isWin: inRange,
          payout,
          message: inRange 
            ? `${finalNumber} is in the ${selectedRange} range!` 
            : `${finalNumber} is not in the ${selectedRange} range.`
        });
      }
    }, 100);
  };
  
  const handlePlaceBet = () => {
    if (selectedRange !== null) {
      rollNumber();
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Number Range</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Choose a range:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ranges.map(range => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              disabled={rolling}
              className={`py-4 px-4 rounded-xl transition-all
                ${selectedRange === range.id 
                  ? 'bg-purple-600 text-white scale-105 shadow-md' 
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                } ${rolling ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex flex-col items-center">
                <span className="font-medium mb-1">{range.label}</span>
                <span className="text-xs opacity-75">
                  Win {range.multiplier}x your bet
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full md:w-auto">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg p-8 flex justify-center items-center min-h-[160px]">
            {numberResult !== null ? (
              <div className={`text-5xl font-bold transition-all duration-300 ${rolling ? 'animate-pulse' : ''}`}>
                {numberResult}
              </div>
            ) : (
              <div className="text-gray-400 dark:text-gray-500 text-center">
                <span className="block text-4xl mb-2">?</span>
                <span className="text-sm">Roll the number</span>
              </div>
            )}
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="flex">
              <div className="bg-blue-500 h-2 w-1/3"></div>
              <div className="bg-purple-500 h-2 w-1/3"></div>
              <div className="bg-pink-500 h-2 w-1/3"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="flex-1 w-full md:w-auto">
          <BettingControls
            credits={credits}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            onPlaceBet={handlePlaceBet}
            disabled={rolling || selectedRange === null}
          />
          {selectedRange === null && !rolling && (
            <p className="text-red-500 text-sm mt-2">Please select a range first</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberRange;