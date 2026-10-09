import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './Contact.css'

function Contact() {
  const location = useLocation()
  const userState = location.state || {}
  const isLoggedIn = !!userState.userName

  const [form, setForm] = useState({
    name: userState.userName || '',
    email: userState.userEmail || '',
    phone: userState.userPhone || '',
    subject: 'General',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) {
      e.name = 'Please enter your name'
    }
    if (!form.email.trim()) {
      e.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address'
    }
    if (!form.phone.trim()) {
      e.phone = 'Please enter your phone number'
    } else if (!/^[+]?[\d\s-]{8,15}$/.test(form.phone.trim())) {
      e.phone = 'Please enter a valid phone number'
    }
    if (!form.message.trim()) {
      e.message = 'Please tell us how we can help you'
    } else if (form.message.trim().length < 10) {
      e.message = 'Message is too short, please provide more details'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
    }, 2000)
  }

  return (
    <div className="contact-page">
      <Navbar />

      <section className="contact__content">
        <div className="contact__card">
          {sent ? (
            <div className="contact__success">
              <div className="contact__success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h2 className="contact__success-title">Thanks for reaching out!</h2>
              <p className="contact__success-desc">Our team will get back to you shortly at <strong>{form.email}</strong>.</p>
              <button
                className="contact__send-another"
                onClick={() => {
                  setSent(false)
                  setForm({ name: userState.userName || '', email: userState.userEmail || '', phone: userState.userPhone || '', subject: 'General', message: '' })
                  setErrors({})
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="contact__header">
                <span className="contact__tag">Get in touch</span>
                <h1 className="contact__title">Contact us</h1>
                <p className="contact__subtitle">
                  Have a question about verification, partnerships, or how Business Dekho works? We'd love to hear from you.
                </p>
              </div>

              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__field">
                  <label>Full name</label>
                  <input
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Your name"
                    className={errors.name ? 'contact__input--error' : ''}
                  />
                  {errors.name && <span className="contact__error">{errors.name}</span>}
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="you@example.com"
                      readOnly={isLoggedIn && !!userState.userEmail}
                      className={errors.email ? 'contact__input--error' : ''}
                    />
                    {errors.email && <span className="contact__error">{errors.email}</span>}
                  </div>
                  <div className="contact__field">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      readOnly={isLoggedIn && !!userState.userPhone}
                      className={errors.phone ? 'contact__input--error' : ''}
                    />
                    {errors.phone && <span className="contact__error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="contact__field">
                  <label>Subject</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)}>
                    {['General', 'Verification help', 'Business listing', 'Partnership', 'Other'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div className="contact__field">
                  <label>Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className={errors.message ? 'contact__input--error' : ''}
                  />
                  {errors.message && <span className="contact__error">{errors.message}</span>}
                </div>

                <button type="submit" className="contact__submit" disabled={submitting}>
                  {submitting ? (
                    <><span className="contact__spinner" /> Sending...</>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Contact
