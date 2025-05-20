import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import BettingControls from '../BettingControls';
import { BetResult } from '../../types';

interface DiceRollProps {
  credits: number;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  onPlaceBet: (result: BetResult) => void;
}

const DiceRoll: React.FC<DiceRollProps> = ({ 
  credits, 
  betAmount, 
  setBetAmount, 
  onPlaceBet 
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [rollingDice, setRollingDice] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  
  const diceIcons = [
    <Dice1 size={36} key={1} />,
    <Dice2 size={36} key={2} />,
    <Dice3 size={36} key={3} />,
    <Dice4 size={36} key={4} />,
    <Dice5 size={36} key={5} />,
    <Dice6 size={36} key={6} />
  ];
  
  const rollDice = () => {
    if (selectedNumber === null) return;
    
    setRollingDice(true);
    
    // Animate rolling dice
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      const randomDice = Math.floor(Math.random() * 6) + 1;
      setDiceResult(randomDice);
      
      rollCount++;
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        setRollingDice(false);
        
        // Calculate win/loss
        const isWin = randomDice === selectedNumber;
        const payout = isWin ? betAmount * 5 : 0; // 5x payout for correct guess
        
        onPlaceBet({
          isWin,
          payout,
          message: isWin 
            ? `You correctly guessed ${selectedNumber}!` 
            : `The dice rolled ${randomDice}, you guessed ${selectedNumber}.`
        });
      }
    }, 100);
  };
  
  const handlePlaceBet = () => {
    if (selectedNumber !== null) {
      rollDice();
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Dice Roll</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Select your number:</h3>
        <div className="grid grid-cols-6 gap-2 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map(number => (
            <button
              key={number}
              onClick={() => setSelectedNumber(number)}
              disabled={rollingDice}
              className={`flex justify-center items-center p-3 rounded-lg transition-all
                ${selectedNumber === number 
                  ? 'bg-purple-600 text-white scale-110 shadow-md' 
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                } ${rollingDice ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {diceIcons[number - 1]}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full md:w-auto">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg p-8 flex justify-center items-center">
            {diceResult ? (
              <div className={`text-4xl transition-all duration-300 ${rollingDice ? 'animate-spin' : ''}`}>
                {diceIcons[diceResult - 1]}
              </div>
            ) : (
              <div className="text-gray-400 dark:text-gray-500 text-center">
                <span className="block text-4xl mb-2">?</span>
                <span className="text-sm">Roll the dice</span>
              </div>
            )}
          </div>
          <p className="text-sm text-center mt-2 text-gray-500">
            Correctly guess the dice and win 5x your bet!
          </p>
        </div>
        
        <div className="flex-1 w-full md:w-auto">
          <BettingControls
            credits={credits}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            onPlaceBet={handlePlaceBet}
            disabled={rollingDice || selectedNumber === null}
          />
          {selectedNumber === null && !rollingDice && (
            <p className="text-red-500 text-sm mt-2">Please select a number first</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiceRoll;