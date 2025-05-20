import React from 'react';
import { Dice6, Coins, Hash } from 'lucide-react';
import { Game } from '../types';

interface GameSelectorProps {
  onSelectGame: (game: Game) => void;
  currentGame: Game | null;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onSelectGame, currentGame }) => {
  const games = [
    { id: 'dice-roll' as Game, name: 'Dice Roll', description: 'Roll a die and bet on the outcome', icon: <Dice6 size={32} /> },
    { id: 'coin-toss' as Game, name: 'Coin Toss', description: 'Flip a coin and bet on heads or tails', icon: <Coins size={32} /> },
    { id: 'number-range' as Game, name: 'Number Range', description: 'Pick a number range and test your luck', icon: <Hash size={32} /> }
  ];

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">Select a Game</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {games.map(game => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 
              ${currentGame === game.id 
                ? 'bg-purple-700 text-white shadow-lg scale-105' 
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow hover:shadow-md hover:scale-105'
              }`}
          >
            <div className={`mb-4 ${currentGame === game.id ? 'text-yellow-300' : 'text-purple-600 dark:text-purple-400'}`}>
              {game.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
            <p className="text-sm text-center opacity-80">{game.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelector;