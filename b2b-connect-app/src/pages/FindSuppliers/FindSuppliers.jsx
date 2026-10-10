import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './FindSuppliers.css'

const TIER_BADGES = {
  1: ['User Verified'],
  2: ['User Verified', 'Business Domain Verified', 'Business Name Matched', 'Business Address Matched'],
  3: ['User Verified', 'Business Domain Verified', 'Business Name Matched', 'Business Address Matched', 'Premium Member'],
}

const SUPPLIERS = [
  { id: 1, name: 'Mehta Packworks', industry: 'Packaging & Paper', location: 'Gurugram, Haryana', tier: 1, desc: 'Corrugated packaging for e-commerce and retail.' },
  { id: 2, name: 'Sharma Textiles', industry: 'Textiles & Apparel', location: 'Surat, Gujarat', tier: 2, desc: 'Fabric and garment manufacturing with export experience.' },
  { id: 3, name: 'Krishna Industries', industry: 'Industrial Equipment', location: 'Pune, Maharashtra', tier: 2, desc: 'Precision components and tooling for the automotive sector.' },
  { id: 4, name: 'Agarwal Constructs', industry: 'Construction', location: 'Delhi NCR', tier: 1, desc: 'Building materials and civil supply for large projects.' },
  { id: 5, name: 'Green Farms Co', industry: 'Food & Agriculture', location: 'Nashik, Maharashtra', tier: 1, desc: 'Fresh produce and cold-chain logistics for HORECA buyers.' },
  { id: 6, name: 'ChemSpec India', industry: 'Chemicals', location: 'Mumbai, Maharashtra', tier: 3, desc: 'Specialty chemicals with full compliance documentation.' },
  { id: 7, name: 'Ravi Paper Mills', industry: 'Packaging & Paper', location: 'Hyderabad, Telangana', tier: 2, desc: 'Kraft paper and board for industrial packaging needs.' },
  { id: 8, name: 'Bharat Garments', industry: 'Textiles & Apparel', location: 'Tirupur, Tamil Nadu', tier: 1, desc: 'Knitwear and workwear for domestic and export buyers.' },
]

const INDUSTRIES = ['All', 'Packaging & Paper', 'Textiles & Apparel', 'Industrial Equipment', 'Construction', 'Food & Agriculture', 'Chemicals']
const TIERS = ['All', 'Tier 1', 'Tier 2', 'Tier 3']
const URGENCY_OPTIONS = ['Urgent', 'Within a week', 'Within a month', 'Not urgent', 'Flexible']

function FindSuppliers() {
  const location = useLocation()
  const navigate = useNavigate()
  const userState = location.state || {}
  const isLoggedIn = !!userState.userName
  const isSeller = userState.role === 'seller'

  const [query, setQuery] = useState('')
  const [industry, setIndustry] = useState('All')
  const [tierFilter, setTierFilter] = useState('All')

  // Post Requirement modal
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState(null) // null | 'ai-results' | 'manual'
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiMatches, setAiMatches] = useState([])
  const [reqForm, setReqForm] = useState({ title: '', category: '', urgency: '', description: '' })
  const [reqSubmitting, setReqSubmitting] = useState(false)
  const [reqSubmitted, setReqSubmitted] = useState(false)
  const modalRef = useRef(null)

  // Close modal on outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) closeModal()
    }
    if (showModal) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showModal])

  const closeModal = () => {
    setShowModal(false)
    setModalMode(null)
    setAiPrompt('')
    setAiGenerating(false)
    setAiMatches([])
    setReqForm({ title: '', category: '', urgency: '', description: '' })
    setReqSubmitting(false)
    setReqSubmitted(false)
  }

  const handlePostRequirementClick = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: '/find-suppliers' } })
      return
    }
    setShowModal(true)
  }

  const handleViewProfile = (supplier) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: '/find-suppliers' } })
      return
    }
    // Mock — just show alert for now
    alert(`Viewing profile of ${supplier.name}`)
  }

  const handleAiGenerate = () => {
    if (!aiPrompt.trim()) return
    setAiGenerating(true)
    // Mock AI: search suppliers matching the prompt keywords
    setTimeout(() => {
      const promptLower = aiPrompt.toLowerCase()
      const matches = SUPPLIERS.filter(s => {
        return s.name.toLowerCase().includes(promptLower) ||
          s.industry.toLowerCase().split(' ').some(w => promptLower.includes(w)) ||
          s.desc.toLowerCase().split(' ').some(w => w.length > 3 && promptLower.includes(w)) ||
          s.location.toLowerCase().split(',').some(l => promptLower.includes(l.trim().toLowerCase()))
      })
      setAiGenerating(false)
      if (matches.length > 0) {
        setAiMatches(matches)
        setModalMode('ai-results')
      } else {
        // No matches — go straight to manual form pre-filled
        setReqForm({
          title: aiPrompt.slice(0, 60),
          category: '',
          urgency: 'Within a week',
          description: aiPrompt,
        })
        setModalMode('manual')
      }
    }, 2000)
  }

  const handleSelectSupplier = (supplier) => {
    closeModal()
    alert(`You selected ${supplier.name}. In production, you would be connected with this supplier.`)
  }

  const handleNotSatisfied = () => {
    setReqForm({
      title: aiPrompt.slice(0, 60),
      category: '',
      urgency: 'Within a week',
      description: aiPrompt,
    })
    setModalMode('manual')
    setAiMatches([])
  }

  const handleReqSubmit = () => {
    setReqSubmitting(true)
    setTimeout(() => {
      setReqSubmitting(false)
      setReqSubmitted(true)
    }, 1500)
  }

  // Filter suppliers
  const filtered = SUPPLIERS.filter(s => {
    if (isSeller && s.name === userState.businessName) return false
    const q = query.toLowerCase()
    const matchQ = !query || s.name.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q) || s.location.toLowerCase().includes(q)
    const matchI = industry === 'All' || s.industry === industry
    const matchT = tierFilter === 'All' || s.tier === parseInt(tierFilter.split(' ')[1])
    return matchQ && matchI && matchT
  })

  return (
    <div className="find-suppliers">
      <Navbar />

      <div className="fs__top">
        <div className="fs__top-row">
          <h1 className="fs__title">Find Suppliers</h1>
          <button className="fs__post-req-btn" onClick={handlePostRequirementClick}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14"/><path d="M5 12h14"/>
            </svg>
            Post Requirement
          </button>
        </div>
        <div className="fs__search-bar">
          <span className="fs__search-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, product or location"
            className="fs__search-input"
          />
          {query && (
            <button className="fs__search-clear" onClick={() => setQuery('')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          )}
        </div>

        <div className="fs__filters">
          <div className="fs__filter-group">
            <p className="fs__filter-label">Industry</p>
            <div className="fs__chips">
              {INDUSTRIES.map(ind => (
                <button
                  key={ind}
                  className={`fs__chip ${industry === ind ? 'fs__chip--active' : ''}`}
                  onClick={() => setIndustry(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
          <div className="fs__filter-group">
            <p className="fs__filter-label">Verification</p>
            <div className="fs__chips">
              {TIERS.map(t => (
                <button
                  key={t}
                  className={`fs__chip ${tierFilter === t ? 'fs__chip--active' : ''}`}
                  onClick={() => setTierFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fs__body">
        <p className="fs__count">{filtered.length} supplier{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="fs__empty">
            <p className="fs__empty-title">No suppliers found</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="fs__grid">
            {filtered.map(s => (
              <div key={s.id} className="fs__card">
                <div className="fs__card-header">
                  <p className="fs__card-name">{s.name}</p>
                  <span className={`fs__badge fs__badge--${s.tier}`}>Tier {s.tier}</span>
                </div>
                <p className="fs__card-desc">{s.desc}</p>
                <div className="fs__card-meta">
                  <span className="fs__card-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>
                    </svg>
                    {s.industry}
                  </span>
                  <span className="fs__card-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {s.location}
                  </span>
                </div>
                <div className="fs__card-badges">
                  {TIER_BADGES[s.tier].map(b => (
                    <span key={b} className={`fs__card-badge ${
                      b === 'User Verified' ? 'fs__card-badge--blue' :
                      b === 'Premium Member' ? 'fs__card-badge--amber' : 'fs__card-badge--green'
                    }`}>{b}</span>
                  ))}
                </div>
                <button className="fs__card-btn" onClick={() => handleViewProfile(s)}>View Profile</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Requirement Modal */}
      {showModal && (
        <div className="fs__modal-overlay">
          <div className="fs__modal" ref={modalRef}>
            <button className="fs__modal-close" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            {reqSubmitted ? (
              <div className="fs__modal-success">
                <div className="fs__modal-success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h2>Requirement posted!</h2>
                <p>Verified suppliers in your category will be notified. You'll receive responses soon.</p>
                <button className="fs__modal-done-btn" onClick={closeModal}>Done</button>
              </div>
            ) : modalMode === 'ai-results' ? (
              <>
                <h2 className="fs__modal-title">We found matching suppliers</h2>
                <p className="fs__modal-desc">Based on your description, these suppliers might be a good fit.</p>

                <div className="fs__ai-results">
                  {aiMatches.map(s => (
                    <div key={s.id} className="fs__ai-result-card">
                      <div className="fs__ai-result-info">
                        <p className="fs__ai-result-name">{s.name}</p>
                        <p className="fs__ai-result-desc">{s.desc}</p>
                        <div className="fs__ai-result-meta">
                          <span>{s.industry}</span>
                          <span>{s.location}</span>
                          <span className={`fs__badge fs__badge--${s.tier}`} style={{ height: 22, fontSize: 11, padding: '0 8px' }}>Tier {s.tier}</span>
                        </div>
                      </div>
                      <button className="fs__ai-result-select" onClick={() => handleSelectSupplier(s)}>
                        Select
                      </button>
                    </div>
                  ))}
                </div>

                <div className="fs__modal-actions" style={{ marginTop: 20 }}>
                  <button className="fs__modal-back-btn" onClick={() => { setModalMode(null); setAiMatches([]) }}>
                    &larr; Back
                  </button>
                  <button className="fs__modal-manual-btn" onClick={handleNotSatisfied}>
                    None of these — post new requirement
                  </button>
                </div>
              </>
            ) : !modalMode ? (
              <>
                <h2 className="fs__modal-title">Post a Requirement</h2>
                <p className="fs__modal-desc">Describe what you need and let suppliers come to you.</p>

                <div className="fs__modal-prompt">
                  <label>Describe your requirement</label>
                  <textarea
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="e.g. I need 5000 corrugated boxes for e-commerce packaging, delivery within Delhi NCR..."
                    rows={4}
                  />
                </div>

                <div className="fs__modal-actions">
                  <button
                    className="fs__modal-ai-btn"
                    onClick={handleAiGenerate}
                    disabled={!aiPrompt.trim() || aiGenerating}
                  >
                    {aiGenerating ? (
                      <><span className="fs__spinner" /> Searching suppliers...</>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        Generate with AI
                      </>
                    )}
                  </button>
                  <button className="fs__modal-manual-btn" onClick={() => setModalMode('manual')}>
                    Create manually
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="fs__modal-title">Requirement Details</h2>
                <p className="fs__modal-desc">Fill in the details for your requirement.</p>

                <div className="fs__modal-form">
                  <div className="fs__modal-field">
                    <label>Requirement title</label>
                    <input
                      type="text"
                      value={reqForm.title}
                      onChange={e => setReqForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="Brief title for your requirement"
                    />
                  </div>

                  <div className="fs__modal-row">
                    <div className="fs__modal-field">
                      <label>Category</label>
                      <select
                        value={reqForm.category}
                        onChange={e => setReqForm(f => ({ ...f, category: e.target.value }))}
                      >
                        <option value="">Select category</option>
                        {INDUSTRIES.filter(i => i !== 'All').map(i => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>

                    <div className="fs__modal-field">
                      <label>Urgency</label>
                      <select
                        value={reqForm.urgency}
                        onChange={e => setReqForm(f => ({ ...f, urgency: e.target.value }))}
                      >
                        <option value="">Select urgency</option>
                        {URGENCY_OPTIONS.map(u => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="fs__modal-field">
                    <label>Description</label>
                    <textarea
                      value={reqForm.description}
                      onChange={e => setReqForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Provide more details about quantities, specifications, delivery location..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="fs__modal-actions">
                  <button className="fs__modal-back-btn" onClick={() => setModalMode(null)}>
                    &larr; Back
                  </button>
                  <button
                    className="fs__modal-submit-btn"
                    onClick={handleReqSubmit}
                    disabled={!reqForm.title.trim() || !reqForm.category || !reqForm.urgency || reqSubmitting}
                  >
                    {reqSubmitting ? (
                      <><span className="fs__spinner" /> Posting...</>
                    ) : 'Post Requirement'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FindSuppliers
