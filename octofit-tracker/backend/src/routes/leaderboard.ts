import { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard.js'

export const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response) => {
  const entries = await Leaderboard.find().sort({ rank: 1, points: -1 }).exec()
  response.json(entries)
})
