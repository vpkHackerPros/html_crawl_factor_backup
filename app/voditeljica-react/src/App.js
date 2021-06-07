import './App.css'
import React, { useState, useEffect } from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import Controller from './Controller.js'
import Monitor from './Monitor.js'

function App() {
  const [mode, setMode] = useState(0)
  if (mode == 0) {
    return (
      <div>
        <button onClick={() => setMode(1)}>kontoler</button>
        <button onClick={() => setMode(2)}>monitor</button>
      </div>
    ) 
  } else if (mode == 1) {
    return(
      <Controller />
    )
  } else {
    return (
      <Monitor />
    )
  }
}

export default App
