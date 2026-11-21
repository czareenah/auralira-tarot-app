# Local persistence

AsyncStorage is installed for future non-sensitive session progress. Add a small
adapter here when persistence is implemented. Use a versioned storage key and
snapshot, validate restored data, and handle missing/corrupt data and read/write
failures. Session reset must also update the saved snapshot. Keep platform storage
calls outside the state reducer. No session data is stored by this setup.
