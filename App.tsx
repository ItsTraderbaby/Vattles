import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { UserProfile, VattleConfig, Ratings, Tournament, ShowcaseItem, PortfolioItem, Achievement, Endorsement, Rivalry, PromptLibraryItem } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

// Views
import AuthView from './components/AuthView';
import VattleArena from './components/VattleArena';
import BattleRoom from './components/BattleRoom';
import VotingView from './components/VotingView';
import ProfileView from './components/ProfileView';
import RankingsView from './components/RankingsView';
import TournamentsView from './components/TournamentsView';
import TournamentDetailView from './components/TournamentDetailView';
import VibeLabsView from './components/VibeLabsView';
import ApiView from './components/ApiView';
import StreamingView from './components/StreamingView';
import OnboardingView from './components/OnboardingView';

// Components
import Header from './components/Header';
import CreateVattleModal from './components/CreateVattleModal';
import ProfileModal from './components/ProfileModal';

const mockPortfolio: PortfolioItem[] = [
    { vattleId: 'vattle-3', title: 'Galactic Glider', theme: 'Vaporwave Space', date: '2023-10-22', opponentName: 'CodeNinja', result: 'win' },
    { vattleId: 'vattle-4', title: 'Retro Runner', theme: '8-bit Arcade', date: '2023-10-15', opponentName: 'PixelPusher', result: 'loss' },
];

const mockShowcase: ShowcaseItem[] = [
    { vattleId: 'vattle-3', title: 'Galactic Glider', theme: 'Vaporwave Space', imageUrl: 'https://picsum.photos/seed/glider/500/350' },
];

const mockAchievements: Achievement[] = [
    { id: 'ach-1', name: 'First Win', description: 'Achieved your first victory in a Vattle.', icon: 'FirstWinIcon' },
    { id: 'ach-2', name: 'Vattle Veteran', description: 'Competed in 10 Vattles.', icon: 'TrophyIcon' },
    { id: 'ach-3', name: 'Cyberpunk Master', description: 'Won 5 Vattles with a Cyberpunk theme.', icon: 'CyberpunkMasterIcon' },
    { id: 'ach-4', name: 'Prompt Virtuoso', description: 'Average a creativity score of 4.5+ over 10 Vattles.', icon: 'PromptVirtuosoIcon' },
];

const mockEndorsements: Endorsement[] = [
    { skill: 'Creative AI Use', count: 42 },
    { skill: 'Slick Animations', count: 28 },
    { skill: 'Flawless UI', count: 19 },
    { skill: 'Immersive Audio', count: 12 },
];

const mockRivalries: Rivalry[] = [
    { opponentId: 'user-2', opponentName: 'CodeNinja', opponentAvatarUrl: 'https://i.pravatar.cc/150?u=CodeNinja', wins: 5, losses: 4 }
];


const initialUserProfile: UserProfile = {
    id: 'user-1',
    name: 'Vibemaster',
    avatarUrl: 'https://i.pravatar.cc/150?u=Vibemaster',
    joinDate: new Date('2023-01-15').toISOString(),
    role: 'coach',
    status: 'pro',
    hasCompletedOnboarding: false,
    stats: {
        vattlesPlayed: 28,
        wins: 22,
        losses: 6,
    },
    portfolio: mockPortfolio,
    showcase: mockShowcase,
    vibeAnalysis: "This Vattler demonstrates a clear affinity for retro-futuristic and space-themed aesthetics. Their work often incorporates elements of vaporwave and 8-bit nostalgia, showing a flair for creating immersive, atmospheric experiences. They seem to excel in battles that require strong thematic execution and visual creativity.",
    lastVibeRecalibration: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // Set to 4 days ago to allow recalibration
    achievements: mockAchievements,
    endorsements: mockEndorsements,
    profileTheme: 'default',
    rivalries: mockRivalries,
    promptLibrary: [
        { id: 'pl-1', type: 'visuals', prompt: 'A cyberpunk cityscape in pixel art style with neon signs and flying vehicles.' },
        { id: 'pl-2', type: 'audio', prompt: 'Synthwave track with a driving beat and retro 8-bit sound effects.' },
    ],
    currentVibeTrack: { title: 'No track generated', isPlaying: false },
};

const initialVattles: VattleConfig[] = [
  { id: 'vattle-featured-1', theme: 'Quantum Realms UI', creatorName: 'GlitchArtisan', invitedOpponent: 'CodeNinja', status: 'active', mode: 'standard', opponent: 'player', timeLimit: 120, isFeatured: true, startTime: Date.now() - 5 * 60 * 1000 },
  { id: 'vattle-rivalry-1', theme: 'Synthwave Grudge Match', creatorName: 'Vibemaster', invitedOpponent: 'CodeNinja', status: 'active', mode: 'standard', opponent: 'player', timeLimit: 60, isRivalryMatch: true, startTime: Date.now() - 15 * 60 * 1000 },
  { id: 'vattle-0', theme: 'Synthwave Dreams', creatorName: 'GlitchArtisan', invitedOpponent: 'Open Invite', status: 'pending', mode: 'standard', opponent: 'player', timeLimit: 60 },
  { id: 'vattle-1', theme: 'Cyberpunk Detective', creatorName: 'CodeNinja', invitedOpponent: 'GlitchArtisan', status: 'active', mode: 'standard', opponent: 'player', timeLimit: 60, startTime: Date.now() - 10 * 60 * 1000, isTrending: true },
  { id: 'vattle-2', theme: 'Minimalist Weather App', creatorName: 'Vibemaster', studentName: 'NewbieDev', invitedOpponent: 'NewbieDev', status: 'active', mode: 'coaching', opponent: 'player', timeLimit: 90, startTime: Date.now() - 30 * 60 * 1000 },
  { id: 'vattle-3', theme: 'Vaporwave Space', creatorName: 'Vibemaster', invitedOpponent: 'CodeNinja', status: 'voting', mode: 'standard', opponent: 'player', timeLimit: 60, startTime: Date.now() - 2 * 24 * 60 * 60 * 1000 },
  { id: 'vattle-4', theme: '8-bit Arcade', creatorName: 'PixelPusher', invitedOpponent: 'Vibemaster', status: 'completed', mode: 'standard', opponent: 'player', timeLimit: 45, winner: 'PixelPusher', startTime: Date.now() - 5 * 24 * 60 * 60 * 1000 },
  { id: 'vattle-5', theme: 'Intro to React Hooks', creatorName: 'Vibemaster', studentName: 'JaneDev', invitedOpponent: 'JaneDev', status: 'completed', mode: 'coaching', opponent: 'player', timeLimit: 120, winner: 'JaneDev', startTime: Date.now() - 6 * 24 * 60 * 60 * 1000 },
];

const mockTournaments: Tournament[] = [
    { id: 't1', title: 'Vibe Masters Winter Circuit', theme: 'Winter Wonderland', type: 'official', status: 'live', prizePool: '$5,000', maxParticipants: 64, participants: Array.from({length: 60}, (_, i) => ({ id: `p${i}`, name: `Vattler${i}`, seed: i+1, avatarUrl: `https://i.pravatar.cc/40?u=p${i}`})), rounds: [
        { id: 'r1', name: 'Round of 16', matches: Array.from({length: 8}, (_, i) => ({ id: `m${i}`, participants: [{id: `p${i*2}`, name: `Vattler${i*2}`, seed: i*2+1, avatarUrl: `https://i.pravatar.cc/40?u=p${i*2}`}, {id: `p${i*2+1}`, name: `Vattler${i*2+1}`, seed: i*2+2, avatarUrl: `https://i.pravatar.cc/40?u=p${i*2+1}`}]}))},
        { id: 'r2', name: 'Quarter Finals', matches: Array.from({length: 4}, () => ({id: 'm', participants: [null, null]})) },
        { id: 'r3', name: 'Semi Finals', matches: Array.from({length: 2}, () => ({id: 'm', participants: [null, null]})) },
        { id: 'r4', name: 'Finals', matches: [{id: 'm', participants: [null, null]}] },
    ]},
    { id: 't2', title: 'Synthwave Startup Showdown', theme: '80s Tech Startup', type: 'sponsored', status: 'upcoming', prizePool: '$2,500 + Gear', maxParticipants: 32, participants: Array.from({length: 12}, (_, i) => ({ id: `p${i}`, name: `Vattler${i}`, seed: i+1, avatarUrl: `https://i.pravatar.cc/40?u=p${i}`})), rounds: [] },
    { id: 't3', title: 'Community Clash: Eco Edition', theme: 'Sustainable Future', type: 'community', status: 'completed', prizePool: 'V-Bucks', maxParticipants: 128, participants: [], rounds: [] },
];

type View = 'auth' | 'arena' | 'battle' | 'voting' | 'profile' | 'rankings' | 'tournaments' | 'tournament_detail' | 'vibelabs' | 'api' | 'streaming' | 'onboarding';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('vattles-auth', false);
    const [view, setView] = useState<View>('auth');
    const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('vattles-user-profile', initialUserProfile);
    const [vattles, setVattles] = useLocalStorage<VattleConfig[]>('vattles-data', initialVattles);
    const tournaments = mockTournaments;
    const [activeVattle, setActiveVattle] = useState<VattleConfig | null>(null);
    const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);

    const [isCreateVattleModalOpen, setCreateVattleModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    
    const [votedOn, setVotedOn] = useState<{[key: string]: boolean}>({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const item = window.localStorage.getItem('vattles-voted');
                if (item) {
                    setVotedOn(JSON.parse(item));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    const updateVotedOn = (value: {[key: string]: boolean} | ((val: {[key: string]: boolean}) => {[key: string]: boolean})) => {
        try {
            const newValue = value instanceof Function ? value(votedOn) : value;
            setVotedOn(newValue);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('vattles-voted', JSON.stringify(newValue));
            }
        } catch (error) {
            console.error(error);
        }
    };
    const [registeredTournaments, setRegisteredTournaments] = useLocalStorage<{[key: string]: boolean}>('vattles-tournaments-reg', {});
    const [labInitialPrompt, setLabInitialPrompt] = useState<string>('');

    useEffect(() => {
        if (!isAuthenticated) {
            setView('auth');
        } else if (!userProfile.hasCompletedOnboarding) {
            setView('onboarding');
        } else if (view === 'auth' || view === 'onboarding') {
            setView('arena');
        }
    }, [isAuthenticated, userProfile.hasCompletedOnboarding, view]);

    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);
    
    const handleNavigate = (newView: View) => setView(newView);

    const handleEnterBattle = (vattle: VattleConfig) => {
        setActiveVattle(vattle);
        setView('battle');
    };

    const handleViewVattle = (vattle: VattleConfig) => {
        setActiveVattle(vattle);
        setView('voting');
    };

    const handleExitBattle = () => {
        setActiveVattle(null);
        setView('arena');
    };

    const handleCreateVattle = (config: Omit<VattleConfig, 'id' | 'status' | 'startTime' | 'creatorName'>) => {
        const isOpenChallenge = config.invitedOpponent === 'Open Invite';
        const newVattle: VattleConfig = {
            ...config,
            id: `vattle-${Date.now()}`,
            creatorName: userProfile.name,
            status: isOpenChallenge ? 'pending' : 'active',
            startTime: isOpenChallenge ? undefined : Date.now(),
        };
        setVattles(prev => [newVattle, ...prev]);
        setCreateVattleModalOpen(false);
        if (!isOpenChallenge) {
            handleEnterBattle(newVattle);
        }
    };

    const handleJoinVattle = (vattle: VattleConfig) => {
        const updatedVattle: VattleConfig = {
            ...vattle,
            invitedOpponent: userProfile.name,
            status: 'active',
            startTime: Date.now(),
        };

        setVattles(prevVattles =>
            prevVattles.map(v => (v.id === vattle.id ? updatedVattle : v))
        );

        handleEnterBattle(updatedVattle);
    };

    const handleVote = (vattleId: string, appIdentifier: 'A' | 'B', ratings: Ratings) => {
        console.log('Voted on:', { vattleId, appIdentifier, ratings });
        updateVotedOn(prev => ({ ...prev, [vattleId]: true }));
    };
    
    const handleSaveProfile = (newProfile: UserProfile) => {
        setUserProfile(newProfile);
    };
    
    const handleUpdateProfile = (updates: Partial<UserProfile>) => {
        setUserProfile(prev => ({ ...prev, ...updates }));
    };

    const handleUpdateVibeAnalysis = (analysis: string) => {
        setUserProfile(prev => ({
            ...prev,
            vibeAnalysis: analysis,
            lastVibeRecalibration: new Date().toISOString(),
        }));
    };

    const handlePinItem = (vattleId: string) => {
        const itemToPin = userProfile.portfolio.find(p => p.vattleId === vattleId);
        if (itemToPin && userProfile.showcase.length < (userProfile.status === 'pro' ? 6 : 3)) {
            const newShowcaseItem: ShowcaseItem = {
                vattleId: itemToPin.vattleId,
                title: itemToPin.title,
                theme: itemToPin.theme,
                imageUrl: `https://picsum.photos/seed/${itemToPin.title.replace(/\s+/g, '')}/500/350`,
            };
            setUserProfile(prev => ({
                ...prev,
                showcase: [...prev.showcase, newShowcaseItem],
            }));
        }
    };

    const handleUnpinItem = (vattleId: string) => {
        setUserProfile(prev => ({
            ...prev,
            showcase: prev.showcase.filter(item => item.vattleId !== vattleId),
        }));
    };
    
    const handleCompleteOnboarding = (newUsername: string, newAvatarUrl: string) => {
        setUserProfile(prev => ({
            ...prev,
            name: newUsername,
            avatarUrl: newAvatarUrl,
            hasCompletedOnboarding: true,
        }));
        setView('arena');
    };

    const handleSelectTournament = (tournament: Tournament) => {
        if (tournament.status !== 'upcoming') {
            setActiveTournament(tournament);
            setView('tournament_detail');
        }
    };
    
    const handleRegisterTournament = (tournamentId: string) => {
        setRegisteredTournaments(prev => ({...prev, [tournamentId]: true}));
    };
    
    const handleEndorse = (participantId: string, skill: string) => {
        // In a real app, this would hit a backend and update the participant's profile.
        // For this mock, we'll just log it.
        console.log(`Endorsed ${participantId} for skill: ${skill}`);
        if (userProfile.id === participantId) { // Just for demo, endorse ourselves
            setUserProfile(prev => {
                const existingEndorsement = prev.endorsements?.find(e => e.skill === skill);
                if (existingEndorsement) {
                    return {
                        ...prev,
                        endorsements: prev.endorsements?.map(e => e.skill === skill ? {...e, count: e.count + 1} : e)
                    }
                }
                return {
                    ...prev,
                    endorsements: [...(prev.endorsements || []), { skill, count: 1}]
                }
            })
        }
    };

    const handleSavePrompt = (prompt: PromptLibraryItem) => {
        setUserProfile(prev => ({
            ...prev,
            promptLibrary: [...(prev.promptLibrary || []), prompt],
        }));
    };

    const handleDeletePrompt = (promptId: string) => {
        setUserProfile(prev => ({
            ...prev,
            promptLibrary: (prev.promptLibrary || []).filter(p => p.id !== promptId),
        }));
    };

    const handleUpdateVibeTrack = (track: { title: string; isPlaying: boolean }) => {
        setUserProfile(prev => ({
            ...prev,
            currentVibeTrack: track,
        }));
    };

    const handleCloneToLab = (theme: string) => {
        setLabInitialPrompt(theme);
        setView('vibelabs');
    };

    const renderView = () => {
        if (!isAuthenticated) return <AuthView onLogin={handleLogin} onOAuthLogin={(p) => handleLogin()} />;

        switch(view) {
            case 'onboarding':
                return <OnboardingView userProfile={userProfile} onComplete={handleCompleteOnboarding} />;
            case 'arena':
                return <VattleArena userProfile={userProfile} vattles={vattles} onEnterBattle={handleEnterBattle} onViewVattle={handleViewVattle} onJoinVattle={handleJoinVattle} />;
            case 'battle':
                return activeVattle ? <BattleRoom 
                    vattle={activeVattle} 
                    onExit={handleExitBattle} 
                    userProfile={userProfile}
                    onSavePrompt={handleSavePrompt}
                    onDeletePrompt={handleDeletePrompt}
                    onUpdateVibeTrack={handleUpdateVibeTrack}
                /> : <div className="text-white">Error: No active vattle selected.</div>;
            case 'voting':
                return activeVattle ? <VotingView vattle={activeVattle} onVote={handleVote} hasVoted={!!votedOn[activeVattle.id]} onBack={() => setView('arena')} userProfile={userProfile} onEndorse={handleEndorse} onCloneToLab={handleCloneToLab} /> : <div className="text-white">Error: No vattle selected for viewing.</div>;
            case 'profile':
                return <ProfileView 
                            userProfile={userProfile} 
                            onBack={() => setView('arena')} 
                            onEdit={() => setIsProfileModalOpen(true)}
                            onPinItem={handlePinItem} 
                            onUnpinItem={handleUnpinItem}
                            onUpdateVibeAnalysis={handleUpdateVibeAnalysis}
                            onUpdateProfile={handleUpdateProfile}
                        />
            case 'rankings':
                return <RankingsView onBack={() => setView('arena')} />
            case 'tournaments':
                return <TournamentsView tournaments={tournaments} onBack={() => setView('arena')} onSelectTournament={handleSelectTournament} onRegister={handleRegisterTournament} registeredTournaments={registeredTournaments} />
            case 'tournament_detail':
                return activeTournament ? <TournamentDetailView tournament={activeTournament} onBack={() => setView('tournaments')} onRegister={handleRegisterTournament} onCheckIn={() => {}} isRegistered={!!registeredTournaments[activeTournament.id]} isCheckedIn={false}/> : <div className="text-white">Error: No tournament selected.</div>;
            case 'vibelabs':
                return <VibeLabsView onBack={() => setView('arena')} initialPrompt={labInitialPrompt} />;
            case 'api':
                 return <ApiView onBack={() => setView('arena')} />;
            case 'streaming':
                return <StreamingView onBack={() => setView('arena')} />;
            default:
                return <VattleArena userProfile={userProfile} vattles={vattles} onEnterBattle={handleEnterBattle} onViewVattle={handleViewVattle} onJoinVattle={handleJoinVattle} />;
        }
    }

    return (
        <div className="app-background">
            <div className="app-overlay"></div>
            {isAuthenticated && view !== 'onboarding' && (
                <Header
                    userProfile={userProfile}
                    onNavigate={(v) => handleNavigate(v as View)}
                    onOpenCreateVattle={() => setCreateVattleModalOpen(true)}
                    onLogout={handleLogout}
                />
            )}
            <main className={`app-main ${isAuthenticated && view !== 'onboarding' ? 'app-main-authenticated' : 'app-main-fullscreen'}`}>
                {renderView()}
            </main>
            <div className="app-modals">
                <CreateVattleModal isOpen={isCreateVattleModalOpen} onClose={() => setCreateVattleModalOpen(false)} onCreate={handleCreateVattle} isCoach={userProfile.role === 'coach'}/>
                <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} currentProfile={userProfile} onSave={handleSaveProfile} />
            </div>
            <Analytics />
        </div>
    );
};

export default App;
