import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'


const Loading = () => {
  return ReactDOM.createPortal(
    <div className="loading">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>,
    document.getElementById("loading-hook")
  );
}

export default Loading