import './App.css'
import { Route,Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Start from './components/Start'
import Verify from './components/verify'
function App() {

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/' element={<Start/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
      </Routes>

    </>
  )
}

export default App
