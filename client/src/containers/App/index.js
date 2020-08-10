import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { actions as appActions, getError, getRequestQuantity } from '../../redux/modules/app'

import Loading from '../../components/Loading'
import ModalDialog from '../../components/ModalDialog'
import Home from '../Home'
import Auth from '../Auth'

const App = ({ error, requestQuantity, removeError }) => {
  const errorDialog = error && (
    <ModalDialog onClose={removeError}>
      {error.message || error}
    </ModalDialog>
  )
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts" component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
      {errorDialog}
      {requestQuantity > 0 && <Loading />}
    </div>
  )
}

const mapStateToProps = state => ({
  error: getError(state),
  requestQuantity: getRequestQuantity(state)
})

export default connect(mapStateToProps, appActions )(App)