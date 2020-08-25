import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { actions as authActions, getLoggedUser } from '../../redux/modules/auth'
import asyncComponent from '../../utils/AsyncComponent'

import Header from '../../components/Header'
const AsyncPostList = asyncComponent(() => import("../PostList"));
const AsyncPost = asyncComponent(() => import('../Post'))

const Home = ({ user, logout, setUserData }) => {
  const match = useRouteMatch()
  const location = useLocation()
  const username = user && user.username ? user.username : ""
  const logoutTimer = useRef(null)

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("userData"))
  if (!user.userId && storedData && storedData.userId) {
    setUserData(
      storedData.userId,
      storedData.username,
      storedData.email,
      storedData.token
    )
  }

  if (storedData && storedData.expiration) {
    const remainingTime = new Date(storedData.expiration).getTime() - new Date().getTime()
    logoutTimer.current = setTimeout(logout, remainingTime)
  } else {
    clearTimeout(logoutTimer.current)
  }
}, [setUserData, user, logout])

  return (
    <div>
      <Header username={username} location={location} onLogout={() => { logout() }} />
      <Route path={match.url} exact>
        <AsyncPostList />
      </Route>
      <Route
        path={`${match.url}/:id`}
        render={(props) => <AsyncPost {...props} />}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  user: getLoggedUser(state)
})

export default connect(mapStateToProps,authActions)(Home)