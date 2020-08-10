import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'


const ModalDialog = ({onClose, children}) => {
  const content = (
    <div className="modalDialog" onClick={onClose}>
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <div className="message">{children}</div>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

export default ModalDialog