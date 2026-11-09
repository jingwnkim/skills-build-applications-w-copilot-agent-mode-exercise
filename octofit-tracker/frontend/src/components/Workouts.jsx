import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'exercises', label: 'Exercises' },
]

function Workouts() {
  return <CollectionPage title="Workouts" collection="workouts" endpoint={endpoint} columns={columns} />
}

export default Workouts
