import React, { useState, useMemo, useEffect } from 'react';
import { VattleConfig, ChatMessage, UserProfile, PromptLibraryItem } from '../types';
import BattleTimer from './BattleTimer';
import ChatSidebar from './ChatSidebar';
import SubmissionModal from './SubmissionModal';
import { BrainIcon, ImageIcon, AudioIcon, TextIcon, CodeBracketIcon, DocumentArrowUpIcon, HtmlIcon, CssIcon, JsIcon, SparklesIcon, BookOpenIcon, ChatBubbleLeftRightIcon, LinkIcon, MusicNoteIcon, BookmarkIcon, CursorArrowRaysIcon } from './icons';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface BattleRoomProps {
  vattle: VattleConfig;
  onExit: () => void;
  userProfile: UserProfile;
  onSavePrompt: (prompt: PromptLibraryItem) => void;
  onDeletePrompt: (promptId: string) => void;
  onUpdateVibeTrack: (track: { title: string; isPlaying: boolean }) => void;
}

interface ProjectFile {
    name: 'index.html' | 'style.css' | 'script.js';
    language: 'html' | 'css' | 'javascript';
    content: string;
    icon: JSX.Element;
}

const initialFiles: ProjectFile[] = [
    { name: 'index.html', language: 'html', icon: <HtmlIcon className="h-5 w-5 text-orange-400" />, content: `<!DOCTYPE html>
<html>
<head>
  <title>Vattle App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to the Vattle!</h1>
  <p>Start building your vibe.</p>
  <script src="script.js"></script>
</body>
</html>` },
    { name: 'style.css', language: 'css', icon: <CssIcon className="h-5 w-5 text-blue-400" />, content: `body {
  font-family: sans-serif;
  background-color: #1a1a2e;
  color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

h1 {
  color: #c084fc;
  text-shadow: 0 0 8px #c084fc;
}` },
    { name: 'script.js', language: 'javascript', icon: <JsIcon className="h-5 w-5 text-yellow-300" />, content: `console.log("Vattle script loaded!");

document.querySelector('h1').addEventListener('click', () => {
  alert('You clicked the heading!');
});` },
];

const initialFilesP2: ProjectFile[] = [
    { name: 'index.html', language: 'html', icon: <HtmlIcon className="h-5 w-5 text-orange-400" />, content: `<!DOCTYPE html>
<html>
<head>
  <title>Vattle App B</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>A Challenger Appears!</h1>
  <p>Vibing on a different frequency.</p>
  <script src="script.js"></script>
</body>
</html>` },
    { name: 'style.css', language: 'css', icon: <CssIcon className="h-5 w-5 text-blue-400" />, content: `body {
  font-family: monospace;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

h1 {
  color: #27ae60;
  text-shadow: 0 0 8px #27ae60;
}` },
    { name: 'script.js', language: 'javascript', icon: <JsIcon className="h-5 w-5 text-yellow-300" />, content: `console.log("Challenger script loaded!");

document.querySelector('p').addEventListener('mouseover', () => {
  document.querySelector('p').style.color = '#e74c3c';
});` },
];


const getInitialChatMessages = (theme: string): ChatMessage[] => [
    { 
        id: 1,
        user: 'System', 
        avatar: 'SYS', 
        message: `Welcome to the Vattle: "${theme}"! The chat is now live. Be respectful and have fun.`, 
        color: 'text-gray-500' 
    }
];

const BattleRoom: React.FC<BattleRoomProps> = ({ vattle, onExit, userProfile, onSavePrompt, onDeletePrompt, onUpdateVibeTrack }) => {
    // --- STATE & DERIVED VALUES (FOR BOTH MODES) ---
    const isParticipant = useMemo(() => {
        const isCreator = userProfile.name === vattle.creatorName;
        const isOpponent = userProfile.name === vattle.invitedOpponent;
        const isStudent = vattle.mode === 'coaching' && userProfile.name === vattle.studentName;
        return isCreator || isOpponent || isStudent;
    }, [userProfile.name, vattle]);
    
    const isSpectator = !isParticipant && vattle.status === 'active';
    const isExpired = vattle.startTime ? Date.now() > vattle.startTime + vattle.timeLimit * 60 * 1000 : false;
    const participantId = userProfile.name === vattle.creatorName ? 'p1' : 'p2';

    // Chat State (Global)
    const [messages, setMessages] = useLocalStorage<ChatMessage[]>(`vattles-chat-${vattle.id}`, getInitialChatMessages(vattle.theme));
    const [newMessage, setNewMessage] = useState('');
    const [privateMessages, setPrivateMessages] = useLocalStorage<ChatMessage[]>(`vattles-coach-chat-${vattle.id}`, [{ id: 1, user: 'System', avatar: 'SYS', message: 'Coach chat initialized.', color: 'text-gray-500', isPrivate: true }]);
    const [newPrivateMessage, setNewPrivateMessage] = useState('');
    
    // Participant State
    const [files, setFiles] = useState<ProjectFile[]>(initialFiles);
    const [activeFileName, setActiveFileName] = useState<ProjectFile['name']>('index.html');
    const [isSubmissionModalOpen, setSubmissionModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const userRoleInVattle = vattle.mode === 'coaching' ? (userProfile.name === vattle.creatorName ? 'coach' : 'student') : 'participant';
    const defaultTab = vattle.mode === 'coaching' ? 'coach' : 'workbench';
    const [rightPanelTab, setRightPanelTab] = useState<'workbench' | 'radio' | 'library' | 'chat' | 'coach'>(defaultTab);
    const [visualsPrompt, setVisualsPrompt] = useState('');
    const [audioPrompt, setAudioPrompt] = useState(vattle.theme);
    const [textPrompt, setTextPrompt] = useState('');
    const [pings, setPings] = useState<{ id: number; x: number; y: number }[]>([]);

    // Spectator State
    const [spectatorView, setSpectatorView] = useState<'side-by-side' | 'p1' | 'p2'>('side-by-side');
    const [filesP1] = useState<ProjectFile[]>(initialFiles);
    const [activeFileNameP1, setActiveFileNameP1] = useState<ProjectFile['name']>('index.html');
    const [filesP2] = useState<ProjectFile[]>(initialFilesP2);
    const [activeFileNameP2, setActiveFileNameP2] = useState<ProjectFile['name']>('index.html');
    const [pingToolActive, setPingToolActive] = useState(false);

    // Vibe Radio State
    const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
    
    // --- LOCALSTORAGE SYNC FOR PINGS AND RADIO ---
    useEffect(() => {
        if (!isParticipant) return;

        const handleStorage = (event: StorageEvent) => {
            if (event.key === `vattle-ping-${vattle.id}-${participantId}` && event.newValue) {
                const { x, y } = JSON.parse(event.newValue);
                const newPing = { id: Date.now(), x, y };
                setPings(current => [...current, newPing]);
                setTimeout(() => {
                    setPings(current => current.filter(p => p.id !== newPing.id));
                }, 2000); // Ping visible for 2 seconds
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [vattle.id, participantId, isParticipant]);


    // --- MEMOIZED PREVIEWS (FOR BOTH MODES) ---
    const buildSrcDoc = (htmlContent: string, cssContent: string, jsContent: string) => `
        <!DOCTYPE html>
        <html>
            <head><style>${cssContent}</style></head>
            <body>
                ${htmlContent.replace(/<link.*href="style.css".*>/, '').replace(/<script.*src="script.js".*><\/script>/, '')}
                <script>${jsContent}</script>
            </body>
        </html>`;

    const previewSrcDoc = useMemo(() => {
        const html = files.find(f => f.name === 'index.html')?.content || '';
        const css = files.find(f => f.name === 'style.css')?.content || '';
        const js = files.find(f => f.name === 'script.js')?.content || '';
        return buildSrcDoc(html, css, js);
    }, [files]);
    
    const previewSrcDocP1 = useMemo(() => {
        const html = filesP1.find(f => f.name === 'index.html')?.content || '';
        const css = filesP1.find(f => f.name === 'style.css')?.content || '';
        const js = filesP1.find(f => f.name === 'script.js')?.content || '';
        return buildSrcDoc(html, css, js);
    }, [filesP1]);

    const previewSrcDocP2 = useMemo(() => {
        const html = filesP2.find(f => f.name === 'index.html')?.content || '';
        const css = filesP2.find(f => f.name === 'style.css')?.content || '';
        const js = filesP2.find(f => f.name === 'script.js')?.content || '';
        return buildSrcDoc(html, css, js);
    }, [filesP2]);

    // --- SHARED HANDLERS ---
    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const userMessage: ChatMessage = { id: Date.now(), user: userProfile.name, avatar: userProfile.name.substring(0,2).toUpperCase(), message: newMessage.trim(), color: 'text-yellow-300' };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
    };

    // --- SUB-COMPONENTS ---
    const ReadOnlyWorkspace: React.FC<{
        participantName: string;
        participantId: 'p1' | 'p2';
        files: ProjectFile[];
        activeFileName: ProjectFile['name'];
        setActiveFileName: (name: ProjectFile['name']) => void;
        previewSrc: string;
        isSideBySide?: boolean;
    }> = ({ participantName, participantId, files, activeFileName, setActiveFileName, previewSrc, isSideBySide = false }) => {
        const activeFile = files.find(f => f.name === activeFileName)!;
        
        const handlePing = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!pingToolActive) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Send ping via localStorage
            localStorage.setItem(`vattle-ping-${vattle.id}-${participantId}`, JSON.stringify({ x, y, timestamp: Date.now() }));
            
            setPingToolActive(false); // Deactivate after one ping
            console.log(`Ping sent to ${participantName} at (${x}, ${y})`);
        };
        
        return (
            <div className="bg-black/20 rounded-lg border border-gray-700/50 p-1 flex flex-col h-full">
                <h3 className="font-orbitron p-2 text-center text-white">{participantName}'s Workspace</h3>
                <div className="grid grid-cols-12 gap-px bg-gray-700/50 flex-grow rounded-md overflow-hidden min-h-0">
                    {!isSideBySide && (
                        <div className="col-span-3 bg-[#100D20] p-2 flex flex-col overflow-y-auto">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 px-2">Files</h4>
                            <div role="tablist">
                                {files.map(file => (
                                    <button key={file.name} role="tab" aria-selected={activeFileName === file.name} onClick={() => setActiveFileName(file.name)}
                                        className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${activeFileName === file.name ? 'bg-purple-600/30 text-purple-200' : 'text-gray-300 hover:bg-gray-700/50'}`}>
                                        {file.icon} {file.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={`col-span-${isSideBySide ? 6 : 4} bg-[#100D20] flex flex-col`}>
                        <textarea value={activeFile.content} readOnly className="w-full h-full flex-grow bg-transparent p-4 text-gray-300 font-mono text-sm focus:outline-none resize-none" />
                    </div>
                    <div className={`relative col-span-${isSideBySide ? 6 : 5} bg-white`} onClick={handlePing}>
                         {pingToolActive && (
                            <div className="absolute inset-0 bg-teal-500/20 z-10 flex items-center justify-center text-white font-bold text-lg animate-pulse cursor-crosshair">
                                Click to Ping
                            </div>
                        )}
                        <iframe srcDoc={previewSrc} title={`${participantName} Live Preview`} className="w-full h-full border-0" sandbox="allow-scripts" />
                    </div>
                </div>
            </div>
        );
    };


    // --- CONDITIONAL RENDERING: SPECTATOR vs PARTICIPANT ---
    if (!vattle.startTime) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <h2 className="text-2xl font-orbitron">Error</h2><p>This battle has not started yet.</p>
                <button onClick={onExit} className="mt-4 px-4 py-2 bg-purple-600 rounded-lg">Back to Lobby</button>
            </div>
        );
    }
    
    if (isSpectator) {
        // --- SPECTATOR VIEW ---
        const p1Name = vattle.creatorName;
        const p2Name = vattle.studentName || vattle.invitedOpponent;

        return (
            <div className="w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in h-screen flex flex-col">
                <header className="flex-shrink-0 flex items-center justify-between mb-4 flex-wrap gap-4">
                    <div className="text-center">
                        <h1 className="font-orbitron text-2xl text-purple-300 tracking-wider">{vattle.theme}</h1>
                        <p className="text-gray-400 text-sm">{p1Name} vs. {p2Name}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        {isExpired ? (
                             <div className="font-orbitron text-3xl font-bold text-red-500">VATTLE ENDED</div>
                        ) : (
                            <>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Time Remaining</p>
                                <div className="font-orbitron text-3xl font-bold text-white tracking-widest bg-black/30 px-4 py-2 rounded-md">
                                    <BattleTimer startTime={vattle.startTime} timeLimit={vattle.timeLimit} />
                                </div>
                            </>
                        )}
                    </div>
                     <div className="flex items-center gap-2 bg-gray-900/50 p-1 rounded-lg border border-gray-700">
                        <button onClick={() => setSpectatorView('side-by-side')} className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${spectatorView === 'side-by-side' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Side-by-Side</button>
                        <button onClick={() => setSpectatorView('p1')} className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${spectatorView === 'p1' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>{p1Name}</button>
                        <button onClick={() => setSpectatorView('p2')} className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${spectatorView === 'p2' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>{p2Name}</button>
                    </div>
                    <button onClick={onExit} className="bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold px-4 py-2 rounded-lg transition-all">&larr; Exit Arena</button>
                </header>

                <main className="grid grid-cols-12 gap-6 flex-grow min-h-0">
                    <div className="col-span-12 lg:col-span-9 h-full">
                        {spectatorView === 'side-by-side' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                                <ReadOnlyWorkspace participantName={p1Name} participantId="p1" files={filesP1} activeFileName={activeFileNameP1} setActiveFileName={setActiveFileNameP1} previewSrc={previewSrcDocP1} isSideBySide={true} />
                                <ReadOnlyWorkspace participantName={p2Name} participantId="p2" files={filesP2} activeFileName={activeFileNameP2} setActiveFileName={setActiveFileNameP2} previewSrc={previewSrcDocP2} isSideBySide={true} />
                            </div>
                        )}
                        {spectatorView === 'p1' && (
                            <ReadOnlyWorkspace participantName={p1Name} participantId="p1" files={filesP1} activeFileName={activeFileNameP1} setActiveFileName={setActiveFileNameP1} previewSrc={previewSrcDocP1} />
                        )}
                        {spectatorView === 'p2' && (
                             <ReadOnlyWorkspace participantName={p2Name} participantId="p2" files={filesP2} activeFileName={activeFileNameP2} setActiveFileName={setActiveFileNameP2} previewSrc={previewSrcDocP2} />
                        )}
                    </div>
                    <aside className="col-span-12 lg:col-span-3 h-full flex flex-col gap-4">
                        <div className="bg-black/20 rounded-lg border border-gray-700/50 p-4">
                             <h3 className="font-orbitron text-lg font-semibold text-white mb-2">Spectator Tools</h3>
                             <button onClick={() => setPingToolActive(true)} disabled={pingToolActive} className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-all bg-teal-600/80 hover:bg-teal-600 text-white disabled:bg-gray-700/80 disabled:cursor-not-allowed">
                                <CursorArrowRaysIcon className="h-5 w-5"/> Ping a Participant
                            </button>
                            <div className="mt-2 text-center text-xs text-gray-400">Select a participant view and use the Ping tool to highlight something cool!</div>
                        </div>
                        <ChatSidebar messages={messages} inputValue={newMessage} onInputChange={setNewMessage} onSendMessage={handleSendMessage} />
                    </aside>
                </main>
                <style>{`
                    .overflow-y-auto::-webkit-scrollbar { width: 6px; }
                    .overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
                    .overflow-y-auto::-webkit-scrollbar-thumb { background-color: rgba(139, 92, 246, 0.4); border-radius: 20px; }
                `}</style>
            </div>
        );
    }
    
    // --- PARTICIPANT VIEW (Original Component Logic) ---
    const activeFile = files.find(f => f.name === activeFileName)!;
    const inputStyles = "w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 disabled:opacity-50";
    
    const handleSubmit = (submission: { submissionUrl: string; description: string }) => {
        console.log({ vattleId: vattle.id, ...submission, files: files.map(f => ({ name: f.name, content: f.content })) });
        setIsSubmitted(true);
        setSubmissionModalOpen(false);
        alert("Your submission has been received!");
        setTimeout(onExit, 1000);
    };

    const handleSendPrivateMessage = () => {
        if (newPrivateMessage.trim() === '') return;
        const userMessage: ChatMessage = { id: Date.now(), user: userProfile.name, avatar: userProfile.name.substring(0,2).toUpperCase(), message: newPrivateMessage.trim(), color: userRoleInVattle === 'coach' ? 'text-blue-300' : 'text-yellow-300', isPrivate: true };
        setPrivateMessages(prev => [...prev, userMessage]);
        setNewPrivateMessage('');
    };

    const handleFileContentChange = (newContent: string) => {
        setFiles(currentFiles => currentFiles.map(file => file.name === activeFileName ? { ...file, content: newContent } : file));
    };
    
    const handleGenerateMusic = () => {
        if (!audioPrompt) return;
        setIsGeneratingMusic(true);
        setTimeout(() => {
            const trackTitle = `${audioPrompt.split(' ').slice(0,3).join(' ')} Vibe`;
            onUpdateVibeTrack({ title: trackTitle, isPlaying: true });
            setIsGeneratingMusic(false);
        }, 2500); // Simulate generation time
    };
    
    const handleTogglePlay = () => {
        if (userProfile.currentVibeTrack) {
            onUpdateVibeTrack({ ...userProfile.currentVibeTrack, isPlaying: !userProfile.currentVibeTrack.isPlaying });
        }
    }
    
    const renderRightPanelContent = () => {
        const isCoach = userRoleInVattle === 'coach';
        const promptLibrary = userProfile.promptLibrary || [];
        return (
            <>
                <div role="tabpanel" id="panel-workbench" aria-labelledby="tab-workbench" hidden={rightPanelTab !== 'workbench'}>
                     <div className={`space-y-6 ${isCoach ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <fieldset disabled={isCoach}>
                            <div>
                                <h3 className="font-orbitron text-lg font-bold text-white mb-3 flex items-center gap-2"><SparklesIcon className="h-5 w-5 text-purple-400" aria-hidden="true"/>Prompt Notepad</h3>
                                <p className="text-sm text-gray-400 mb-4">A space to draft and manage your AI prompts.</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="visuals-prompt" className="flex items-center justify-between text-sm font-semibold text-gray-300 mb-2">
                                            <span className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-gray-400"/>Visual Prompts</span>
                                            <button onClick={() => onSavePrompt({id: `pl-${Date.now()}`, type: 'visuals', prompt: visualsPrompt})} className="text-xs text-teal-300 hover:text-teal-200 disabled:text-gray-500" disabled={!visualsPrompt}>Save</button>
                                        </label>
                                        <textarea id="visuals-prompt" value={visualsPrompt} onChange={(e) => setVisualsPrompt(e.target.value)} rows={5} placeholder="e.g., A cyberpunk cityscape in pixel art style..." className={`${inputStyles} focus:ring-purple-500`}/>
                                    </div>
                                     <div>
                                        <label htmlFor="audio-prompt" className="flex items-center justify-between text-sm font-semibold text-gray-300 mb-2">
                                            <span className="flex items-center gap-2"><AudioIcon className="h-4 w-4 text-gray-400"/>Audio Prompts</span>
                                             <button onClick={() => onSavePrompt({id: `pl-${Date.now()}`, type: 'audio', prompt: audioPrompt})} className="text-xs text-teal-300 hover:text-teal-200 disabled:text-gray-500" disabled={!audioPrompt}>Save</button>
                                        </label>
                                        <textarea id="audio-prompt" value={audioPrompt} onChange={(e) => setAudioPrompt(e.target.value)} rows={5} placeholder="e.g., Synthwave track with a driving beat..." className={`${inputStyles} focus:ring-purple-500`}/>
                                    </div>
                                     <div>
                                        <label htmlFor="text-prompt" className="flex items-center justify-between text-sm font-semibold text-gray-300 mb-2">
                                            <span className="flex items-center gap-2"><TextIcon className="h-4 w-4 text-gray-400"/>Text Prompts</span>
                                             <button onClick={() => onSavePrompt({id: `pl-${Date.now()}`, type: 'text', prompt: textPrompt})} className="text-xs text-teal-300 hover:text-teal-200 disabled:text-gray-500" disabled={!textPrompt}>Save</button>
                                        </label>
                                        <textarea id="text-prompt" value={textPrompt} onChange={(e) => setTextPrompt(e.target.value)} rows={5} placeholder="e.g., Story of a lone detective..." className={`${inputStyles} focus:ring-purple-500`}/>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div role="tabpanel" id="panel-radio" aria-labelledby="tab-radio" hidden={rightPanelTab !== 'radio'}>
                    <h3 className="font-orbitron text-lg font-bold text-white mb-4">Vibe Radio</h3>
                    <textarea value={audioPrompt} onChange={e => setAudioPrompt(e.target.value)} rows={3} placeholder="Describe the music you want to hear..." className={`${inputStyles} focus:ring-teal-500 mb-3`} />
                    <button onClick={handleGenerateMusic} disabled={isGeneratingMusic} className="w-full flex items-center justify-center gap-2 py-2 font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all disabled:bg-gray-600">
                        {isGeneratingMusic ? 'Generating...' : <><MusicNoteIcon className="h-5 w-5"/> Generate Track</>}
                    </button>
                    <div className="mt-6 p-4 bg-black/30 rounded-lg border border-gray-700/50">
                        <p className="text-xs uppercase text-gray-400">Now Playing</p>
                        <p className="font-semibold text-white truncate">{userProfile.currentVibeTrack?.title || 'Silence'}</p>
                        <button onClick={handleTogglePlay} className="mt-2 text-sm text-teal-300">
                           {userProfile.currentVibeTrack?.isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                </div>
                <div role="tabpanel" id="panel-library" aria-labelledby="tab-library" hidden={rightPanelTab !== 'library'}>
                     <h3 className="font-orbitron text-lg font-bold text-white mb-4">Prompt Library</h3>
                     <div className="space-y-4">
                        {promptLibrary.length > 0 ? promptLibrary.map(p => (
                            <div key={p.id} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                                <p className="text-xs font-bold uppercase text-purple-300">{p.type}</p>
                                <p className="text-sm text-gray-200 my-2">{p.prompt}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => {
                                        if (p.type === 'visuals') setVisualsPrompt(p.prompt);
                                        if (p.type === 'audio') setAudioPrompt(p.prompt);
                                        if (p.type === 'text') setTextPrompt(p.prompt);
                                        setRightPanelTab('workbench');
                                    }} className="text-xs px-2 py-1 bg-teal-600/80 hover:bg-teal-600 rounded">Use</button>
                                    <button onClick={() => onDeletePrompt(p.id)} className="text-xs px-2 py-1 bg-red-600/50 hover:bg-red-600 rounded">Delete</button>
                                </div>
                            </div>
                        )) : <p className="text-sm text-gray-500 text-center">Your library is empty. Save prompts from the AI Workbench!</p>}
                     </div>
                </div>
                <div role="tabpanel" id="panel-coach" aria-labelledby="tab-coach" hidden={rightPanelTab !== 'coach'}><ChatSidebar messages={privateMessages} inputValue={newPrivateMessage} onInputChange={setNewPrivateMessage} onSendMessage={handleSendPrivateMessage} /></div>
                <div role="tabpanel" id="panel-chat" aria-labelledby="tab-chat" hidden={rightPanelTab !== 'chat'}><ChatSidebar messages={messages} inputValue={newMessage} onInputChange={setNewMessage} onSendMessage={handleSendMessage} /></div>
            </>
        )
    };

    const isCoaching = vattle.mode === 'coaching';

    return (
        <div className="w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <main className="grid grid-cols-12 gap-6 h-[calc(100vh-4rem)]">
                <aside className="col-span-12 lg:col-span-3 bg-black/20 rounded-lg border border-gray-700/50 p-6 flex flex-col space-y-6">
                    <div className="text-center">
                        <h1 className={`font-orbitron text-2xl ${isCoaching ? 'text-blue-300' : 'text-purple-300'} tracking-wider`}>{vattle.theme}</h1>
                        {isCoaching ? (<p className="text-gray-400 text-sm">Coach: {vattle.creatorName} | Student: {vattle.studentName}</p>) : (<p className="text-gray-400 text-sm">{vattle.creatorName} vs. {vattle.invitedOpponent}</p>)}
                    </div>
                    <div className="flex-grow flex flex-col items-center justify-center">
                         <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Time Remaining</p>
                         <div className="font-orbitron text-5xl font-bold text-white tracking-widest bg-black/30 px-4 py-2 rounded-md min-w-[200px] text-center">
                            <BattleTimer startTime={vattle.startTime} timeLimit={vattle.timeLimit} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full text-left text-sm p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/50 transition-colors">View Vattle Rules</button>
                        <button className="w-full text-left text-sm p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/50 transition-colors">View Allowed Tools</button>
                    </div>
                    <div className="mt-auto space-y-4">
                        {userRoleInVattle !== 'coach' && (<button onClick={() => setSubmissionModalOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg text-base transition-all bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/30"><DocumentArrowUpIcon className="h-6 w-6" />Submit App</button>)}
                         <button onClick={onExit} className="w-full flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold px-4 py-2 rounded-lg transition-all self-start md:self-center">&larr; Exit Arena</button>
                    </div>
                </aside>
                <div className="relative col-span-12 lg:col-span-6 bg-black/20 rounded-lg border border-gray-700/50 p-1 flex flex-col">
                    {pings.map(ping => (
                        <div key={ping.id} className="ping-animation" style={{ left: `${ping.x}px`, top: `${ping.y}px` }}></div>
                    ))}
                    <div className="grid grid-cols-12 gap-px bg-gray-700/50 h-full rounded-md overflow-hidden">
                        <div className="col-span-3 bg-[#100D20] p-2 flex flex-col">
                            <h4 id="file-list-label" className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 px-2">Files</h4>
                            <div role="tablist" aria-labelledby="file-list-label">
                                {files.map(file => (
                                    <button key={file.name} id={`file-tab-${file.name}`} role="tab" aria-selected={activeFileName === file.name} aria-controls="code-editor-panel" onClick={() => setActiveFileName(file.name)} className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${activeFileName === file.name ? 'bg-purple-600/30 text-purple-200' : 'text-gray-300 hover:bg-gray-700/50'}`}>
                                        {file.icon} {file.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div role="tabpanel" id="code-editor-panel" aria-labelledby={`file-tab-${activeFileName}`} className="col-span-9 md:col-span-4 bg-[#100D20] flex flex-col">
                            <label htmlFor="code-editor" className="sr-only">Code editor for {activeFileName}</label>
                            <textarea id="code-editor" value={activeFile.content} onChange={(e) => handleFileContentChange(e.target.value)} spellCheck="false" readOnly={userRoleInVattle === 'coach'} className="w-full h-full flex-grow bg-transparent p-4 text-gray-200 font-mono text-sm focus:outline-none resize-none disabled:opacity-70" />
                        </div>
                        <div className="hidden md:block col-span-5 bg-white">
                            <iframe srcDoc={previewSrcDoc} title="Live Preview" className="w-full h-full border-0" sandbox="allow-scripts" />
                        </div>
                    </div>
                </div>
                <aside className="col-span-12 lg:col-span-3 bg-black/20 rounded-lg border border-gray-700/50 p-6 flex flex-col">
                    <div role="tablist" aria-label="Utility Panel" className="flex border-b border-gray-700 mb-4 flex-wrap">
                        {isCoaching && (<TabButton id="tab-coach" controls="panel-coach" label="Coach Chat" icon={<ChatBubbleLeftRightIcon className="h-5 w-5"/>} isActive={rightPanelTab === 'coach'} onClick={() => setRightPanelTab('coach')} />)}
                        {!isCoaching && (<TabButton id="tab-workbench" controls="panel-workbench" label="AI" icon={<BrainIcon className="h-5 w-5"/>} isActive={rightPanelTab === 'workbench'} onClick={() => setRightPanelTab('workbench')} />)}
                        {!isCoaching && (<TabButton id="tab-radio" controls="panel-radio" label="Radio" icon={<MusicNoteIcon className="h-5 w-5"/>} isActive={rightPanelTab === 'radio'} onClick={() => setRightPanelTab('radio')} />)}
                        {!isCoaching && (<TabButton id="tab-library" controls="panel-library" label="Library" icon={<BookmarkIcon className="h-5 w-5"/>} isActive={rightPanelTab === 'library'} onClick={() => setRightPanelTab('library')} />)}
                        {!isCoaching && (<TabButton id="tab-chat" controls="panel-chat" label="Chat" icon={<ChatBubbleLeftRightIcon className="h-5 w-5"/>} isActive={rightPanelTab === 'chat'} onClick={() => setRightPanelTab('chat')} />)}
                    </div>
                    <div className="flex-grow overflow-y-auto pr-2">{renderRightPanelContent()}</div>
                </aside>
            </main>
            <SubmissionModal isOpen={isSubmissionModalOpen} onClose={() => setSubmissionModalOpen(false)} onSubmit={handleSubmit} isExpired={isExpired} isSubmitted={isSubmitted}/>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                .overflow-y-auto::-webkit-scrollbar { width: 6px; }
                .overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
                .overflow-y-auto::-webkit-scrollbar-thumb { background-color: rgba(139, 92, 246, 0.4); border-radius: 20px; border: 3px solid transparent; }
                .overflow-y-auto::-webkit-scrollbar-thumb:hover { background-color: rgba(139, 92, 246, 0.6); }

                .ping-animation {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border: 3px solid #5eead4; /* teal-300 */
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: ping-effect 2s ease-out forwards;
                    pointer-events: none;
                    z-index: 9999;
                }

                @keyframes ping-effect {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                        box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.7);
                    }
                    70% {
                        transform: translate(-50%, -50%) scale(1.5);
                        opacity: 0;
                        box-shadow: 0 0 10px 20px rgba(94, 234, 212, 0);
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

const TabButton: React.FC<{id: string, controls: string, label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void}> = ({ id, controls, label, icon, isActive, onClick }) => (
    <button role="tab" id={id} aria-controls={controls} aria-selected={isActive} onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors border-b-2 ${isActive ? 'text-purple-300 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'}`}>
        {icon}
        <span className="hidden lg:inline">{label}</span>
    </button>
);


export default BattleRoom;