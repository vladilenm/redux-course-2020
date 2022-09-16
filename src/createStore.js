export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, {type: '__INIT__'})
  const subscribers = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(sub => sub())
    },
    subscribe(callback) {
      subscribers.push(callback)
    },
    getState() {
      return state
    }
  }
}
