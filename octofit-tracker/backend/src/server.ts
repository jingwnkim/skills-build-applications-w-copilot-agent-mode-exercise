import express from 'express'
import { connectDatabase } from './config/database.js'
import { activitiesRouter } from './routes/activities.js'
import { leaderboardRouter } from './routes/leaderboard.js'
import { teamsRouter } from './routes/teams.js'
import { usersRouter } from './routes/users.js'
import { workoutsRouter } from './routes/workouts.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error)
  response.status(500).json({ error: 'Internal server error' })
})

async function startServer(): Promise<void> {
  await connectDatabase()
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${baseUrl}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error)
  process.exitCode = 1
})
