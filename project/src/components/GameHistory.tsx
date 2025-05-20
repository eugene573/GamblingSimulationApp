import React from 'react';
import { GameHistoryItem, Game } from '../types';
import { Dice6, Coins, Hash, TrendingUp, TrendingDown } from 'lucide-react';

interface GameHistoryProps {
  history: GameHistoryItem[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const gameIcons: Record<Game, React.ReactNode> = {
    'dice-roll': <Dice6 size={16} />,
    'coin-toss': <Coins size={16} />,
    'number-range': <Hash size={16} />
  };
  
  const gameNames: Record<Game, string> = {
    'dice-roll': 'Dice Roll',
    'coin-toss': 'Coin Toss',
    'number-range': 'Number Range'
  };
  
  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">No game history yet. Start playing to see your results!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-purple-700 text-white">
        <h3 className="font-bold">Game History</h3>
      </div>
      
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-3">Game</th>
              <th className="p-3">Bet</th>
              <th className="p-3">Result</th>
              <th className="p-3">Payout</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="p-3 flex items-center gap-2">
                  <span className="text-purple-600 dark:text-purple-400">{gameIcons[item.game]}</span>
                  {gameNames[item.game]}
                </td>
                <td className="p-3">${item.bet}</td>
                <td className="p-3">
                  <span className={`flex items-center gap-1 
                    ${item.result === 'win' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                    }`}>
                    {item.result === 'win' 
                      ? <TrendingUp size={16} /> 
                      : <TrendingDown size={16} />
                    }
                    {item.result === 'win' ? 'Win' : 'Loss'}
                  </span>
                </td>
                <td className={`p-3 font-medium ${item.result === 'win' ? 'text-green-600 dark:text-green-400' : ''}`}>
                  {item.result === 'win' ? `+$${item.payout}` : '-'}
                </td>
                <td className="p-3 text-gray-500 dark:text-gray-400">
                  {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameHistory;