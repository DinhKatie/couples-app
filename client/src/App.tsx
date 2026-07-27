import Login from './pages/Login'
import SignUp from './pages/Signup'
import Room from './pages/Room'
import { Navigate, Route, Routes } from 'react-router-dom'
import Notes from './pages/Notes'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/room" element={<Room />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </>
  )
}

export default App
