import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface BattleTimerProps {
  startTime: number;
  timeLimit: number; // in minutes
}

const BattleTimer: React.FC<BattleTimerProps> = ({ startTime, timeLimit }) => {
  const endTime = startTime + timeLimit * 60 * 1000;
  const [minutes, seconds] = useCountdown(endTime);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  const isExpired = minutes <= 0 && seconds <= 0;

  return (
    <div className={`font-orbitron text-base font-bold tracking-wider ${isExpired ? 'text-red-500 animate-pulse' : 'text-gray-200'}`}>
        {isExpired ? 'Ended' : `${formattedMinutes}:${formattedSeconds}`}
    </div>
  );
};

export default BattleTimer;