import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { actions as authActions, getLoggedUser } from '../../redux/modules/auth'

import Header from '../../components/Header'
import PostList from '../PostList'
import Post from '../Post'

const Home = ({ user, logout, setLoginInfo }) => {
  const match = useRouteMatch()
  const location = useLocation()
  const username = user && user.username ? user.username : ""
  let logoutTimer;

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("userData"))
  if (!user && !user.userId && storedData && storedData.userId) {
    setLoginInfo(
      storedData.userId,
      storedData.username,
      storedData.email,
      storedData.token
    )
  }

  if (storedData && storedData.expiration) {
    const remainingTime = new Date(storedData.expiration).getTime() - new Date().getTime()
    logoutTimer = setTimeout(logout, remainingTime)
  } else {
    clearTimeout(logoutTimer)
  }
}, [setLoginInfo, user])

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