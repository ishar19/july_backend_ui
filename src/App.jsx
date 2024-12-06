import './App.css'
import { useState } from 'react'
import { register, login } from './services'
function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  })
  const [loginformData, setLoginformData] = useState({
    email: '',
    password: '',
  })
  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await register(formData)
    if (res.status === 200) {
      alert('registered successfully')
    }
    else {
      console.log(res)
      alert('error')
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login(loginformData)
    if (res.status === 200) {
      alert('logged in successfully')
    }
    else {
      console.log(res)
      alert('error')
    }
  }
  return (
    <>

      <form onSubmit={handleRegister}>
        <input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.name} name="name" placeholder="enter name" />
        <input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.mobile} name="mobile" placeholder="enter mobile" />
        <input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.email} name="email" placeholder="enter email" />
        <input type="password" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.password} name="password" placeholder="enter password" />
        <button type="submit">submit</button>
      </form>

      <form onSubmit={handleLogin}>
        <input type="email" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.email} name="email" placeholder="enter email" />
        <input type="password" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.password} name="password" placeholder="enter password" />
        <button type="submit">submit</button>
      </form>
    </>
  )
}

export default App
