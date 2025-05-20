import React from 'react';
import { DollarSign, RotateCcw } from 'lucide-react';

interface HeaderProps {
  credits: number;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ credits, onReset }) => {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Casino Royale</h1>
          <span className="text-xs bg-purple-500 px-2 py-1 rounded-full">Study Edition</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-purple-800 px-4 py-2 rounded-full">
            <DollarSign size={20} className="text-yellow-400 mr-2" />
            <span className="font-bold text-yellow-400">{credits.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={onReset}
            className="bg-purple-600 hover:bg-purple-500 transition-colors p-2 rounded-full"
            title="Reset Credits"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;