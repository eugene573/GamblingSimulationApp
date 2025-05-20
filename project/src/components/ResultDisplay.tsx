import React, { useEffect } from 'react';
import { BetResult } from '../types';
import { Check, X } from 'lucide-react';

interface ResultDisplayProps {
  result: BetResult | null;
  onClose: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onClose }) => {
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [result, onClose]);
  
  if (!result) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full mx-4 
        ${result.isWin 
          ? 'border-l-8 border-green-500' 
          : 'border-l-8 border-red-500'
        } transform transition-transform duration-300 animate-bounce-in`}>
        <div className="flex items-center mb-4">
          <div className={`rounded-full p-2 mr-4 
            ${result.isWin 
              ? 'bg-green-100 text-green-600' 
              : 'bg-red-100 text-red-600'
            }`}>
            {result.isWin ? <Check size={24} /> : <X size={24} />}
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {result.isWin ? 'You Won!' : 'You Lost'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{result.message}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Payout</span>
            <p className={`font-bold text-xl ${result.isWin ? 'text-green-600' : 'text-red-600'}`}>
              {result.isWin ? `+$${result.payout}` : `$0`}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 py-2 px-4 rounded font-medium transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;