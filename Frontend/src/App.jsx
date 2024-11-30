import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Start from './components/Start'

function App() {

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/' element={<Start/>}></Route>
      </Routes>

    </>
  )
}

export default App
