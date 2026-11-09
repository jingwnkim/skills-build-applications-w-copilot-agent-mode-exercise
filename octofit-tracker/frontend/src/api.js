export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const value of [payload.results, payload.data, payload.items]) {
      if (Array.isArray(value)) {
        return value
      }
      if (value && typeof value === 'object' && Array.isArray(value.results)) {
        return value.results
      }
    }
  }

  throw new Error('The API response is not an array or a supported paginated response.')
}
