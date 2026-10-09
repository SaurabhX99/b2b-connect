import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', form)
  }

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-body">
        <div className="auth-card auth-card--center">
          <div className="auth-card__brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__desc">Sign in to your Business Dekho account</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__field">
              <label>Email</label>
              <input type="email" required value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com" />
            </div>
            <div className="auth-form__field">
              <label>Password</label>
              <input type="password" required value={form.password}
                onChange={e => set('password', e.target.value)}
                placeholder="Enter your password" />
            </div>
            <button type="submit" className="auth-btn auth-btn--primary">
              Sign in
            </button>
          </form>

          <p className="auth-card__footer">
            Don't have an account?{' '}
            <button onClick={() => navigate('/auth')} className="auth-link">Get started</button>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login
