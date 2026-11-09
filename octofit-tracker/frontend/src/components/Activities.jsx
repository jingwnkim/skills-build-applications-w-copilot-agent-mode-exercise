import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'userId', label: 'User' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  { key: 'completedAt', label: 'Completed' },
]

function Activities() {
  return <CollectionPage title="Activities" collection="activities" columns={columns} />
}

export default Activities
