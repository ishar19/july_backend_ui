import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import NewJob from './pages/newJob'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newJob" element={<NewJob />} />
        <Route path="/editJob/:id" element={<NewJob />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


// homework????
// create two seperate routes for register and login (/register and /login) i.e., add react-router-dom