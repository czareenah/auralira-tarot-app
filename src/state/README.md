# Application state

Future session types and a pure reducer live here; use React context when shared
state is needed. No extra state-management dependency is required for setup.

The reducer will own remaining, selected, revealed, discarded, and jumper card IDs,
mode changes, and reset. Each card must occupy a single session location to prevent
duplicate draws. Gestures dispatch actions; components render state. Add rule tests
alongside each feature. No session state or business logic is implemented yet.
