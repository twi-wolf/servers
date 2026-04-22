import '../styles/global.css'
import '../styles/Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', form)
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">

        <div className="login-logo">
          <h1>SERVER<span>WOLF</span></h1>
          <p>Bot Hosting Panel</p>
        </div>

        <div className="login-card">
          <h2>Welcome back</h2>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="••••••••" />
          </div>

          <button className="btn-primary" onClick={handleSubmit}>Login</button>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>

      </div>
    </div>
  )
}