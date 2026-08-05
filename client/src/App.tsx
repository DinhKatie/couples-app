import Login from './pages/Login'
import SignUp from './pages/Signup'
import Room from './pages/Room'
import { Navigate, Route, Routes } from 'react-router-dom'
import Notes from './pages/Notes'
import Pair from './pages/Pair'
import { useAuth } from './context/AuthContext'
import Photos from './pages/Photos'

function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/room" element={<Room />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/pair" element={<Pair />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </>
  )
}

export default App
