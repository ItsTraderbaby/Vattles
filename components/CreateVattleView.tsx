import React, { useState } from 'react';
import { VattleConfig } from '../types';

interface CreateVattleViewProps {
  onCreate: (vattleConfig: Omit<VattleConfig, 'id' | 'status' | 'startTime' | 'creatorName'>) => void;
  onClose: () => void;
  isCoach: boolean;
}

const CreateVattleView: React.FC<CreateVattleViewProps> = ({ onCreate, onClose, isCoach }) => {
  const [theme, setTheme] = useState('');
  const [invitedOpponent, setInvitedOpponent] = useState('');
  const [studentName, setStudentName] = useState('');
  const [timeLimit, setTimeLimit] = useState<number>(60);
  const [opponentType, setOpponentType] = useState<'player' | 'ai'>('player');
  const [vattleMode, setVattleMode] = useState<'standard' | 'coaching'>('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) {
      alert("Please provide a theme for the Vattle.");
      return;
    }

    if (vattleMode === 'coaching' && !studentName.trim()) {
      alert("Please provide a student's username.");
      return;
    }

    onCreate({
      theme,
      invitedOpponent: vattleMode === 'coaching' ? studentName : (opponentType === 'ai' ? 'AI Opponent' : invitedOpponent || 'Open Invite'),
      timeLimit,
      opponent: opponentType,
      mode: vattleMode,
      studentName: vattleMode === 'coaching' ? studentName : undefined,
    });
  };

  const inputStyles = "w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500";
  const buttonStyles = "w-full py-3 mt-4 font-orbitron text-lg font-bold rounded-lg transition-all duration-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isCoach && (
        <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Session Type</label>
            <div className="flex gap-4">
                <button type="button" onClick={() => setVattleMode('standard')} className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${vattleMode === 'standard' ? 'bg-purple-600 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50'}`}>
                    Standard Vattle
                </button>
                <button type="button" onClick={() => setVattleMode('coaching')} className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${vattleMode === 'coaching' ? 'bg-blue-600 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50'}`}>
                    Coaching Session
                </button>
            </div>
        </div>
      )}

      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-purple-300 mb-2">{vattleMode === 'coaching' ? 'Session Theme' : 'Vattle Theme'}</label>
        <input type="text" id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="e.g., Retro Arcade Game" className={inputStyles} required />
      </div>
      
      {vattleMode === 'standard' && (
        <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Opponent</label>
            <div className="flex gap-4">
                <button type="button" onClick={() => setOpponentType('player')} className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${opponentType === 'player' ? 'bg-purple-600 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50'}`}>
                    Challenge Player
                </button>
                <button type="button" onClick={() => setOpponentType('ai')} className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${opponentType === 'ai' ? 'bg-purple-600 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50'}`}>
                    Challenge AI
                </button>
            </div>
        </div>
      )}

      {vattleMode === 'standard' && opponentType === 'player' && (
        <div>
          <label htmlFor="opponent" className="block text-sm font-medium text-purple-300 mb-2">Opponent's Username</label>
          <input type="text" id="opponent" value={invitedOpponent} onChange={(e) => setInvitedOpponent(e.target.value)} placeholder="Leave blank for an open challenge" className={inputStyles} />
        </div>
      )}

      {vattleMode === 'coaching' && (
         <div>
          <label htmlFor="student" className="block text-sm font-medium text-purple-300 mb-2">Student's Username</label>
          <input type="text" id="student" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter student's username" className={inputStyles} required/>
        </div>
      )}
      
      <div>
        <label htmlFor="timeLimit" className="block text-sm font-medium text-purple-300 mb-2">Time Limit</label>
        <select id="timeLimit" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} className={inputStyles}>
          <option value={1}>1 Min - 1 Prompt</option>
          <option value={1}>1 Minute</option>
          <option value={5}>5 Minutes</option>
          <option value={15}>15 Minutes</option>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
          <option value={90}>90 minutes</option>
          <option value={120}>120 minutes</option>
        </select>
      </div>
      
      <button type="submit" className={`${buttonStyles} bg-teal-500 text-white shadow-teal-500/30 hover:bg-teal-400 hover:shadow-teal-400/50`}>
        {vattleMode === 'coaching' ? 'Start Coaching Session' : 'Create Vattle'}
      </button>
    </form>
  );
};

export default CreateVattleView;
