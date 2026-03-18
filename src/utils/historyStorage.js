const DB_NAME = 'peacekeys-db'
const DB_VERSION = 1
const STORE_NAME = 'history'
const LEGACY_KEY = 'peacekeys-history'
const MAX_HISTORY_ITEMS = 100

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function getAll(store) {
  return new Promise((resolve, reject) => {
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result ?? [])
    request.onerror = () => reject(request.error)
  })
}

function sortHistory(records) {
  return [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

function parseLegacyHistory(raw) {
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function loadHistory() {
  const db = await openDb()

  try {
    const existing = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)

      getAll(store).then(resolve).catch(reject)
    })

    if (existing.length > 0) {
      return sortHistory(existing)
    }

    const legacy = parseLegacyHistory(localStorage.getItem(LEGACY_KEY))
    const migrated = sortHistory(legacy).slice(0, MAX_HISTORY_ITEMS)

    if (migrated.length > 0) {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite')
        const store = tx.objectStore(STORE_NAME)

        migrated.forEach((record) => {
          store.put(record)
        })

        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
        tx.onabort = () => reject(tx.error)
      })

      localStorage.removeItem(LEGACY_KEY)
    }

    return migrated
  } finally {
    db.close()
  }
}

export async function saveHistoryRecord(record) {
  const db = await openDb()

  try {
    const existing = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)

      getAll(store).then(resolve).catch(reject)
    })

    const updated = sortHistory([record, ...existing]).slice(0, MAX_HISTORY_ITEMS)

    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)

      store.clear()
      updated.forEach((item) => {
        store.put(item)
      })

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })

    return updated
  } finally {
    db.close()
  }
}
