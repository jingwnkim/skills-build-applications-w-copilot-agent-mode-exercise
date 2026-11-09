import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

function CollectionPage({ title, collection, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        setRecords(await fetchCollection(endpoint, controller.signal))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [collection, endpoint])

  return (
    <section aria-labelledby={`${collection}-heading`}>
      <div className="mb-4">
        <p className="text-uppercase text-primary fw-semibold small mb-1">OctoFit Tracker</p>
        <h1 className="h2 mb-0" id={`${collection}-heading`}>{title}</h1>
      </div>

      <div className="card collection-card">
        {loading ? (
          <div className="card-body d-flex align-items-center gap-2" role="status">
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            Loading {title.toLowerCase()}…
          </div>
        ) : error ? (
          <div className="card-body">
            <div className="alert alert-danger mb-0" role="alert">
              Could not load {title.toLowerCase()}: {error}
            </div>
          </div>
        ) : records.length === 0 ? (
          <div className="card-body text-body-secondary">No {title.toLowerCase()} found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  {columns.map(({ label }) => <th key={label} scope="col">{label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id ?? record.id ?? index}>
                    {columns.map(({ key }) => (
                      <td key={key}>{formatValue(record[key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionPage
