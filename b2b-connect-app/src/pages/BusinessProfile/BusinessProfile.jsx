import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import BusinessStep from './steps/BusinessStep'
import OwnerStep from './steps/OwnerStep'
import DemographicsStep from './steps/DemographicsStep'
import './BusinessProfile.css'

const STEPS = [
  { id: 1, label: 'Business Details' },
  { id: 2, label: 'Verify Business' },
  { id: 3, label: 'Complete' },
]

const DOC_CATEGORIES = [
  { value: '', label: 'Select document type' },
  { value: 'gst', label: 'GST Certificate' },
  { value: 'udyam', label: 'Udyam Registration' },
  { value: 'invoice', label: 'Digital Invoice' },
  { value: 'other', label: 'Others' },
]

const FORM_STEPS = [
  { id: 1, label: 'Business', component: BusinessStep },
  { id: 2, label: 'Owner', component: OwnerStep },
  { id: 3, label: 'Demographics', component: DemographicsStep },
]

function BusinessProfile() {
  const location = useLocation()
  const navigate = useNavigate()
  const userInfo = location.state || {}

  // Overall flow step (1=form, 2=verify, 3=complete)
  const [flowStep, setFlowStep] = useState(1)

  // Form sub-step (1=Business, 2=Owner, 3=Demographics)
  const [formStep, setFormStep] = useState(1)

  // Form saving loader
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    businessName: '', registrationNumber: '', yearEstablished: '',
    category: '', website: '', description: '',
    ownerName: userInfo.userName || '', ownerEmail: userInfo.userEmail || '',
    ownerPhone: userInfo.userPhone || '', ownerRole: '',
    country: '', city: '', employeeCount: '', annualRevenue: '',
  })

  const updateFormData = (updates) => setFormData(prev => ({ ...prev, ...updates }))

  // Verification state
  const [businessDomain, setBusinessDomain] = useState('')
  const [domainVerified, setDomainVerified] = useState(false)
  const [domainVerifying, setDomainVerifying] = useState(false)
  const [docCategory, setDocCategory] = useState('')
  const [docFile, setDocFile] = useState(null)
  const [docUploading, setDocUploading] = useState(false)
  const [docUploaded, setDocUploaded] = useState(false)
  const [nameMatched, setNameMatched] = useState(false)
  const [addressMatched, setAddressMatched] = useState(false)

  // Creating loader
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(false)

  const CurrentFormComponent = FORM_STEPS[formStep - 1].component

  /* ── Form navigation ── */
  const handleFormNext = () => {
    if (formStep < FORM_STEPS.length) {
      setFormStep(prev => prev + 1)
    } else {
      // Save & go to verification
      setSaving(true)
      setTimeout(() => {
        setSaving(false)
        setFlowStep(2)
      }, 1500)
    }
  }

  const handleFormBack = () => {
    if (formStep > 1) setFormStep(prev => prev - 1)
  }

  /* ── Domain verification mock ── */
  const handleVerifyDomain = () => {
    if (!businessDomain) return
    setDomainVerifying(true)
    setTimeout(() => {
      setDomainVerifying(false)
      setDomainVerified(true)
    }, 2000)
  }

  /* ── Document upload mock ── */
  const handleDocUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDocFile(file)
    setDocUploading(true)

    // Mock processing
    setTimeout(() => {
      setDocUploading(false)
      setDocUploaded(true)
      // Mock: randomly assign name/address match based on doc
      setNameMatched(true)
      setTimeout(() => setAddressMatched(true), 800)
    }, 2000)
  }

  /* ── Complete business flow ── */
  const handleComplete = () => {
    setFlowStep(3)
    setCreating(true)
    setTimeout(() => {
      setCreating(false)
      setCreated(true)
      // Redirect based on role after showing success
      setTimeout(() => {
        const isSeller = userInfo.role === 'seller'
        navigate(isSeller ? '/requirements' : '/find-suppliers', { state: { userName: userInfo.userName, role: userInfo.role, userEmail: userInfo.userEmail, userPhone: userInfo.userPhone } })
      }, 2000)
    }, 2000)
  }

  /* ── Skip verification ── */
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  const handleSkip = () => setShowSkipWarning(true)
  const confirmSkip = () => {
    setShowSkipWarning(false)
    handleComplete()
  }

  /* ── Verification badges earned ── */
  const badges = []
  if (domainVerified) badges.push('Business Domain Verified')
  if (nameMatched) badges.push('Business Name Matched')
  if (addressMatched) badges.push('Business Address Matched')

  const anyVerification = domainVerified || docUploaded

  return (
    <div className="business-profile">
      <Navbar />

      {/* Top stepper */}
      <div className="bp-stepper">
        {STEPS.map((s, i) => (
          <div key={s.id} className="bp-stepper__item">
            {i > 0 && (
              <div className={`bp-stepper__line ${flowStep > s.id - 1 ? 'bp-stepper__line--done' : ''}`} />
            )}
            <div className={`bp-stepper__dot ${
              s.id < flowStep ? 'bp-stepper__dot--done' :
              s.id === flowStep ? 'bp-stepper__dot--active' : ''
            }`}>
              {s.id < flowStep ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              ) : s.id}
            </div>
            <span className={`bp-stepper__label ${s.id <= flowStep ? 'bp-stepper__label--active' : ''}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="business-profile__layout">
        {/* ═══ Main content ═══ */}
        <main className="business-profile__main">

          {/* ── Flow Step 1: Business Details Form ── */}
          {flowStep === 1 && (
            <>
              {/* Mini sub-stepper for form sections */}
              <div className="bp-form-stepper">
                {FORM_STEPS.map((fs, i) => (
                  <div key={fs.id} className="bp-form-stepper__item">
                    {i > 0 && <div className={`bp-form-stepper__line ${formStep > fs.id - 1 ? 'bp-form-stepper__line--done' : ''}`} />}
                    <div className={`bp-form-stepper__dot ${
                      fs.id < formStep ? 'bp-form-stepper__dot--done' :
                      fs.id === formStep ? 'bp-form-stepper__dot--active' : ''
                    }`}>
                      {fs.id < formStep ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      ) : fs.id}
                    </div>
                    <span className={`bp-form-stepper__label ${fs.id <= formStep ? 'bp-form-stepper__label--active' : ''}`}>
                      {fs.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="business-profile__step-indicator">
                STEP {formStep} OF {FORM_STEPS.length}
              </div>
              <h1 className="business-profile__title">
                {formStep === 1 && 'Tell us about your business.'}
                {formStep === 2 && 'Tell us about yourself.'}
                {formStep === 3 && 'Where is your business based?'}
              </h1>
              <p className="business-profile__desc">
                {formStep === 1 && 'Start with the essentials. This information helps us build your public business profile and improve your matches.'}
                {formStep === 2 && 'This helps other businesses know who they are connecting with.'}
                {formStep === 3 && 'Help us understand your business demographics for better matching.'}
              </p>

              <CurrentFormComponent data={formData} onChange={updateFormData} />

              <div className="business-profile__footer">
                <span className="business-profile__required-note">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="#9B9B9B" strokeWidth="1.2"/>
                    <path d="M7 4.5V7.5M7 9.5V9" stroke="#9B9B9B" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  All fields marked required
                </span>
                <div className="business-profile__nav-buttons">
                  {formStep > 1 && (
                    <button className="business-profile__back-btn" onClick={handleFormBack}>
                      &larr; Back
                    </button>
                  )}
                  <button className="business-profile__next-btn" onClick={handleFormNext} disabled={saving}>
                    {saving ? (
                      <><span className="bp-spinner" /> Saving...</>
                    ) : formStep < FORM_STEPS.length ? (
                      <>Continue to {FORM_STEPS[formStep].label.toLowerCase()} details <span>&rarr;</span></>
                    ) : (
                      <>Save & Continue <span>&rarr;</span></>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Flow Step 2: Verify Business (Optional) ── */}
          {flowStep === 2 && (
            <>
              <h1 className="business-profile__title">Verify your business</h1>
              <p className="business-profile__desc">
                Verification is optional but recommended. Verified businesses get better visibility and trust badges on their profile.
              </p>

              {/* Domain Verification */}
              <div className={`bp-verify-card ${domainVerified ? 'bp-verify-card--done' : ''}`}>
                <div className="bp-verify-card__header">
                  <div className="bp-verify-card__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <div className="bp-verify-card__text">
                    <h3>Business Domain</h3>
                    <p>Enter your business website and verify ownership</p>
                  </div>
                  {domainVerified && (
                    <span className="bp-verify-badge bp-verify-badge--success">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      Verified
                    </span>
                  )}
                </div>

                {!domainVerified && (
                  <div className="bp-domain-input">
                    <div className="bp-domain-input__row">
                      <input
                        type="url"
                        value={businessDomain}
                        onChange={e => setBusinessDomain(e.target.value)}
                        placeholder="https://yourbusiness.com"
                        className="bp-domain-input__field"
                        disabled={domainVerifying}
                      />
                      {domainVerifying ? (
                        <span className="bp-verify-badge bp-verify-badge--loading"><span className="bp-spinner" /> Verifying...</span>
                      ) : (
                        <button className="bp-verify-btn" onClick={handleVerifyDomain} disabled={!businessDomain}>
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {domainVerified && (
                  <div className="bp-verify-card__result">
                    <span className="bp-tag bp-tag--green">Business Domain Verified</span>
                    <span className="bp-verify-card__domain-text">{businessDomain}</span>
                  </div>
                )}
              </div>

              {/* Document Upload */}
              <div className={`bp-verify-card ${docUploaded ? 'bp-verify-card--done' : ''}`}>
                <div className="bp-verify-card__header">
                  <div className="bp-verify-card__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/>
                    </svg>
                  </div>
                  <div className="bp-verify-card__text">
                    <h3>Upload Business Document</h3>
                    <p>Upload a document to verify your business name and address</p>
                  </div>
                </div>

                {!docUploaded && (
                  <div className="bp-doc-upload">
                    <select
                      className="bp-doc-upload__select"
                      value={docCategory}
                      onChange={e => setDocCategory(e.target.value)}
                    >
                      {DOC_CATEGORIES.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>

                    {docCategory && (
                      <label className="bp-doc-upload__dropzone">
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleDocUpload} hidden />
                        {docUploading ? (
                          <div className="bp-doc-upload__loading">
                            <span className="bp-spinner" />
                            <span>Processing document...</span>
                          </div>
                        ) : docFile ? (
                          <div className="bp-doc-upload__file">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>
                            </svg>
                            <span>{docFile.name}</span>
                          </div>
                        ) : (
                          <div className="bp-doc-upload__placeholder">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>
                            </svg>
                            <span>Click to upload or drag and drop</span>
                            <span className="bp-doc-upload__hint">PDF, JPG, PNG (max 10MB)</span>
                          </div>
                        )}
                      </label>
                    )}

                    <p className="bp-doc-upload__note">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                      </svg>
                      We recommend uploading documents containing the business name and address for verification purposes.
                    </p>
                  </div>
                )}

                {docUploaded && (
                  <div className="bp-verify-card__result">
                    <div className="bp-verify-card__file-info">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>
                      </svg>
                      <span>{docFile?.name} ({DOC_CATEGORIES.find(c => c.value === docCategory)?.label})</span>
                    </div>
                    <div className="bp-verify-tags">
                      {nameMatched && <span className="bp-tag bp-tag--green">Business Name Matched</span>}
                      {addressMatched && <span className="bp-tag bp-tag--green">Business Address Matched</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* Skip warning */}
              {showSkipWarning && (
                <div className="bp-skip-warning">
                  <div className="bp-skip-warning__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
                    </svg>
                  </div>
                  <div className="bp-skip-warning__text">
                    <h4>Are you sure you want to skip verification?</h4>
                    <p>Verified businesses have better visibility and earn trust badges. Without verification, your profile won't display any verification badges.</p>
                  </div>
                  <div className="bp-skip-warning__actions">
                    <button className="bp-skip-warning__cancel" onClick={() => setShowSkipWarning(false)}>
                      Go back & verify
                    </button>
                    <button className="bp-skip-warning__confirm" onClick={confirmSkip}>
                      Skip anyway
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="bp-verify-actions">
                {!showSkipWarning && (
                  <>
                    <button className="bp-verify-skip" onClick={handleSkip}>
                      Skip verification
                    </button>
                    <button
                      className="business-profile__next-btn"
                      onClick={handleComplete}
                      disabled={!anyVerification}
                    >
                      Continue <span>&rarr;</span>
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {/* ── Flow Step 3: Complete ── */}
          {flowStep === 3 && (
            <div className="bp-complete">
              {creating && (
                <div className="auth-logo-loader">
                  <div className="auth-logo-loader__icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h2 className="auth-logo-loader__text">Setting up your business profile...</h2>
                  <p className="auth-logo-loader__sub">Almost there.</p>
                </div>
              )}
              {created && (
                <div className="bp-complete__success">
                  <div className="auth-success-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <h1 className="business-profile__title" style={{textAlign:'center'}}>
                    Business profile created!
                  </h1>
                  <p className="business-profile__desc" style={{textAlign:'center'}}>
                    {userInfo.role === 'seller'
                      ? 'Redirecting you to buyer requirements...'
                      : 'Redirecting you to browse suppliers...'}
                  </p>
                  {badges.length > 0 && (
                    <div className="bp-complete__badges">
                      <span className="bp-tag bp-tag--blue">User Verified</span>
                      {badges.map(b => <span key={b} className="bp-tag bp-tag--green">{b}</span>)}
                    </div>
                  )}
                  {badges.length === 0 && (
                    <div className="bp-complete__badges">
                      <span className="bp-tag bp-tag--blue">User Verified</span>
                      <span className="bp-tag bp-tag--gray">No business verification badges</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>

        {/* ═══ Right sidebar ═══ */}
        <aside className="bp-sidebar">
          <div className="bp-sidebar__card">
            <div className="bp-sidebar__badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Tier 1 Verified
            </div>
            <h3 className="bp-sidebar__name">{userInfo.userName || 'User'}</h3>
            <div className="bp-sidebar__details">
              <div className="bp-sidebar__detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
                </svg>
                <span>{userInfo.userPhone || '+91 XXXXX XXXXX'}</span>
                <svg className="bp-sidebar__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <div className="bp-sidebar__detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/>
                </svg>
                <span>{userInfo.userEmail || 'user@example.com'}</span>
                <svg className="bp-sidebar__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
            </div>

            {/* Earned badges */}
            <div className="bp-sidebar__badges">
              <span className="bp-tag bp-tag--blue bp-tag--sm">User Verified</span>
              {badges.map(b => (
                <span key={b} className="bp-tag bp-tag--green bp-tag--sm">{b}</span>
              ))}
            </div>

            <p className="bp-sidebar__note">
              {badges.length >= 3
                ? 'All verification levels completed! Maximum trust and visibility.'
                : 'Complete business verification to unlock higher trust badges and better visibility.'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default BusinessProfile
