import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import DirectoryPreview from './DirectoryPreview'
import './Landing.css'

const SEARCH_PLACEHOLDERS = [
  'I want 5000 bottles within Delhi NCR',
  'Looking for eco-friendly packaging materials',
  'Need bulk textile suppliers in Gujarat',
]

function Landing() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [placeholderText, setPlaceholderText] = useState('')
  const [typing, setTyping] = useState(true)
  const tickRef = useRef(0)

  // Typing animation for placeholder
  useEffect(() => {
    if (searchFocused || searchQuery) return
    const target = SEARCH_PLACEHOLDERS[placeholderIdx]

    const interval = setInterval(() => {
      if (typing) {
        tickRef.current++
        const text = target.slice(0, tickRef.current)
        setPlaceholderText(text)
        if (tickRef.current >= target.length) {
          clearInterval(interval)
          setTimeout(() => setTyping(false), 2000)
        }
      }
    }, 40)

    if (!typing) {
      clearInterval(interval)
      const eraseInterval = setInterval(() => {
        tickRef.current--
        setPlaceholderText(target.slice(0, tickRef.current))
        if (tickRef.current <= 0) {
          clearInterval(eraseInterval)
          setPlaceholderIdx(i => (i + 1) % SEARCH_PLACEHOLDERS.length)
          setTyping(true)
        }
      }, 20)
      return () => clearInterval(eraseInterval)
    }

    return () => clearInterval(interval)
  }, [typing, placeholderIdx, searchFocused, searchQuery])

  return (
    <div className="landing">
      <Navbar />

      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__hero-container">
          <div className="landing__hero-content">
            <span className="landing__tagline">A CLEARER WAY TO SOURCE</span>
            <h1 className="landing__headline">
              Find verified suppliers.<br />Connect with confidence.
            </h1>
            <p className="landing__description">
              Discover the right business partners, understand their verification status,
              and start your next sourcing conversation with confidence.
            </p>

            <div className="landing__search-bar">
              <span className="landing__search-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
              <input
                type="text"
                value={searchFocused ? searchQuery : (searchQuery || placeholderText)}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => { setSearchFocused(true); }}
                onBlur={() => setSearchFocused(false)}
                onKeyDown={e => e.key === 'Enter' && navigate('/find-suppliers')}
                placeholder={searchFocused ? 'Search suppliers, products or industries' : ''}
                className={`landing__search-input ${!searchFocused && !searchQuery ? 'landing__search-input--animated' : ''}`}
              />
              <button
                className="landing__search-btn"
                onClick={() => navigate('/find-suppliers')}
              >
                Search
              </button>
            </div>

            <div className="landing__category-chips">
              {['Packaging', 'Textiles', 'Equipment'].map(cat => (
                <span
                  key={cat}
                  className="landing__chip"
                  onClick={() => navigate('/find-suppliers')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
                  </svg>
                  {cat}
                </span>
              ))}
            </div>

            <div className="landing__trust-note">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
              </svg>
              <p>Transparent tiers. No hidden trust claims.</p>
            </div>
          </div>
          <DirectoryPreview />
        </div>
      </section>

      {/* Stats */}
      <section className="landing__stats">
        <div className="landing__stats-grid">
          {[
            ['2,400+', 'Supplier profiles'],
            ['12', 'Industry categories'],
            ['28', 'States represented'],
            ['3', 'Transparent badge tiers'],
          ].map(([value, label]) => (
            <div key={label} className="landing__stat-item">
              <p className="landing__stat-value">{value}</p>
              <p className="landing__stat-label">{label}</p>
            </div>
          ))}
        </div>
        <p className="landing__stats-note">Illustrative concept statistics, not audited marketplace claims.</p>
      </section>

      {/* How It Works */}
      <section className="landing__hiw">
        <span className="landing__section-tag">Two paths. One trusted network.</span>
        <h2 className="landing__section-title">How it works</h2>
        <div className="landing__hiw-cards">
          <div className="landing__hiw-card">
            <h3>For buyers</h3>
            <div className="landing__hiw-steps">
              {[
                [1, 'Search with purpose', 'Search by product, industry or location.'],
                [2, 'Understand the business', 'Review profiles and the criteria behind each badge.'],
                [3, 'Connect with confidence', 'Create your account and head to buyer home.'],
              ].map(([n, t, d]) => (
                <div key={n} className="landing__hiw-step">
                  <div className="landing__hiw-step-num">{n}</div>
                  <div>
                    <p className="landing__hiw-step-title">{t}</p>
                    <p className="landing__hiw-step-desc">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="landing__hiw-card">
            <h3>For sellers</h3>
            <div className="landing__hiw-steps">
              {[
                [1, 'Create your account', 'Verify your email and mobile to earn Tier 1.'],
                [2, 'Build your business profile', 'Add business details, domain and address proof.'],
                [3, 'Submit for manual review', 'Track your review from your seller home.'],
              ].map(([n, t, d]) => (
                <div key={n} className="landing__hiw-step">
                  <div className="landing__hiw-step-num">{n}</div>
                  <div>
                    <p className="landing__hiw-step-title">{t}</p>
                    <p className="landing__hiw-step-desc">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verification Tiers */}
      <section className="landing__tiers">
        <span className="landing__section-tag">Know what sits behind the badge</span>
        <h2 className="landing__section-title">Trust is specific. Our tiers are too.</h2>
        <p className="landing__section-subtitle">
          Every badge describes a completed milestone—not a guarantee of product quality or a substitute for your own due diligence.
        </p>
        <div className="landing__tiers-grid">
          {[
            [1, 'Tier 1', 'Email and mobile verified with OTP.', ['User Verified']],
            [2, 'Tier 2', 'Business documents approved by manual review.', ['Business Domain Verified', 'Business Name Matched', 'Business Address Matched']],
            [3, 'Tier 3', 'Approved business with an active Premium plan.', ['Premium Member']],
          ].map(([tier, label, desc, badges]) => (
            <div key={tier} className="landing__tier-card">
              <span className={`landing__tier-badge landing__tier-badge--${tier}`}>{label}</span>
              <p className="landing__tier-desc">{desc}</p>
              <div className="landing__tier-badges">
                {badges.map(b => (
                  <span key={b} className={`landing__mini-badge landing__mini-badge--${tier === 1 ? 'blue' : tier === 2 ? 'green' : 'amber'}`}>{b}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="landing__industries">
        <h2 className="landing__section-title">Find your industry</h2>
        <p className="landing__section-subtitle">From everyday essentials to specialist manufacturing.</p>
        <div className="landing__industries-grid">
          {[
            ['M7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16ZM3.3 7 12 12l8.7-5M12 22V12', 'Packaging & Paper', 'Boxes, labels and sustainable materials'],
            ['M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z', 'Textiles & Apparel', 'Fabric, garments and workwear'],
            ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'Industrial Equipment', 'Machinery, components and tooling'],
            ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4', 'Construction', 'Building materials and supplies'],
            ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12', 'Food & Agriculture', 'Ingredients, produce and processing'],
            ['M14 2v6l3 3.5a7 7 0 1 1-10 0L10 8V2M8.5 2h7M7 16h10', 'Chemicals', 'Specialty chemicals and raw materials'],
          ].map(([path, name, desc]) => (
            <div key={name} className="landing__industry-card" onClick={() => navigate('/find-suppliers')}>
              <span className="landing__industry-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path}/>
                </svg>
              </span>
              <p className="landing__industry-name">{name}</p>
              <p className="landing__industry-desc">{desc}</p>
              <span className="landing__industry-link">Explore industry →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Seller Benefits */}
      <section className="landing__seller">
        <div className="landing__seller-layout">
          <div className="landing__seller-left">
            <span className="landing__section-tag">Built for growing businesses</span>
            <h2 className="landing__section-title">Make your business easier to discover.</h2>
            <div className="landing__seller-benefits">
              {[
                ['A profile that does the introduction', 'Put your capabilities, location and business details in one place.'],
                ['Verification that tells the full story', 'Show exactly which checks are complete and what is still pending.'],
                ['A simple start, with room to grow', 'Register free. Explore optional Premium only when it suits your business.'],
              ].map(([title, desc]) => (
                <div key={title} className="landing__seller-benefit">
                  <svg className="landing__check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <div>
                    <p className="landing__seller-benefit-title">{title}</p>
                    <p className="landing__seller-benefit-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="landing__seller-right">
            <h3 className="landing__seller-tiers-title">Verification Tiers & Badges</h3>
            <div className="landing__seller-tiers">
              <div className="landing__seller-tier">
                <span className="landing__seller-tier-label landing__seller-tier-label--1">Tier 1</span>
                <div className="landing__seller-tier-badges">
                  <span className="landing__mini-badge landing__mini-badge--blue">User Verified</span>
                </div>
              </div>
              <div className="landing__seller-tier">
                <span className="landing__seller-tier-label landing__seller-tier-label--2">Tier 2</span>
                <div className="landing__seller-tier-badges">
                  <span className="landing__mini-badge landing__mini-badge--green">Business Domain Verified</span>
                  <span className="landing__mini-badge landing__mini-badge--green">Business Name Matched</span>
                  <span className="landing__mini-badge landing__mini-badge--green">Business Address Matched</span>
                </div>
              </div>
              <div className="landing__seller-tier">
                <span className="landing__seller-tier-label landing__seller-tier-label--3">Tier 3</span>
                <div className="landing__seller-tier-badges">
                  <span className="landing__mini-badge landing__mini-badge--amber">Premium Member</span>
                </div>
              </div>
            </div>
            <button className="landing__seller-cta" onClick={() => navigate('/auth')}>
              List your business
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="landing__footer">
        <div className="landing__footer-top">
          <h2 className="landing__footer-cta-title">Your next business connection starts here.</h2>
          <p className="landing__footer-cta-desc">Create a free account. Find suppliers or build your business profile.</p>
          <div className="landing__footer-cta-buttons">
            <button className="landing__footer-cta-primary" onClick={() => navigate('/auth')}>
              Get Started
            </button>
            <button className="landing__footer-cta-outline" onClick={() => navigate('/find-suppliers')}>
              Explore suppliers
            </button>
          </div>
        </div>
        <div className="landing__footer-bottom">
          <div className="landing__footer-content">
            <div className="landing__footer-brand">
              <p className="landing__footer-name">Business Dekho</p>
              <p className="landing__footer-tagline">Better sourcing starts with clearer trust.</p>
            </div>
            <div className="landing__footer-links-wrap">
              <div className="landing__footer-links">
                {[
                  ['Find Suppliers', '/find-suppliers'],
                  ['For Sellers', '/for-sellers'],
                  ['Pricing', '/pricing'],
                  ['Contact', '/contact'],
                ].map(([label, to]) => (
                  <a key={label} href={to} className="landing__footer-link">{label}</a>
                ))}
              </div>
              <div className="landing__footer-links">
                {['Privacy Policy', 'Terms of Service', 'Help Center'].map(label => (
                  <a key={label} href="#" className="landing__footer-link">{label}</a>
                ))}
              </div>
            </div>
          </div>
          <p className="landing__footer-copy">© 2026 Business Dekho. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const items = [
    ['What does a verified badge mean?', 'Each tier reflects specific checks. Contact verification confirms email and mobile; business verification requires manual document approval.'],
    ['Can I join as both a buyer and a seller?', 'Yes. Start with a free account. Select "Yes" to list your business, or "No" to go straight to your buyer home.'],
    ['How much does it cost to register?', 'Account registration and a basic business profile are free. Premium is an optional paid plan, never automatically awarded.'],
    ['Are my documents public?', 'No. Your verification documents are used for review and are not displayed on your public supplier profile.'],
  ]

  return (
    <section className="landing__faq">
      <h2 className="landing__section-title">A few things worth knowing</h2>
      <div className="landing__faq-list">
        {items.map(([question, answer], i) => (
          <div
            key={i}
            className="landing__faq-item"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="landing__faq-question">
              <p>{question}</p>
              <span className={`landing__faq-chevron ${openIndex === i ? 'landing__faq-chevron--open' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            {openIndex === i && (
              <div className="landing__faq-answer">{answer}</div>
            )}
          </div>
        ))}
      </div>
      <p className="landing__faq-contact">
        Still have a question?{' '}
        <a href="mailto:hello@businessdekho.example">Contact hello@businessdekho.example</a>
      </p>
    </section>
  )
}

export default Landing
