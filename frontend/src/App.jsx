import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/landingPage/Home'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
