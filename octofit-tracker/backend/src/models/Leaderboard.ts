import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, default: 'all-time' },
  },
  { timestamps: true, collection: 'leaderboard' },
)

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
