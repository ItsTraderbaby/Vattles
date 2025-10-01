
import React, { useState, useEffect } from 'react';
import { UserProfile, ProfileTheme } from '../types';
import Modal from './Modal';
import { CameraIcon, UserIcon, PaletteIcon } from './icons';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSave: (newProfile: UserProfile) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, currentProfile, onSave }) => {
  const [name, setName] = useState(currentProfile.name);
  const [avatarUrl, setAvatarUrl] = useState(currentProfile.avatarUrl);
  const [selectedTheme, setSelectedTheme] = useState<ProfileTheme>(currentProfile.profileTheme || 'default');
  const [nameChangeCooldown, setNameChangeCooldown] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const NAME_CHANGE_COOLDOWN = 6 * 30 * 24 * 60 * 60 * 1000; // 6 months in milliseconds

  useEffect(() => {
    if(isOpen) {
      setName(currentProfile.name);
      setAvatarUrl(currentProfile.avatarUrl);
      setSelectedTheme(currentProfile.profileTheme || 'default');

      // Check name change cooldown
      if (currentProfile.joinDate) {
        const joinDate = new Date(currentProfile.joinDate).getTime();
        const cooldownEndTime = joinDate + NAME_CHANGE_COOLDOWN;

        if (Date.now() < cooldownEndTime) {
          const remaining = cooldownEndTime - Date.now();
          const months = Math.floor(remaining / (30 * 24 * 60 * 60 * 1000));
          const days = Math.floor((remaining % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
          setNameChangeCooldown(`${months}mo ${days}d`);
        } else {
          setNameChangeCooldown('');
        }
      }
    }
  }, [isOpen, currentProfile]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For now, we'll create a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarUrl(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Avatar upload failed:', error);
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    onSave({
      ...currentProfile,
      name,
      avatarUrl,
      profileTheme: selectedTheme
    });
    onClose();
  };

  const themes: { [key in ProfileTheme]: { name: string; description: string; preview: string; } } = {
    default: {
      name: "Default",
      description: "Purple cyberpunk theme",
      preview: "bg-gradient-to-br from-[#0D0B14] to-[#1a0b2e] border-purple-500"
    },
    synthwave: {
      name: "Synthwave",
      description: "80s retro-futuristic",
      preview: "bg-gradient-to-br from-[#2c134d] to-[#130f2b] border-pink-500"
    },
    matrix: {
      name: "Matrix",
      description: "Digital green terminal",
      preview: "bg-[#021a02] border-green-500"
    },
    'brutalist-dark': {
      name: "Brutalist",
      description: "Bold monochrome design",
      preview: "bg-black border-white"
    },
  };

  const avatarOptions = [
    'https://i.pravatar.cc/150?u=Vibemaster',
    'https://i.pravatar.cc/150?u=CyberNinja',
    'https://i.pravatar.cc/150?u=PixelPusher',
    'https://i.pravatar.cc/150?u=CodeWizard',
    'https://i.pravatar.cc/150?u=RetroGamer',
    'https://i.pravatar.cc/150?u=SynthLord',
    'https://i.pravatar.cc/150?u=NeonHacker',
    'https://i.pravatar.cc/150?u=QuantumDev'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        {/* Avatar Section */}
        <div className="text-center">
          <h3 className="font-orbitron text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <CameraIcon className="h-5 w-5" />
            Avatar
          </h3>

          {/* Current Avatar */}
          <div className="relative inline-block mb-4">
            <img
              src={avatarUrl}
              alt={name}
              className={`w-24 h-24 rounded-full border-4 shadow-lg transition-all ${selectedTheme === 'default' ? 'border-purple-400' : selectedTheme === 'synthwave' ? 'border-pink-400' : selectedTheme === 'matrix' ? 'border-green-400' : 'border-white'}`}
            />
            <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 rounded-full p-2 cursor-pointer transition-colors">
              <CameraIcon className="h-4 w-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                aria-label="Upload new avatar"
              />
            </label>
          </div>

          {/* Avatar Options */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {avatarOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setAvatarUrl(option)}
                className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                  avatarUrl === option
                    ? 'border-purple-400 shadow-lg shadow-purple-400/50'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                <img src={option} alt={`Avatar option ${index + 1}`} className="w-full h-full rounded-full" />
              </button>
            ))}
          </div>

          {isUploading && (
            <p className="text-sm text-gray-400">Uploading avatar...</p>
          )}
        </div>

        {/* Name Section */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Username
          </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!!nameChangeCooldown}
            className={`w-full bg-gray-800/50 border rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
              nameChangeCooldown
                ? 'border-gray-600 text-gray-500 cursor-not-allowed'
                : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'
            }`}
            placeholder="Enter your username"
          />
          {nameChangeCooldown ? (
            <p className="text-xs text-orange-400 mt-1">
              Name change available in {nameChangeCooldown}
            </p>
          ) : (
            <p className="text-xs text-gray-400 mt-1">
              You can change your name once every 6 months
            </p>
          )}
        </div>

        {/* Theme Section */}
        <div>
          <h3 className="font-orbitron text-lg font-bold text-white mb-3 flex items-center gap-2">
            <PaletteIcon className="h-5 w-5" />
            Profile Theme
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setSelectedTheme(key as ProfileTheme)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedTheme === key
                    ? 'border-purple-400 bg-purple-600/20'
                    : 'border-gray-600 bg-gray-800/30 hover:border-gray-400'
                }`}
              >
                <div className={`w-full h-8 rounded ${theme.preview} mb-2`}></div>
                <p className="font-semibold text-white text-sm">{theme.name}</p>
                <p className="text-xs text-gray-400">{theme.description}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            This theme will be applied to your entire profile across the site
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 py-3 font-semibold rounded-lg transition-all bg-gray-700 hover:bg-gray-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 font-orbitron font-bold rounded-lg transition-all bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
