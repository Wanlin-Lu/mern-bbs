import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Header = ({username, location, onLogout }) => (
  <header className="header">
    <div className="nav">
      <span className="left-link">
        <Link to="/">首页</Link>
      </span>
      {username && username.length > 0 ? (
        <span className="user">
          当前用户：{username}&nbsp;<button onClick={onLogout}>注销</button>
        </span>
      ) : (
          <span className="right-link">
            <Link to={{ pathname:"/auth", state: { from: location } }}>
              登录
            </Link>
          </span>
      )}
    </div>
  </header>
)

export default Header