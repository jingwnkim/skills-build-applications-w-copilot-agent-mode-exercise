import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'memberIds', label: 'Members' },
  { key: 'points', label: 'Points' },
]

function Teams() {
  return <CollectionPage title="Teams" collection="teams" endpoint={endpoint} columns={columns} />
}

export default Teams
