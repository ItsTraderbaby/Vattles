
import React, { useState, useEffect } from 'react';
import { VattleConfig, UserProfile } from '../types';
import { TrophyIcon, BookOpenIcon, SparklesIcon, SignalIcon, FlameIcon, SwordsIcon } from './icons';
import BattleTimer from './BattleTimer';
import Modal from './Modal';

interface VattleArenaProps {
  userProfile: UserProfile;
  vattles: VattleConfig[];
  onEnterBattle: (vattle: VattleConfig) => void;
  onViewVattle: (vattle: VattleConfig) => void;
  onJoinVattle: (vattle: VattleConfig) => void;
}

const getRecommendedVattles = (userProfile: UserProfile, allVattles: VattleConfig[]): VattleConfig[] => {
    // 1. Analyze user's winning vibes from portfolio
    const winningThemes = userProfile.portfolio
        .filter(p => p.result === 'win')
        .map(p => p.theme.toLowerCase());
    const winningVibeCounts = winningThemes.reduce((acc, theme) => {
        const keywords = theme.split(' ');
        keywords.forEach(kw => {
            if (kw.length > 3) {
                acc[kw] = (acc[kw] || 0) + 1;
            }
        });
        return acc;
    }, {} as Record<string, number>);

    // 2. Get past opponents
    const pastOpponents = new Set(userProfile.portfolio.map(p => p.opponentName));

    const scoreVattle = (vattle: VattleConfig): number => {
        let score = 0;
        const vattleTheme = vattle.theme.toLowerCase();
        
        // Criterion 1: Winning Vibe Match (Weight: 5 per win in this vibe)
        Object.keys(winningVibeCounts).forEach(vibe => {
            if (vattleTheme.includes(vibe)) {
                score += 5 * winningVibeCounts[vibe];
            }
        });

        // Criterion 3: Past Opponent Match (Weight: 10)
        if (pastOpponents.has(vattle.creatorName) || pastOpponents.has(vattle.invitedOpponent)) {
            score += 10;
        }

        // Criterion 4: Randomness for discovery
        score += Math.random() * 5;

        // Bonus for open challenges
        if (vattle.status === 'pending') {
            score += 8;
        }

        return score;
    };

    const relevantVattles = allVattles.filter(v => 
        v.creatorName !== userProfile.name && v.invitedOpponent !== userProfile.name && v.studentName !== userProfile.name
    );

    const scoredVattles = relevantVattles.map(vattle => ({
        vattle,
        score: scoreVattle(vattle)
    })).sort((a, b) => b.score - a.score);

    return scoredVattles.map(item => item.vattle);
};

const SpotlightVattleCard: React.FC<{ vattle: VattleConfig; onEnter: () => void; }> = ({ vattle, onEnter }) => {
    return (
        <div 
            className="relative flex-shrink-0 w-[380px] h-[240px] rounded-xl overflow-hidden group border-2 border-purple-500/50 shadow-2xl shadow-purple-900/40 transform transition-all duration-300 hover:scale-105"
            role="button"
            tabIndex={0}
            onClick={onEnter}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onEnter()}
            aria-label={`Enter featured vattle: ${vattle.theme}`}
        >
            <img src={`https://picsum.photos/seed/${vattle.id}/400/260`} alt={vattle.theme} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            
            <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Featured
            </div>

            <div className="relative h-full flex flex-col justify-end p-5 text-white">
                <h3 className="font-orbitron text-2xl font-bold">{vattle.theme}</h3>
                <p className="text-sm text-gray-300">{vattle.creatorName} vs. {vattle.invitedOpponent}</p>
                <div className="mt-3 flex justify-between items-center">
                    {vattle.startTime && <BattleTimer startTime={vattle.startTime} timeLimit={vattle.timeLimit} />}
                    <span className="text-sm font-semibold bg-red-600/80 px-3 py-1 rounded-full">Enter Arena</span>
                </div>
            </div>
        </div>
    );
};


const VattleCard: React.FC<{ vattle: VattleConfig; onEnter: () => void; onView: () => void; onJoin: () => void; isCreator: boolean; }> = ({ vattle, onEnter, onView, onJoin, isCreator }) => {
    const getStatusInfo = () => {
        switch (vattle.status) {
            case 'pending': return { text: 'Waiting', color: 'bg-gray-500/20 text-gray-300 border-gray-500/50' };
            case 'active': return { text: 'Live', color: 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse' };
            case 'voting': return { text: 'Voting', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' };
            case 'completed': return { text: 'Completed', color: 'bg-purple-500/20 text-purple-300 border-purple-500/50' };
        }
    };

    const statusInfo = getStatusInfo();
    const isCoaching = vattle.mode === 'coaching';

    return (
        <div className={`relative bg-gray-900/50 rounded-xl border ${isCoaching ? 'border-blue-500/50 hover:border-blue-400/50' : 'border-gray-700/50 hover:border-purple-500/50'} p-6 flex flex-col gap-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isCoaching ? 'hover:shadow-blue-900/40' : 'hover:shadow-purple-900/40'}`}>
            {vattle.isRivalryMatch && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border-2 border-red-400">
                    <SwordsIcon className="h-3 w-3" />
                    Rivalry Match
                </div>
            )}
             <div className="absolute top-2 right-2 flex items-center gap-2">
                {vattle.isTrending && (
                    <div className="p-1.5 bg-orange-500/20 rounded-full border border-orange-500/50" title="Trending Vattle">
                        <FlameIcon className="h-4 w-4 text-orange-400" />
                    </div>
                )}
            </div>
            
            <div className="flex justify-between items-start mt-2">
                <div>
                    <h3 className="font-orbitron text-xl font-bold text-white">{vattle.theme}</h3>
                    {isCoaching ? (
                         <p className="text-sm text-gray-400">
                           <span className="font-semibold text-blue-300">Coach:</span> {vattle.creatorName} | <span className="font-semibold text-blue-300">Student:</span> {vattle.studentName}
                         </p>
                    ) : vattle.status === 'pending' ? (
                        <p className="text-sm text-gray-400">{vattle.creatorName} vs. <span className="text-yellow-400 animate-pulse">Waiting for opponent...</span></p>
                    ) : (
                        <p className="text-sm text-gray-400">{vattle.creatorName} vs. {vattle.invitedOpponent}</p>
                    )}
                </div>
                <div className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${statusInfo.color}`}>
                    {statusInfo.text}
                </div>
            </div>

            <div className="flex-grow"></div>
            
            <div className="flex items-center justify-between text-sm text-gray-300 border-t border-gray-700/50 pt-4 mt-2">
                <div className="flex items-center gap-2">
                    {isCoaching ? <BookOpenIcon className="h-5 w-5 text-blue-300" aria-hidden="true"/> : <TrophyIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>}
                    <span>Time Limit: {vattle.timeLimit} mins</span>
                </div>
                {vattle.status === 'active' && vattle.startTime ? (
                    <BattleTimer startTime={vattle.startTime} timeLimit={vattle.timeLimit} />
                ) : vattle.status === 'pending' ? (
                     <span className="text-gray-400 font-orbitron text-base font-bold tracking-wider">Not Started</span>
                ) : null}
            </div>

            {vattle.status === 'pending' && <button onClick={onJoin} disabled={isCreator} className="w-full py-2 font-semibold rounded-lg transition-all bg-teal-600/80 hover:bg-teal-600 text-white disabled:bg-gray-700/80 disabled:cursor-not-allowed disabled:text-gray-400">Join Battle</button>}
            {vattle.status === 'active' && <button onClick={onEnter} className="w-full py-2 font-semibold rounded-lg transition-all bg-red-600/80 hover:bg-red-600 text-white">Enter Arena</button>}
            {vattle.status === 'voting' && <button onClick={onView} className="w-full py-2 font-semibold rounded-lg transition-all bg-yellow-500/80 hover:bg-yellow-500 text-black">Vote Now</button>}
            {vattle.status === 'completed' && <button onClick={onView} className={`w-full py-2 font-semibold rounded-lg transition-all ${isCoaching ? 'bg-blue-600/80 hover:bg-blue-600' : 'bg-purple-600/80 hover:bg-purple-600'} text-white`}>{isCoaching ? 'View Review' : 'View VOD'}</button>}
        </div>
    );
};


const VattleArena: React.FC<VattleArenaProps> = ({ userProfile, vattles, onEnterBattle, onViewVattle, onJoinVattle }) => {
    const [vattleToJoin, setVattleToJoin] = useState<VattleConfig | null>(null);
    const winRate = userProfile.stats.vattlesPlayed > 0 ? ((userProfile.stats.wins / userProfile.stats.vattlesPlayed) * 100).toFixed(0) : 0;
    
    const [activeTab, setActiveTab] = useState<'foryou' | 'live'>('foryou');

    const featuredVattles = vattles.filter(v => v.isFeatured && v.status === 'active');

    // For You section - showcase vattles
    const forYouVattles = vattles.filter(v => v.id.startsWith('vattle-foryou'));

    // Live & Recent section - showcase vattles
    const liveAndRecentVattles = vattles.filter(v => v.id.startsWith('vattle-live'));

    const [recommendedVattles, setRecommendedVattles] = useState<VattleConfig[]>([]);
    const [lastRecTimestamp, setLastRecTimestamp] = useState(0);

    useEffect(() => {
        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
        const now = Date.now();
        if (activeTab === 'foryou' && (recommendedVattles.length === 0 || now - lastRecTimestamp > CACHE_DURATION)) {
            const recommendations = getRecommendedVattles(userProfile, forYouVattles);
            setRecommendedVattles(recommendations);
            setLastRecTimestamp(now);
        }
    }, [activeTab, userProfile, forYouVattles, lastRecTimestamp, recommendedVattles.length]);

    const displayedVattles = activeTab === 'foryou' ? forYouVattles : liveAndRecentVattles;


    return (
        <div className="animate-fade-in">
            <section className="mb-10 p-6 bg-black/20 rounded-lg border border-gray-700/50 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="font-orbitron text-2xl font-bold text-white">Welcome back, {userProfile.name}!</h2>
                    <p className="text-purple-300">Ready to vibe?</p>
                </div>
                <div className="flex gap-8 text-center">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Wins</p>
                        <p className="text-2xl font-bold font-orbitron text-white">{userProfile.stats.wins}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Win Rate</p>
                        <p className="text-2xl font-bold font-orbitron text-white">{winRate}%</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Vattles</p>
                        <p className="text-2xl font-bold font-orbitron text-white">{userProfile.stats.vattlesPlayed}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Lessons Given</p>
                        <p className="text-2xl font-bold font-orbitron text-white">{userProfile.stats.lessonsGiven || 0}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Classes Taken</p>
                        <p className="text-2xl font-bold font-orbitron text-white">{userProfile.stats.classesTaken || 0}</p>
                    </div>
                </div>
            </section>
            
            {featuredVattles.length > 0 && (
                <section className="mb-12">
                    <h2 className="font-orbitron text-3xl font-bold text-white mb-4">Spotlight</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4c1d95 #1f2937' }}>
                        {featuredVattles.map(vattle => (
                            <SpotlightVattleCard key={vattle.id} vattle={vattle} onEnter={() => onEnterBattle(vattle)} />
                        ))}
                    </div>
                </section>
            )}

         <section>
  {/* Tabs */}
  <div
    role="tablist"
    aria-label="Vattle feeds"
    className="flex border-b border-gray-700 mb-6"
  >
    {([
      { key: 'foryou' as const, label: 'For You', Icon: SparklesIcon },
      { key: 'live' as const, label: 'Live & Recent', Icon: SignalIcon },
    ]).map(({ key, label, Icon }) => {
      const isActive = activeTab === key;
      return (
        <button
          key={key}
          role="tab"
          id={`tab-${key}`}
          aria-controls={`panel-${key}`}
          aria-selected={isActive}
          tabIndex={isActive ? 0 : -1}
          onClick={() => setActiveTab(key)}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
            isActive
              ? 'text-purple-300 border-purple-400'
              : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          {label}
        </button>
      );
    })}
  </div>

  {/* Panels */}
  {/* For You */}
  <div
    role="tabpanel"
    id="panel-foryou"
    aria-labelledby="tab-foryou"
    hidden={activeTab !== 'foryou'}
  >
    <h3 className="sr-only">For You</h3>

    {(activeTab === 'foryou' && displayedVattles.length > 0) ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedVattles.map((vattle) => (
          <VattleCard
            key={vattle.id}
            vattle={vattle}
            onEnter={() => onEnterBattle(vattle)}
            onView={() => onViewVattle(vattle)}
            onJoin={() => setVattleToJoin(vattle)}
            isCreator={userProfile.name === vattle.creatorName}
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-16 bg-black/10 rounded-lg border border-dashed border-gray-700">
        <SparklesIcon className="h-12 w-12 mx-auto text-gray-600" aria-hidden="true" />
        <p className="mt-4 font-semibold text-gray-400">No Recommendations Yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Play some Vattles to build your profile!
        </p>
      </div>
    )}
  </div>

  {/* Live & Recent */}
  <div
    role="tabpanel"
    id="panel-live"
    aria-labelledby="tab-live"
    hidden={activeTab !== 'live'}
  >
    <h3 className="sr-only">Live Vattles & Sessions</h3>

    {(activeTab === 'live' && displayedVattles.length > 0) ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedVattles.map((vattle) => (
          <VattleCard
            key={vattle.id}
            vattle={vattle}
            onEnter={() => onEnterBattle(vattle)}
            onView={() => onViewVattle(vattle)}
            onJoin={() => setVattleToJoin(vattle)}
            isCreator={userProfile.name === vattle.creatorName}
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-16 bg-black/10 rounded-lg border border-dashed border-gray-700">
        <SignalIcon className="h-12 w-12 mx-auto text-gray-600" aria-hidden="true" />
        <p className="mt-4 font-semibold text-gray-400">No Vattles Available</p>
        <p className="text-sm text-gray-500 mt-1">Why not create one?</p>
      </div>
    )}
  </div>
</section>


             <Modal
                isOpen={!!vattleToJoin}
                onClose={() => setVattleToJoin(null)}
                title="Join Vattle"
            >
                <div>
                    <p className="text-gray-300 mb-6 text-center">
                        You are about to enter the Vattle: <strong className="text-white">{vattleToJoin?.theme}</strong>. The clock will start immediately. Are you ready?
                    </p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setVattleToJoin(null)}
                            className="w-full py-2 font-semibold rounded-lg transition-all bg-gray-700/80 hover:bg-gray-700 text-white"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                if (vattleToJoin) {
                                    onJoinVattle(vattleToJoin);
                                }
                                setVattleToJoin(null);
                            }}
                            className="w-full py-2 font-semibold rounded-lg transition-all bg-teal-600/80 hover:bg-teal-600 text-white"
                        >
                            Join Now
                        </button>
                    </div>
                </div>
            </Modal>
             <style>{`
                .overflow-x-auto::-webkit-scrollbar {
                    height: 8px;
                }
                .overflow-x-auto::-webkit-scrollbar-track {
                    background: #1f2937;
                    border-radius: 10px;
                }
                .overflow-x-auto::-webkit-scrollbar-thumb {
                    background: #4c1d95;
                    border-radius: 10px;
                }
                .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                    background: #5b21b6;
                }
             `}</style>
        </div>
    );
};

export default VattleArena;
