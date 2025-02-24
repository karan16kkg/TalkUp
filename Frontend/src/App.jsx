import './App.css'
import { Route,Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Start from './components/Start'
// import Verify from './components/verify'
import Chat from './components/Home/Chat'
import Profile from './components/Home/Profile'
import GroupChat from './components/Home/GroupChat'
import UpdateGroup from './components/Home/UpdateGroup'
import ScrollableChat from './components/Home/ScrollableChat'
import Notification from './components/Home/Notification'
function App() {

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/' element={<Start/>}></Route>
        {/* <Route path='/verify' element={<Verify/>}></Route> */}
        <Route path='/chats' element={<Chat/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/group' element={<GroupChat/>}></Route>
        <Route path='/updategroup' element={<UpdateGroup/>}></Route>
        <Route path='/scrollChat' element={<ScrollableChat/>}></Route>
        <Route path='/notification' element={<Notification/>}></Route>
      </Routes>

    </>
  )
}

export default App
