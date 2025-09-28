import React, { useState } from 'react';
import Modal from './Modal';
import { LogoIcon, GoogleIcon, GithubIcon } from './icons';

import { useAuth } from '../src/contexts/AuthContext';



const AuthView: React.FC = () => {
    const { signIn, signUp, signInWithOAuth, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenModal = (mode: 'login' | 'signup') => {
        setAuthMode(mode);
        setIsModalOpen(true);
        setError(null);
        setEmail('');
        setPassword('');
        setUsername('');
    };

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (authMode === 'login') {
                const { error } = await signIn(email, password);
                if (error) {
                    setError(error.message);
                } else {
                    setIsModalOpen(false);
                }
            } else {
                const { error } = await signUp(email, password, username);
                if (error) {
                    setError(error.message);
                } else {
                    setError('Check your email for the confirmation link!');
                }
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        setError(null);
        const { error } = await signInWithOAuth(provider);
        if (error) {
            setError(error.message);
        }
    };

    const inputStyles = "w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500";
    const buttonStyles = "w-full py-3 mt-4 font-orbitron text-lg font-bold rounded-lg transition-all duration-300";

    return (
        <div className="min-h-screen bg-[#0D0B14] text-gray-200 flex flex-col items-center justify-center p-4 animate-fade-in relative overflow-x-hidden">
            <div className="absolute inset-0 auth-background-gradient"></div>

            <div className="relative z-10 w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-24">
                    <LogoIcon className="h-32 w-32 sm:h-40 sm:w-40 mx-auto" />
                    <h1 className="font-orbitron text-4xl sm:text-5xl font-bold tracking-widest text-white uppercase mt-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300 vattles-title-shadow">
                    VATTLES
                    </h1>
                    <p className="text-lg sm:text-xl text-cyan-300 tracking-[0.2em] uppercase mt-1">
                    Vibe Code. Battle. Create.
                    </p>
                    <p className="max-w-2xl mx-auto mt-6 text-gray-300">
                    The ultimate arena where creative coding meets AI-powered artistry. Challenge opponents, build stunning web apps against the clock, and let the community decide who has the superior vibe.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => handleOpenModal('login')} className="px-10 py-4 font-orbitron text-xl font-bold rounded-lg transition-all duration-300 bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/40 hover:shadow-teal-400/60 transform hover:scale-105">
                            Log In
                        </button>
                    </div>
                </header>

                <main>





                </main>
            </div>


            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={authMode === 'login' ? 'Log In to Vattles' : 'Create Your Vattles Account'}>
                {error && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-300 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleAuthAction} className="space-y-4">
                    {authMode === 'signup' && (
                         <div>
                            <label htmlFor="username" className="block text-sm font-medium text-purple-300 mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                className={inputStyles}
                                placeholder="VibeMaster42"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={inputStyles}
                            placeholder="you@vattles.io"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-purple-300 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={inputStyles}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className={`${buttonStyles} bg-teal-500 text-white shadow-teal-500/30 hover:bg-teal-400 hover:shadow-teal-400/50 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isSubmitting ? 'Processing...' : (authMode === 'login' ? 'Log In' : 'Sign Up')}
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => handleOAuthLogin('google')}
                        disabled={loading}
                        className="w-1/2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-800/50 border border-gray-600 text-white hover:bg-gray-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <GoogleIcon className="h-5 w-5" /> Google
                    </button>
                    <button
                        onClick={() => handleOAuthLogin('github')}
                        disabled={loading}
                        className="w-1/2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-800/50 border border-gray-600 text-white hover:bg-gray-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <GithubIcon className="h-5 w-5" /> GitHub
                    </button>
                </div>
                 <div className="text-center mt-6">
                    <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-sm text-purple-300 hover:text-purple-200 transition-colors">
                        {authMode === 'login' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
                    </button>
                </div>
            </Modal>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.7s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AuthView;
