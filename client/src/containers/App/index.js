import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../Home'
import Auth from '../Auth'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts" component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    </div>
  )
}

export default App