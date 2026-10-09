import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './FindSuppliers.css'

const SUPPLIERS = [
  { id: 1, name: 'Mehta Packworks', industry: 'Packaging & Paper', location: 'Gurugram, Haryana', tier: 1, desc: 'Corrugated packaging for e-commerce and retail.' },
  { id: 2, name: 'Sharma Textiles', industry: 'Textiles & Apparel', location: 'Surat, Gujarat', tier: 2, desc: 'Fabric and garment manufacturing with export experience.' },
  { id: 3, name: 'Krishna Industries', industry: 'Industrial Equipment', location: 'Pune, Maharashtra', tier: 2, desc: 'Precision components and tooling for the automotive sector.' },
  { id: 4, name: 'Agarwal Constructs', industry: 'Construction', location: 'Delhi NCR', tier: 1, desc: 'Building materials and civil supply for large projects.' },
  { id: 5, name: 'Green Farms Co', industry: 'Food & Agriculture', location: 'Nashik, Maharashtra', tier: 0, desc: 'Fresh produce and cold-chain logistics for HORECA buyers.' },
  { id: 6, name: 'ChemSpec India', industry: 'Chemicals', location: 'Mumbai, Maharashtra', tier: 3, desc: 'Specialty chemicals with full compliance documentation.' },
  { id: 7, name: 'Ravi Paper Mills', industry: 'Packaging & Paper', location: 'Hyderabad, Telangana', tier: 2, desc: 'Kraft paper and board for industrial packaging needs.' },
  { id: 8, name: 'Bharat Garments', industry: 'Textiles & Apparel', location: 'Tirupur, Tamil Nadu', tier: 1, desc: 'Knitwear and workwear for domestic and export buyers.' },
]

const INDUSTRIES = ['All', 'Packaging & Paper', 'Textiles & Apparel', 'Industrial Equipment', 'Construction', 'Food & Agriculture', 'Chemicals']
const TIERS = ['All', 'Tier 0', 'Tier 1', 'Tier 2', 'Tier 3']

const TIER_LABELS = {
  0: 'Tier 0 Registered',
  1: 'Tier 1 Contact Verified',
  2: 'Tier 2 Business Verified',
  3: 'Tier 3 Premium',
}

function FindSuppliers() {
  const [query, setQuery] = useState('')
  const [industry, setIndustry] = useState('All')
  const [tierFilter, setTierFilter] = useState('All')

  const filtered = SUPPLIERS.filter(s => {
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
        <h1 className="fs__title">Find Suppliers</h1>
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
                  <span className={`fs__badge fs__badge--${s.tier}`}>{TIER_LABELS[s.tier]}</span>
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
                <button className="fs__card-btn">View Profile</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FindSuppliers
