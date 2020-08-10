import React from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { actions as authActions, getLoggedUser } from '../../redux/modules/auth'

import Header from '../../components/Header'
import PostList from '../PostList'
import Post from '../Post'

const Home = ({ user, logout }) => {
  const match = useRouteMatch()
  const location = useLocation()
  const username = user && user.username ? user.username : ""

  return (
    <div>
      <Header
        username={username}
        location={location}
        onLogout={logout}
      />
      <Route
        path={match.url}
        exact
        render={props => <PostList {...props} />}
      />
      <Route
        path={`${match.url}/:id`}
        render={props => <Post {...props} />}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  user: getLoggedUser(state)
})

export default connect(mapStateToProps,authActions)(Home)