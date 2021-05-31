import React from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <p className="heading">Search Wars!</p>
      </header>
      <div className="search-container">
        <div className="search-row">
          <p className="label">Search Term 1</p>
          <input className="search" type="text" />
        </div>
        <div className="search-row">
          <p className="label">Search Term 2</p>
          <input className="search" type="text" />
        </div>
      </div>
      <button className="submit-btn">FIGHT</button>
    </div>
  )
}

export default App
