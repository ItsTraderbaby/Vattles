import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import {
  LogoIcon,
  TrophyIcon,
  UserGroupIcon,
  BeakerIcon,
  UserIcon,
  SignalIcon,
  SparklesIcon,
} from './icons';

interface HeaderProps {
  userProfile: UserProfile;
  onNavigate: (view: string) => void;
  onOpenCreateVattle: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userProfile,
  onNavigate,
  onOpenCreateVattle,
  onLogout,
}) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-gray-700/50 p-4 sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onNavigate('arena')}
            className="flex items-center gap-2"
          >
            <LogoIcon className="h-10 w-10" />
            <span className="font-orbitron text-xl font-bold tracking-widest text-white uppercase hidden sm:block">
              VATTLES
            </span>
          </button>

          <nav
            role="navigation"
            className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-300"
          >
            <button
              type="button"
              onClick={() => onNavigate('rankings')}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <TrophyIcon className="h-4 w-4" aria-hidden="true" /> Rankings
            </button>
            <button
              type="button"
              onClick={() => onNavigate('tournaments')}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <UserGroupIcon className="h-4 w-4" aria-hidden="true" /> Tournaments
            </button>
            <button
              type="button"
              onClick={() => onNavigate('vibelabs')}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <BeakerIcon className="h-4 w-4" aria-hidden="true" /> Vibe Labs
            </button>
            <button
              type="button"
              onClick={() => onNavigate('alfred')}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <SparklesIcon className="h-4 w-4" aria-hidden="true" /> Alfred
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenCreateVattle}
            className="px-4 py-2 font-semibold rounded-lg text-sm transition-all bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
          >
            Create Vattle
          </button>

          <div className="relative" ref={menuRef}>
            <button
              id="profile-menu-button"
              type="button"
              aria-haspopup="menu"
              aria-controls="profile-menu"
              aria-expanded={isProfileMenuOpen}
              onClick={() => setProfileMenuOpen((o) => !o)}
              className="flex items-center gap-2"
            >
              <img
                src={userProfile.avatarUrl}
                alt={`${userProfile.name}'s profile`}
                className="h-10 w-10 rounded-full border-2 border-purple-400/50 hover:border-purple-300 transition-colors"
              />
              <span className="text-white font-semibold hidden lg:block">
                {userProfile.name}
              </span>
            </button>

            <div
              id="profile-menu"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="profile-menu-button"
              aria-hidden={isProfileMenuOpen ? 'false' : 'true'}
              hidden={!isProfileMenuOpen}
              className={`absolute top-full right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg transition-all duration-200 ${
                isProfileMenuOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="py-1" role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onNavigate('profile');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-3"
                >
                  <UserIcon className="h-4 w-4" aria-hidden="true" />
                  My Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onNavigate('streaming');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-3"
                >
                  <SignalIcon className="h-4 w-4" aria-hidden="true" />
                  Streaming Overlays
                </button>
              </div>
              <div className="py-1" role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
