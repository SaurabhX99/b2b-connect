import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from './OtpInput'
import VerificationSidebar from './VerificationSidebar'
import './OtpVerification.css'

function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(522) // 08:42
  const navigate = useNavigate()

  const handleVerify = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length === 6) {
      console.log('Verifying:', code)
      navigate('/onboarding')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  return (
    <div className="otp-page">
      <div className="otp-page__left">
        <div className="otp-page__header">
          <Link to="/" className="otp-page__logo">
            <div className="otp-page__logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span>Business Dekho</span>
          </Link>
          <div className="otp-page__secure">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7" stroke="#2D3B2D" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="3" y="7" width="10" height="7" rx="2" stroke="#2D3B2D" strokeWidth="1.5"/>
            </svg>
            <span>Secure verification</span>
          </div>
        </div>

        <div className="otp-page__content">
          <div className="otp-page__icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#E8F5E9"/>
              <path d="M7 10L14 15L21 10M7 18H21V10H7V18Z" stroke="#2D3B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="otp-page__title">Check your inbox.</h1>
          <p className="otp-page__subtitle">
            We sent a six-digit verification code to <strong>anika@northlane.co</strong>. Enter it
            below to confirm your account.
          </p>

          <form onSubmit={handleVerify}>
            <OtpInput value={otp} onChange={setOtp} />

            <div className="otp-page__meta">
              <span className="otp-page__timer">Code expires in {formatTime(timeLeft)}</span>
              <button type="button" className="otp-page__resend">Resend code</button>
            </div>

            <button type="submit" className="otp-page__submit">
              Verify and continue <span>&rarr;</span>
            </button>
          </form>

          <div className="otp-page__alternatives">
            <div className="otp-page__alt-option">
              <strong>Can&apos;t access this email?</strong>
              <button type="button" className="otp-page__alt-link">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="3" y="1" width="8" height="12" rx="1.5" stroke="#2D3B2D" strokeWidth="1.2"/>
                  <line x1="5.5" y1="10.5" x2="8.5" y2="10.5" stroke="#2D3B2D" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Send a code to your phone instead
              </button>
            </div>
          </div>

          <button type="button" className="otp-page__change">
            &#8592; Change email or phone
          </button>
        </div>
      </div>

      <VerificationSidebar />
    </div>
  )
}

export default OtpVerification
