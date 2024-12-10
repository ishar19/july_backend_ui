import { login } from '../services'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/home')
        }
    }, [])
    const [loginformData, setLoginformData] = useState({
        email: '',
        password: '',
    })
    const handleLogin = async (e) => {
        e.preventDefault()
        const res = await login(loginformData)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            localStorage.setItem('token', data.token)
            alert('logged in successfully')
            navigate('/home')
        }
        else {
            console.log(res)
            alert('error')
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <input type="email" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.email} name="email" placeholder="enter email" />
            <input type="password" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.password} name="password" placeholder="enter password" />
            <button type="submit">submit</button>
        </form>
    )
}