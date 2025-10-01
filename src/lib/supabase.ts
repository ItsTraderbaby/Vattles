import { createClient } from '@supabase/supabase-js'
import { UserProfile, VattleConfig, LeaderboardUser, SkillEndorsement, RivalryMatch, VotingRecord, Ratings } from '../../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database service functions
export class DatabaseService {
  // User Profile operations
  static async saveUserProfile(userId: string, profile: UserProfile): Promise<void> {
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        name: profile.name,
        avatar_url: profile.avatarUrl,
        join_date: profile.joinDate,
        role: profile.role,
        status: profile.status,
        has_completed_onboarding: profile.hasCompletedOnboarding,
        stats: profile.stats,
        vibe_analysis: profile.vibeAnalysis,
        last_vibe_recalibration: profile.lastVibeRecalibration,
        profile_theme: profile.profileTheme,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) throw error
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    if (!data) return null

    return {
      id: data.id,
      name: data.name,
      avatarUrl: data.avatar_url,
      joinDate: data.join_date,
      role: data.role,
      status: data.status,
      hasCompletedOnboarding: data.has_completed_onboarding,
      stats: data.stats,
      vibeAnalysis: data.vibe_analysis,
      lastVibeRecalibration: data.last_vibe_recalibration,
      profileTheme: data.profile_theme,
      portfolio: [], // Will be loaded separately
      showcase: [], // Will be loaded separately
      achievements: [], // Will be loaded separately
      endorsements: [], // Will be loaded separately
      rivalries: [], // Will be loaded separately
      promptLibrary: [], // Will be loaded separately
      currentVibeTrack: { title: 'No track generated', isPlaying: false }
    }
  }

  // Vattle operations
  static async saveVattle(vattle: VattleConfig): Promise<void> {
    const { error } = await supabase
      .from('vattles')
      .upsert({
        id: vattle.id,
        theme: vattle.theme,
        creator_name: vattle.creatorName,
        invited_opponent: vattle.invitedOpponent,
        student_name: vattle.studentName,
        status: vattle.status,
        mode: vattle.mode,
        opponent: vattle.opponent,
        time_limit: vattle.timeLimit,
        start_time: vattle.startTime,
        winner: vattle.winner,
        is_featured: vattle.isFeatured,
        is_trending: vattle.isTrending,
        is_rivalry_match: vattle.isRivalryMatch,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) throw error
  }

  static async getVattles(): Promise<VattleConfig[]> {
    const { data, error } = await supabase
      .from('vattles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(vattle => ({
      id: vattle.id,
      theme: vattle.theme,
      creatorName: vattle.creator_name,
      invitedOpponent: vattle.invited_opponent,
      studentName: vattle.student_name,
      status: vattle.status,
      mode: vattle.mode,
      opponent: vattle.opponent,
      timeLimit: vattle.time_limit,
      startTime: vattle.start_time,
      winner: vattle.winner,
      isFeatured: vattle.is_featured,
      isTrending: vattle.is_trending,
      isRivalryMatch: vattle.is_rivalry_match
    }))
  }

  static async updateVattleStatus(vattleId: string, status: VattleConfig['status'], winner?: string): Promise<void> {
    const { error } = await supabase
      .from('vattles')
      .update({
        status,
        winner,
        updated_at: new Date().toISOString()
      })
      .eq('id', vattleId)

    if (error) throw error
  }

  // Leaderboard operations
  static async getLeaderboard(): Promise<LeaderboardUser[]> {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('mmr', { ascending: false })
      .limit(100)

    if (error) throw error

    return (data || []).map(user => ({
      id: user.id,
      rank: user.rank,
      username: user.username,
      avatarUrl: user.avatar_url,
      status: user.status,
      mmr: user.mmr,
      wins: user.wins,
      losses: user.losses,
      mainVibe: user.main_vibe
    }))
  }

  static async updateLeaderboard(userId: string, stats: { mmr?: number; wins?: number; losses?: number }): Promise<void> {
    const { error } = await supabase
      .from('leaderboard')
      .upsert({
        id: userId,
        ...stats,
        updated_at: new Date().toISOString()
      })

    if (error) throw error
  }

  // Alfred settings operations
  static async saveAlfredSettings(userId: string, settings: any): Promise<void> {
    const { error } = await supabase
      .from('alfred_settings')
      .upsert({
        user_id: userId,
        settings,
        updated_at: new Date().toISOString()
      })

    if (error) throw error
  }

  static async getAlfredSettings(userId: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('alfred_settings')
      .select('settings')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data?.settings || null
  }

  // Stats and Achievement Management
  static async updateUserStats(userId: string, vattleResult: 'win' | 'loss' | 'draw', mode: 'standard' | 'coaching', opponentName: string): Promise<void> {
    try {
      // Get current profile
      const profile = await this.getUserProfile(userId);
      if (!profile) return;

      const updates: any = {
        stats: { ...profile.stats }
      };

      // Update basic stats
      updates.stats.vattlesPlayed = (profile.stats.vattlesPlayed || 0) + 1;

      if (vattleResult === 'win') {
        updates.stats.wins = (profile.stats.wins || 0) + 1;
      } else if (vattleResult === 'loss') {
        updates.stats.losses = (profile.stats.losses || 0) + 1;
      }

      // Update coaching stats
      if (mode === 'coaching') {
        if (profile.role === 'coach') {
          updates.stats.lessonsGiven = (profile.stats.lessonsGiven || 0) + 1;
        } else {
          updates.stats.classesTaken = (profile.stats.classesTaken || 0) + 1;
        }
      }

      // Calculate win rate
      const totalGames = updates.stats.wins + updates.stats.losses;
      updates.stats.winRate = totalGames > 0 ? (updates.stats.wins / totalGames) * 100 : 0;

      // Update profile
      await supabase
        .from('user_profiles')
        .update({
          stats: updates.stats,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      // Update leaderboard
      const mmrChange = vattleResult === 'win' ? 25 : vattleResult === 'loss' ? -15 : 5;
      await this.updateLeaderboard(userId, {
        mmr: (profile.stats.mmr || 1200) + mmrChange,
        wins: updates.stats.wins,
        losses: updates.stats.losses
      });

      // Check for new achievements
      await this.checkAndUnlockAchievements(userId, updates.stats);

      // Update rivalries
      await this.updateRivalry(userId, opponentName, vattleResult);

    } catch (error) {
      console.error('Failed to update user stats:', error);
      throw error;
    }
  }

  static async checkAndUnlockAchievements(userId: string, stats: any): Promise<void> {
    const achievementDefinitions = [
      { id: 'first-win', name: 'First Victory', description: 'Win your first Vattle', condition: (s: any) => s.wins >= 1 },
      { id: 'vattle-veteran', name: 'Vattle Veteran', description: 'Complete 10 Vattles', condition: (s: any) => s.vattlesPlayed >= 10 },
      { id: 'win-streak', name: 'Winning Streak', description: 'Win 5 Vattles in a row', condition: (s: any) => s.wins >= 5 },
      { id: 'coach', name: 'Mentor', description: 'Give 5 coaching sessions', condition: (s: any) => s.lessonsGiven >= 5 },
      { id: 'student', name: 'Eager Learner', description: 'Take 5 classes', condition: (s: any) => s.classesTaken >= 5 },
      { id: 'perfectionist', name: 'Perfectionist', description: 'Achieve 90%+ win rate', condition: (s: any) => s.winRate >= 90 },
    ];

    try {
      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', userId);

      const unlockedIds = userAchievements?.map(ua => ua.achievement_id) || [];

      for (const achievement of achievementDefinitions) {
        if (!unlockedIds.includes(achievement.id) && achievement.condition(stats)) {
          await supabase
            .from('user_achievements')
            .insert({
              user_id: userId,
              achievement_id: achievement.id,
              unlocked_at: new Date().toISOString()
            });
        }
      }
    } catch (error) {
      console.error('Failed to check achievements:', error);
    }
  }

  static async updateRivalry(userId: string, opponentName: string, result: 'win' | 'loss' | 'draw'): Promise<void> {
    try {
      const { data: existingRivalry } = await supabase
        .from('rivalries')
        .select('*')
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .eq('user1_name', opponentName)
        .single();

      if (existingRivalry) {
        const updates: any = {};
        if (result === 'win') {
          updates.user1_score = existingRivalry.user1_id === userId
            ? existingRivalry.user1_score + 1
            : existingRivalry.user2_score + 1;
        } else if (result === 'loss') {
          updates.user2_score = existingRivalry.user1_id === userId
            ? existingRivalry.user2_score + 1
            : existingRivalry.user1_score + 1;
        }

        await supabase
          .from('rivalries')
          .update(updates)
          .eq('id', existingRivalry.id);
      } else {
        // Create new rivalry
        await supabase
          .from('rivalries')
          .insert({
            user1_id: userId,
            user2_id: 'temp', // Would need to look up opponent ID
            user1_name: userId,
            user2_name: opponentName,
            user1_score: result === 'win' ? 1 : 0,
            user2_score: result === 'loss' ? 1 : 0,
            created_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Failed to update rivalry:', error);
    }
  }

  static async addEndorsement(fromUserId: string, toUserId: string, skill: string): Promise<void> {
    try {
      await supabase
        .from('endorsements')
        .insert({
          from_user_id: fromUserId,
          to_user_id: toUserId,
          skill: skill,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Failed to add endorsement:', error);
    }
  }

  static async recordVote(userId: string, vattleId: string, submissionId: string, ratings: any): Promise<void> {
    try {
      await supabase
        .from('voting_history')
        .insert({
          user_id: userId,
          vattle_id: vattleId,
          submission_id: submissionId,
          ratings: ratings,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Failed to record vote:', error);
    }
  }



  // Generic error handler
  static handleError(error: any): string {
    console.error('Database error:', error)
    if (error?.message?.includes('JWT')) {
      return 'Authentication error. Please log in again.'
    }
    if (error?.message?.includes('network')) {
      return 'Network error. Please check your connection.'
    }
    return error?.message || 'An unexpected error occurred.'
  }
}

export default supabase
