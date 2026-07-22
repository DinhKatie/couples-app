import Login from './pages/Login'
import SignUp from './pages/Signup'
import Room from './pages/Room'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </>
  )
}

export default App
