import React, { useState, useEffect } from 'react'

const asyncComponent = (importComponent) => {
  const AsyncComponent = ( ) => {
    const [C, setComponent] = useState(null)

    useEffect(() => {
      importComponent().then(mod => {
        setComponent(mod.default ? mod.default : mod)
      })
    }, [importComponent])
    
    return (
      C ? <C /> : null
    )
  }
  return AsyncComponent
}

export default asyncComponent