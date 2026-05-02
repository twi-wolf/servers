import '../styles/global.css'
import '../styles/Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AlertCircle } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = login(form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-logo">
          <h1>SERVER-<span>WOLF</span></h1>
          <p>WhatsApp Bot Hosting Panel</p>
        </div>

        <div className="login-card">
          <h2>Welcome back</h2>

          {error && (
            <div className="auth-error">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="••••••••" autoComplete="current-password" />
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="demo-hint">
            <p>Demo: <code>admin@serverwolf.io</code> / <code>admin123</code></p>
          </div>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
