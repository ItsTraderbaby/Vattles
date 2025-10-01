import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { TrophyIcon, UserIcon, StarIcon } from './icons';

type Achievement = {
  id: string;
  title: string;
  description?: string;
  earnedAt?: string; // ISO date
  icon?: string;
};

type SkillEndorsement = {
  id: string;
  skill: string;
  count: number;
  endorsers?: string[];
};

type Rivalry = {
  id: string;
  rivalUserId: string;
  rivalUserName: string;
  status: 'active' | 'cooldown' | 'historic';
  since?: string; // ISO
};

interface ProfileViewProps {
  user: UserProfile;
}

function fmt(date?: string) {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return date;
  }
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [endorsements, setEndorsements] = useState<SkillEndorsement[]>([]);
  const [rivalries, setRivalries] = useState<Rivalry[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr('');

      const mockAchievements: Achievement[] = [
        { id: 'a1', title: 'First Vattle Win', description: 'Won your first Vattle.', earnedAt: '2025-06-01T12:00:00Z', icon: '🏆' },
        { id: 'a2', title: 'Crowd Favorite', description: 'Top-voted submission in a bracket.', earnedAt: '2025-08-15T09:15:00Z', icon: '🌟' },
      ];

      const mockEndorsements: SkillEndorsement[] = [
        { id: 's1', skill: 'CSS', count: 12, endorsers: ['nova', 'synth', 'root'] },
        { id: 's2', skill: 'React', count: 18, endorsers: ['pixel', 'byte', 'zeta'] },
        { id: 's3', skill: 'Accessibility', count: 9, endorsers: ['ally', 'aria'] },
      ];

      const mockRivalries: Rivalry[] = [
        { id: 'r1', rivalUserId: 'u_002', rivalUserName: 'NeonSamurai', status: 'active', since: '2025-05-10T00:00:00Z' },
        { id: 'r2', rivalUserId: 'u_003', rivalUserName: 'BugHunter', status: 'historic', since: '2024-11-20T00:00:00Z' },
      ];

      try {
        await new Promise((r) => setTimeout(r, 300));
        if (!mounted) return;
        setAchievements(mockAchievements);
        setEndorsements(mockEndorsements);
        setRivalries(mockRivalries);
      } catch {
        if (!mounted) return;
        setErr('Failed to load profile data.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user.id]);

  if (loading) {
    return (
      <section aria-busy="true" className="p-6 text-gray-300">
        Loading profile…
      </section>
    );
  }

  if (err) {
    return (
      <section role="alert" className="p-6 text-red-300">
        {err}
      </section>
    );
  }

  return (
    <section className="p-6 space-y-8 text-gray-200">
      {/* Header */}
      <header className="flex items-center gap-4">
        <img
          src={user.avatarUrl}
          alt={`${user.name}'s avatar`}
          className="h-20 w-20 rounded-full border-2 border-purple-500/40 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          {/* removed username/bio lines to match your UserProfile type */}
        </div>
      </header>

      {/* Achievements */}
      <section aria-labelledby="achievements-heading" className="bg-gray-900/40 border border-gray-700/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrophyIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
          <h2 id="achievements-heading" className="text-lg font-semibold text-white">
            Achievements
          </h2>
        </div>
        {achievements.length === 0 ? (
          <p className="text-gray-400">No achievements yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((a) => (
              <li key={a.id} className="rounded-md border border-gray-700/50 p-3 bg-black/30">
                <div className="flex items-start gap-3">
                  <div className="text-2xl" aria-hidden="true">{a.icon ?? '🏅'}</div>
                  <div>
                    <h3 className="text-white font-semibold">{a.title}</h3>
                    {a.description && <p className="text-gray-400 text-sm">{a.description}</p>}
                    {a.earnedAt && (
                      <p className="text-gray-500 text-xs mt-1">Earned {fmt(a.earnedAt)}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Skill Endorsements */}
      <section aria-labelledby="endorsements-heading" className="bg-gray-900/40 border border-gray-700/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <StarIcon className="h-5 w-5 text-blue-300" aria-hidden="true" />
          <h2 id="endorsements-heading" className="text-lg font-semibold text-white">
            Skill Endorsements
          </h2>
        </div>
        {endorsements.length === 0 ? (
          <p className="text-gray-400">No endorsements yet.</p>
        ) : (
          <ul className="space-y-2">
            {endorsements.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-md border border-gray-700/50 p-3 bg-black/30"
              >
                <div>
                  <p className="text-white font-medium">{s.skill}</p>
                  {s.endorsers && s.endorsers.length > 0 && (
                    <p className="text-gray-500 text-xs">
                      Endorsed by {s.endorsers.slice(0, 3).join(', ')}
                      {s.endorsers.length > 3 ? ` +${s.endorsers.length - 3}` : ''}
                    </p>
                  )}
                </div>
                <span className="text-purple-300 font-bold">{s.count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Rivalries */}
      <section aria-labelledby="rivalries-heading" className="bg-gray-900/40 border border-gray-700/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <UserIcon className="h-5 w-5 text-pink-300" aria-hidden="true" />
          <h2 id="rivalries-heading" className="text-lg font-semibold text-white">
            Rivalries
          </h2>
        </div>
        {rivalries.length === 0 ? (
          <p className="text-gray-400">No rivalries yet.</p>
        ) : (
          <ul className="space-y-2">
            {rivalries.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-md border border-gray-700/50 p-3 bg-black/30"
              >
                <div>
                  <p className="text-white font-medium">@{r.rivalUserName}</p>
                  {r.since && <p className="text-gray-500 text-xs">Since {fmt(r.since)}</p>}
                </div>
                <span
                  className={
                    r.status === 'active'
                      ? 'text-green-300'
                      : r.status === 'cooldown'
                      ? 'text-yellow-300'
                      : 'text-gray-400'
                  }
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default ProfileView;
