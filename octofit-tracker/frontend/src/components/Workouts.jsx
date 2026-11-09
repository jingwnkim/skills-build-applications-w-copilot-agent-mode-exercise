import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'exercises', label: 'Exercises' },
]

function Workouts() {
  return <CollectionPage title="Workouts" collection="workouts" columns={columns} />
}

export default Workouts
