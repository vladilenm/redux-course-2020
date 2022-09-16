import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import {rootReducer} from './redux/rootReducer'
import {asyncIncrement, changeTheme, decrement, increment} from './redux/actions'
import './styles.css'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) {
//   return function(next) {
//     return function(action) {
//       console.log('Prev State', state.getState())
//       console.log('Action', action)
//       const newState = next(action)
//       console.log('New State', newState)
//       return newState
//     }
//   }
// }

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
)

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light'
  store.dispatch(changeTheme(newTheme))
})


store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  })
})

store.dispatch({ type: 'INIT_APPLICATION' })
