import React, { useState, useEffect } from 'react'

const asyncComponent = (importComponent) => {
  const AsyncComponent = (props) => {
    const [C, setComponent] = useState(null)

    useEffect(() => {
      importComponent().then(mod => {
        setComponent(mod.default ? mod.default : mod)
      })
    })
    
    return (
      C ? <C {...props} /> : null
    )
  }
  return AsyncComponent
}

export default asyncComponent