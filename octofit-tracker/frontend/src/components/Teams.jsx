import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'memberIds', label: 'Members' },
  { key: 'points', label: 'Points' },
]

function Teams() {
  return <CollectionPage title="Teams" collection="teams" columns={columns} />
}

export default Teams
