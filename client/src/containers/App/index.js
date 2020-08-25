import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { actions as appActions, getError, getRequestQuantity } from '../../redux/modules/app'
import asyncComponent from '../../utils/AsyncComponent'

import Loading from '../../components/Loading'
import ModalDialog from '../../components/ModalDialog'
const AsyncHome = asyncComponent(() => import('../Home'))
const AsyncAuth = asyncComponent(() => import("../Auth"));

const App = ({ error, requestQuantity, state, removeError }) => {

  useEffect(() => {
    return () => {
      localStorage.setItem("bbsState", JSON.stringify(state))
    }
  })

  const errorDialog = error && (
    <ModalDialog onClose={removeError}>
      {error.message || error}
    </ModalDialog>
  )
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={AsyncHome} />
          <Route path="/posts" component={AsyncHome} />
          <Route path="/auth" component={AsyncAuth} />
        </Switch>
      </Router>
      {errorDialog}
      {requestQuantity > 0 && <Loading />}
    </div>
  )
}

const mapStateToProps = state => ({
  error: getError(state),
  state: state,
  requestQuantity: getRequestQuantity(state)
})

export default connect(mapStateToProps, appActions )(App)