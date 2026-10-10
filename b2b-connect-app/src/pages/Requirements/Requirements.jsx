import Navbar from '../../components/Navbar/Navbar'
import './Requirements.css'

const REQUIREMENTS = [
  { id: 1, title: 'Need 5000 PET bottles for beverage packaging', buyer: 'FreshJuice Co.', location: 'Delhi NCR', category: 'Packaging & Paper', budget: '₹2-3 Lakh', posted: '2 hours ago', urgent: true },
  { id: 2, title: 'Looking for cotton fabric supplier - 2000 meters', buyer: 'Urban Threads', location: 'Mumbai, Maharashtra', category: 'Textiles & Apparel', budget: '₹5-8 Lakh', posted: '5 hours ago', urgent: false },
  { id: 3, title: 'Eco-friendly corrugated boxes for e-commerce', buyer: 'QuickShip Logistics', location: 'Bengaluru, Karnataka', category: 'Packaging & Paper', budget: '₹1-2 Lakh', posted: '1 day ago', urgent: false },
  { id: 4, title: 'Industrial conveyor belt components needed', buyer: 'AutoParts India', location: 'Pune, Maharashtra', category: 'Industrial Equipment', budget: '₹10-15 Lakh', posted: '1 day ago', urgent: true },
  { id: 5, title: 'Bulk organic wheat flour - 500kg monthly', buyer: 'HealthyBites Kitchen', location: 'Jaipur, Rajasthan', category: 'Food & Agriculture', budget: '₹80K-1 Lakh', posted: '2 days ago', urgent: false },
  { id: 6, title: 'Construction cement and TMT bars for project', buyer: 'BuildRight Infra', location: 'Hyderabad, Telangana', category: 'Construction', budget: '₹20-30 Lakh', posted: '3 days ago', urgent: false },
]

function Requirements() {
  return (
    <div className="requirements-page">
      <Navbar />

      <div className="req__top">
        <h1 className="req__title">Buyer Requirements</h1>
        <p className="req__subtitle">Browse requirements posted by verified buyers. Respond to connect directly.</p>
      </div>

      <div className="req__body">
        <p className="req__count">{REQUIREMENTS.length} open requirements</p>
        <div className="req__grid">
          {REQUIREMENTS.map(r => (
            <div key={r.id} className="req__card">
              <div className="req__card-top">
                <h3 className="req__card-title">{r.title}</h3>
                {r.urgent && <span className="req__card-urgent">Urgent</span>}
              </div>
              <p className="req__card-buyer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                {r.buyer}
              </p>
              <div className="req__card-meta">
                <span className="req__card-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>
                  </svg>
                  {r.category}
                </span>
                <span className="req__card-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {r.location}
                </span>
              </div>
              <div className="req__card-bottom">
                <span className="req__card-budget">Budget: {r.budget}</span>
                <span className="req__card-time">{r.posted}</span>
              </div>
              <button className="req__card-btn">Respond to Requirement</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Requirements
