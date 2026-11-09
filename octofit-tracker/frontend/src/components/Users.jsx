import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'teamId', label: 'Team' },
]

function Users() {
  return <CollectionPage title="Users" collection="users" columns={columns} />
}

export default Users
