import '../styles/global.css'
import '../styles/Login.css'
import '../styles/Register.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register:', form)
  }

  return (
    <div className="register-wrapper">
      <div className="register-box">

        <div className="register-logo">
          <h1>SERVER<span>WOLF</span></h1>
          <p>Bot Hosting Panel</p>
        </div>

        <div className="register-card">
          <h2>Create an account</h2>

          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username}
              onChange={handleChange} placeholder="wolfuser" />
          </div>

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

          <button className="btn-primary" onClick={handleSubmit}>Create Account</button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

      </div>
    </div>
  )
}