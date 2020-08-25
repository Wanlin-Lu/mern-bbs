import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './modules'

let finalCreateStore

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  finalCreateStore = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore)
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore)
}

let lastState = JSON.parse(localStorage.getItem('bbsState')) || {}

export default function configureStore() {
  const store = finalCreateStore(rootReducer, lastState)

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./modules", () => store.replaceReducer(require("./modules")))
  }
  return store
}