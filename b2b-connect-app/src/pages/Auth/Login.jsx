import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import logo from '../../assets/logo.jpeg'
import './Auth.css'

// Mock valid credentials
const MOCK_USER = {
  email: 'abcdef@gmail.com',
  password: 'testPwd1234',
  userName: 'Abhinav Pandey',
  phone: '9876543210',
  role: 'buyer',
  businessName: '',
  isPremium: false,
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.redirectTo || null
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter both email and password.')
      return
    }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setLoading(false)
      if (form.email.toLowerCase() === MOCK_USER.email && form.password === MOCK_USER.password) {
        const userState = {
          userName: MOCK_USER.userName,
          phone: MOCK_USER.phone,
          email: MOCK_USER.email,
          role: MOCK_USER.role,
          businessName: MOCK_USER.businessName,
          isPremium: MOCK_USER.isPremium,
        }
        navigate(redirectTo || '/find-suppliers', { state: userState })
      } else {
        setError('Invalid email or password. Please check your credentials or sign up for a new account.')
      }
    }, 1500)
  }

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-body">
        <div className="auth-card auth-card--center">
          <img src={logo} alt="Business Dekho" className="auth-card__brand-img" />
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__desc">Sign in to your Business Dekho account</p>

          {error && (
            <div className="auth-login-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__field">
              <label>Email</label>
              <input type="email" required value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com" />
            </div>
            <div className="auth-form__field">
              <label>Password</label>
              <div className="auth-pwd-wrap">
                <input type={showPwd ? 'text' : 'password'} required value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Enter your password" />
                <button type="button" className="auth-pwd-toggle" onClick={() => setShowPwd(v => !v)} tabIndex={-1}>
                  {showPwd ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m1 1 22 22"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="auth-btn auth-btn--primary" disabled={loading}>
              {loading ? (
                <><span className="auth-btn-spinner" /> Signing in...</>
              ) : 'Sign in'}
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
