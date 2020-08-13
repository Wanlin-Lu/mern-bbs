import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actions as authActions, getLoggedUser } from '../../redux/modules/auth'
import './style.css'


const Auth = ({ user, from, login, signup }) => {
  let [signUpMode, setMode] = useState(false)
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  const changeMode = () => {
    setMode(!signUpMode)
  }

  const handleChange = e => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    } else if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else {}
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    if (signUpMode) {
      signup(username, email, password);
    } else {
      login(email, password);
    }
  }

  if (user && user.userId) {
    return <Redirect to={from || '/'} />
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      {signUpMode && (
        <label>
          用户名：
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
          />
        </label>
      )}
      <label>
        邮箱：
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <label>
        密码：
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value={signUpMode ? "注册" : "登录"} />
      <input type="button" onClick={changeMode} value={signUpMode ? "登录已有账号" : "注册新号码"} />
    </form>
  )
}

const mapStateToProps = (state, props) => ({
  user: getLoggedUser(state),
  from: props.location.state
})

export default connect(mapStateToProps, authActions)(Auth)