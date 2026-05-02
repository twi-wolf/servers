import '../styles/global.css'
import '../styles/Login.css'
import '../styles/Register.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AlertCircle } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = register(form.username, form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <div className="register-logo">
          <h1>SERVER-<span>WOLF</span></h1>
          <p>WhatsApp Bot Hosting Panel</p>
        </div>

        <div className="register-card">
          <h2>Create an account</h2>

          {error && (
            <div className="auth-error">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirm" value={form.confirm}
                onChange={handleChange} placeholder="••••••••" />
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
