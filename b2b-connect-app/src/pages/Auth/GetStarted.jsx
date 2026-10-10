import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import logo from '../../assets/logo.jpeg'
import './Auth.css'

const STEPS = [
  { id: 1, label: 'Create Account' },
  { id: 2, label: 'Verify Contact' },
  { id: 3, label: 'Account Created' },
  { id: 4, label: 'Get Started' },
]

const isValidPhone = (v) => /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(v.replace(/\s/g, ''))
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isStrongPassword = (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(v)

/* ── Simple math captcha ── */
function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  return { question: `${a} + ${b} = ?`, answer: String(a + b) }
}

/* ── Spinner ── */
function Spinner({ small }) {
  return <span className={`auth-spinner ${small ? 'auth-spinner--small' : ''}`} />
}

/* ── Inline OTP ── */
function InlineOtp({ label, timer, fmtTime, onResend, onSubmit, verifying, error }) {
  const [otp, setOtp] = useState('')
  const handleSubmit = () => { if (otp.length >= 4) onSubmit(otp) }

  return (
    <div className="auth-inline-otp">
      <span className="auth-form__status auth-form__status--success">{label}</span>
      <div className="auth-inline-otp__row">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter OTP"
          disabled={verifying}
          className="auth-inline-otp__input"
        />
        <button type="button" className="auth-field-btn" onClick={handleSubmit}
          disabled={verifying || otp.length < 4}>
          Submit
        </button>
      </div>
      {verifying && (
        <div className="auth-inline-otp__verifying">
          <Spinner small />
          <span>Verifying OTP...</span>
        </div>
      )}
      {!verifying && (
        <div className="auth-inline-otp__meta">
          {timer > 0
            ? <span className="auth-inline-otp__timer">Resend in {fmtTime(timer)}</span>
            : <button type="button" className="auth-link" onClick={onResend}>Resend OTP</button>
          }
        </div>
      )}
      {error && <span className="auth-form__status auth-form__status--error">{error}</span>}
    </div>
  )
}

function GetStarted() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Form
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', password: '', confirmPassword: '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // Password visibility
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)

  // Captcha
  const [captcha, setCaptcha] = useState(() => generateCaptcha())
  const [captchaInput, setCaptchaInput] = useState('')
  const captchaValid = captchaInput === captcha.answer

  // Phone verification
  const [phoneSending, setPhoneSending] = useState(false)
  const [phoneOtpSent, setPhoneOtpSent] = useState(false)
  const [phoneVerifying, setPhoneVerifying] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [phoneTimer, setPhoneTimer] = useState(0)

  // Email verification
  const [emailSending, setEmailSending] = useState(false)
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [emailVerifying, setEmailVerifying] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailTimer, setEmailTimer] = useState(0)

  // Edit mode for verify step
  const [editingPhone, setEditingPhone] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)
  const [editPhone, setEditPhone] = useState('')
  const [editEmail, setEditEmail] = useState('')

  // Loader
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(false)

  // Timers
  useEffect(() => {
    if (phoneTimer <= 0) return
    const id = setInterval(() => setPhoneTimer(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [phoneTimer])

  useEffect(() => {
    if (emailTimer <= 0) return
    const id = setInterval(() => setEmailTimer(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [emailTimer])

  const fmtTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  /* ── Step 1 validation ── */
  const passwordValid = isStrongPassword(form.password)
  const passwordsMatch = passwordValid && form.password === form.confirmPassword
  const canSave = form.fullName.trim() && isValidPhone(form.phone) && isValidEmail(form.email)
    && passwordsMatch && captchaValid

  const handleSave = (e) => {
    e.preventDefault()
    if (!canSave) return
    setStep(2)
  }

  /* ── Step 2: Phone ── */
  const handleVerifyPhone = () => {
    if (!isValidPhone(form.phone)) { setPhoneError('Number seems to be incorrect. Please change it.'); return }
    setPhoneError(''); setPhoneSending(true)
    setTimeout(() => {
      setPhoneSending(false)
      if (form.phone.replace(/[\s-]/g, '').endsWith('8787047278')) {
        setPhoneError('This number is already registered with another account. Please use a different number.')
        return
      }
      setPhoneOtpSent(true); setPhoneTimer(120)
    }, 1000)
  }

  const handlePhoneOtpSubmit = (otp) => {
    setPhoneVerifying(true); setPhoneError('')
    setTimeout(() => {
      setPhoneVerifying(false)
      if (otp === '000000') { setPhoneError('Invalid OTP. Please try again.') }
      else { setPhoneVerified(true); setPhoneOtpSent(false) }
    }, 1500)
  }

  const handleResendPhone = () => { setPhoneError(''); setPhoneTimer(120) }

  /* ── Step 2: Email ── */
  const handleVerifyEmail = () => {
    if (!isValidEmail(form.email)) { setEmailError('Email seems to be incorrect. Please change it.'); return }
    setEmailError(''); setEmailSending(true)
    setTimeout(() => {
      setEmailSending(false)
      if (form.email.toLowerCase() === 'fresh01@gmail.com') {
        setEmailError('This email is already registered with another account. Please use a different email.')
        return
      }
      setEmailOtpSent(true); setEmailTimer(120)
    }, 1000)
  }

  const handleEmailOtpSubmit = (otp) => {
    setEmailVerifying(true); setEmailError('')
    setTimeout(() => {
      setEmailVerifying(false)
      if (otp === '000000') { setEmailError('Invalid OTP. Please try again.') }
      else { setEmailVerified(true); setEmailOtpSent(false) }
    }, 1500)
  }

  const handleResendEmail = () => { setEmailError(''); setEmailTimer(120) }

  const bothVerified = phoneVerified && emailVerified

  /* ── Step 2 → 3 transition ── */
  const handleContinueAfterVerify = useCallback(() => {
    setStep(3)
    setCreating(true)
    // Mock account creation with animated loader
    setTimeout(() => {
      setCreating(false)
      setCreated(true)
      // Auto-advance to step 4 after showing success
      setTimeout(() => setStep(4), 1500)
    }, 2500)
  }, [])

  /* ── Step 4: Business choice ── */
  const handleBusinessChoice = (isSeller) => {
    navigate(isSeller ? '/onboarding' : '/find-suppliers', {
      state: {
        userName: form.fullName,
        userPhone: form.phone,
        userEmail: form.email,
        role: isSeller ? 'seller' : 'buyer',
      }
    })
  }

  return (
    <div className="auth-page">
      <Navbar />

      {/* Stepper */}
      <div className="auth-tracker">
        {STEPS.map((s, i) => (
          <div key={s.id} className="auth-tracker__item">
            {i > 0 && (
              <div className={`auth-tracker__line ${step > s.id - 1 ? 'auth-tracker__line--done' : ''}`} />
            )}
            <div className={`auth-tracker__dot ${
              s.id < step ? 'auth-tracker__dot--done' :
              s.id === step ? 'auth-tracker__dot--active' : ''
            }`}>
              {s.id < step ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              ) : s.id}
            </div>
            <span className={`auth-tracker__label ${s.id <= step ? 'auth-tracker__label--active' : ''}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <main className="auth-body">

        {/* ═══ Step 1: Create Account ═══ */}
        {step === 1 && (
          <div className="auth-card">
            <h1 className="auth-card__title">Create your account</h1>
            <p className="auth-card__desc">Free forever. No credit card required.</p>

            <form className="auth-form" onSubmit={handleSave}>
              <div className="auth-form__field">
                <label>Full name</label>
                <input type="text" required value={form.fullName}
                  onChange={e => set('fullName', e.target.value)} placeholder="Your full name" />
              </div>

              <div className="auth-form__field">
                <label>Phone number</label>
                <input type="tel" required value={form.phone}
                  onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
                {form.phone && !isValidPhone(form.phone) && (
                  <span className="auth-form__hint auth-form__hint--warn">Enter a valid Indian mobile number</span>
                )}
              </div>

              <div className="auth-form__field">
                <label>Email address</label>
                <input type="email" required value={form.email}
                  onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
              </div>

              <div className="auth-form__field">
                <label>Password</label>
                <div className="auth-pwd-wrap">
                  <input type={showPwd ? 'text' : 'password'} required minLength={8} value={form.password}
                    onChange={e => set('password', e.target.value)} placeholder="Min 8 characters" />
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
                {form.password && !passwordValid && (
                  <span className="auth-form__hint auth-form__hint--warn">Must be 8+ chars with uppercase, lowercase, number & special character.</span>
                )}
                {form.password && passwordValid && (
                  <span className="auth-form__status auth-form__status--success">Strong password</span>
                )}
              </div>

              <div className="auth-form__field">
                <label>Confirm password</label>
                <div className="auth-pwd-wrap">
                  <input type={showConfirmPwd ? 'text' : 'password'} required value={form.confirmPassword}
                    onChange={e => set('confirmPassword', e.target.value)} placeholder="Re-enter your password" />
                  <button type="button" className="auth-pwd-toggle" onClick={() => setShowConfirmPwd(v => !v)} tabIndex={-1}>
                    {showConfirmPwd ? (
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
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <span className="auth-form__status auth-form__status--error">Passwords do not match</span>
                )}
                {form.confirmPassword && passwordsMatch && (
                  <span className="auth-form__status auth-form__status--success">Passwords match</span>
                )}
              </div>

              {/* Captcha */}
              <div className="auth-captcha">
                <div className="auth-captcha__box">
                  <span className="auth-captcha__label">Verify you're human</span>
                  <div className="auth-captcha__challenge">
                    <span className="auth-captcha__question">{captcha.question}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={3}
                      className="auth-captcha__input"
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="?"
                    />
                    <button type="button" className="auth-captcha__refresh" onClick={() => {
                      setCaptcha(generateCaptcha()); setCaptchaInput('')
                    }} title="New captcha">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
                      </svg>
                    </button>
                  </div>
                  {captchaInput && !captchaValid && (
                    <span className="auth-form__status auth-form__status--error" style={{marginTop: 4}}>Incorrect answer</span>
                  )}
                  {captchaValid && (
                    <span className="auth-form__status auth-form__status--success" style={{marginTop: 4}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="auth-btn auth-btn--primary" disabled={!canSave}>
                Save & Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </form>

            <p className="auth-card__footer">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="auth-link">Sign in</button>
            </p>
          </div>
        )}

        {/* ═══ Step 2: Verify Contact ═══ */}
        {step === 2 && (
          <div className="auth-card">
            <h1 className="auth-card__title">Verify your contact details</h1>
            <p className="auth-card__desc">Verify your phone number and email to secure your account.</p>

            <div className="auth-verify-fields">
              {/* Phone verification */}
              <div className={`auth-verify-field ${phoneVerified ? 'auth-verify-field--done' : ''}`}>
                <div className="auth-verify-field__header">
                  <div className="auth-verify-field__info">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
                    </svg>
                    <div>
                      <span className="auth-verify-field__label">Phone number</span>
                      {editingPhone ? (
                        <div className="auth-verify-field__edit-row">
                          <input
                            type="tel"
                            className="auth-verify-field__edit-input"
                            value={editPhone}
                            onChange={e => setEditPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            autoFocus
                          />
                          <button
                            className="auth-field-btn auth-field-btn--save"
                            disabled={!isValidPhone(editPhone)}
                            onClick={() => {
                              set('phone', editPhone)
                              setEditingPhone(false)
                              setPhoneOtpSent(false)
                              setPhoneError('')
                            }}
                          >Save</button>
                          <button className="auth-field-btn auth-field-btn--cancel" onClick={() => setEditingPhone(false)}>Cancel</button>
                        </div>
                      ) : (
                        <span className="auth-verify-field__value">
                          {form.phone}
                          {!phoneVerified && (
                            <button className="auth-verify-field__edit-btn" onClick={() => { setEditPhone(form.phone); setEditingPhone(true); setPhoneOtpSent(false); setPhoneSending(false); setPhoneError(''); }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
                              </svg>
                              Change number?
                            </button>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  {!editingPhone && (
                    <>
                      {phoneVerified ? (
                        <span className="auth-field-badge auth-field-badge--success">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                          Verified
                        </span>
                      ) : !phoneOtpSent && !phoneSending ? (
                        <button className="auth-field-btn" onClick={handleVerifyPhone}>Verify</button>
                      ) : phoneSending ? (
                        <span className="auth-field-btn auth-field-btn--loading"><Spinner small /></span>
                      ) : null}
                    </>
                  )}
                </div>

                {phoneOtpSent && !phoneVerified && (
                  <InlineOtp
                    label={`OTP has been sent to ${form.phone}`}
                    timer={phoneTimer} fmtTime={fmtTime}
                    onResend={handleResendPhone}
                    onSubmit={handlePhoneOtpSubmit}
                    verifying={phoneVerifying} error={phoneError}
                  />
                )}
                {phoneError && !phoneOtpSent && (
                  <span className="auth-form__status auth-form__status--error">{phoneError}</span>
                )}
              </div>

              {/* Email verification */}
              <div className={`auth-verify-field ${emailVerified ? 'auth-verify-field--done' : ''}`}>
                <div className="auth-verify-field__header">
                  <div className="auth-verify-field__info">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/>
                    </svg>
                    <div>
                      <span className="auth-verify-field__label">Email address</span>
                      {editingEmail ? (
                        <div className="auth-verify-field__edit-row">
                          <input
                            type="email"
                            className="auth-verify-field__edit-input"
                            value={editEmail}
                            onChange={e => setEditEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoFocus
                          />
                          <button
                            className="auth-field-btn auth-field-btn--save"
                            disabled={!isValidEmail(editEmail)}
                            onClick={() => {
                              set('email', editEmail)
                              setEditingEmail(false)
                              setEmailOtpSent(false)
                              setEmailError('')
                            }}
                          >Save</button>
                          <button className="auth-field-btn auth-field-btn--cancel" onClick={() => setEditingEmail(false)}>Cancel</button>
                        </div>
                      ) : (
                        <span className="auth-verify-field__value">
                          {form.email}
                          {!emailVerified && (
                            <button className="auth-verify-field__edit-btn" onClick={() => { setEditEmail(form.email); setEditingEmail(true); setEmailOtpSent(false); setEmailSending(false); setEmailError(''); }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
                              </svg>
                              Change email?
                            </button>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  {!editingEmail && (
                    <>
                      {emailVerified ? (
                        <span className="auth-field-badge auth-field-badge--success">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                          Verified
                        </span>
                      ) : !emailOtpSent && !emailSending ? (
                        <button className="auth-field-btn" onClick={handleVerifyEmail}>Verify</button>
                      ) : emailSending ? (
                        <span className="auth-field-btn auth-field-btn--loading"><Spinner small /></span>
                      ) : null}
                    </>
                  )}
                </div>

                {emailOtpSent && !emailVerified && (
                  <InlineOtp
                    label={`OTP has been sent to ${form.email}`}
                    timer={emailTimer} fmtTime={fmtTime}
                    onResend={handleResendEmail}
                    onSubmit={handleEmailOtpSubmit}
                    verifying={emailVerifying} error={emailError}
                  />
                )}
                {emailError && !emailOtpSent && (
                  <span className="auth-form__status auth-form__status--error">{emailError}</span>
                )}
              </div>
            </div>

            <button
              className="auth-btn auth-btn--primary"
              disabled={!bothVerified}
              onClick={handleContinueAfterVerify}
              style={{marginTop: 24}}
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>

            <button className="auth-back" onClick={() => setStep(1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to details
            </button>
          </div>
        )}

        {/* ═══ Step 3: Creating Account (Loader) ═══ */}
        {step === 3 && (
          <div className="auth-card auth-card--center">
            {creating && (
              <div className="auth-logo-loader">
                <div className="auth-logo-loader__icon">
                  <img src={logo} alt="Business Dekho" style={{ height: 40, objectFit: 'contain' }} />
                </div>
                <h2 className="auth-logo-loader__text">Creating your account...</h2>
                <p className="auth-logo-loader__sub">Please wait while we set things up for you.</p>
              </div>
            )}
            {created && (
              <div className="auth-created-success">
                <div className="auth-success-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h1 className="auth-card__title">User details created successfully!</h1>
                <p className="auth-card__desc">Redirecting you to the next step...</p>
              </div>
            )}
          </div>
        )}

        {/* ═══ Step 4: Get Started (Business Choice) ═══ */}
        {step === 4 && (
          <div className="auth-card auth-card--center">
            <h1 className="auth-card__title">You're all set, {form.fullName}!</h1>
            <p className="auth-card__desc">
              Would you like to list your business on Business Dekho?
            </p>

            <div className="auth-verify-done-pills">
              <div className="auth-verify-done-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                User Verified
              </div>
            </div>

            <div className="auth-choice">
              <button className="auth-choice__card" onClick={() => handleBusinessChoice(true)}>
                <div className="auth-choice__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
                  </svg>
                </div>
                <div className="auth-choice__text">
                  <h3>Yes, list my business</h3>
                  <p>Create a profile, get verified, and get discovered by buyers</p>
                </div>
                <svg className="auth-choice__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>

              <button className="auth-choice__card" onClick={() => handleBusinessChoice(false)}>
                <div className="auth-choice__icon auth-choice__icon--alt">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <div className="auth-choice__text">
                  <h3>No, just explore</h3>
                  <p>Browse suppliers and find business partners</p>
                </div>
                <svg className="auth-choice__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default GetStarted
