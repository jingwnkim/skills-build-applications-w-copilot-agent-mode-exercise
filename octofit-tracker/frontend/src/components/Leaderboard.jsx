import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'userId', label: 'User' },
  { key: 'teamId', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

function Leaderboard() {
  return <CollectionPage title="Leaderboard" collection="leaderboard" columns={columns} />
}

export default Leaderboard
