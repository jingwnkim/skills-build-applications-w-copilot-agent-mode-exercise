import { Router } from 'express'
import { Workout } from '../models/Workout.js'

export const workoutsRouter = Router()

workoutsRouter.get('/', async (_request, response) => {
  const workouts = await Workout.find().exec()
  response.json(workouts)
})
