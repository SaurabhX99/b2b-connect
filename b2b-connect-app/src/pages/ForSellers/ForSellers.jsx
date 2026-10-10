import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './ForSellers.css'

function ForSellers() {
  const navigate = useNavigate()

  return (
    <div className="for-sellers">
      <Navbar />

      <section className="fsp__hero">
        <span className="fsp__hero-tag">For Sellers</span>
        <h1 className="fsp__hero-title">
          List your business. Get discovered by serious buyers.
        </h1>
        <p className="fsp__hero-desc">
          Create a free verified profile on Business Dekho and let buyers find you based on what you actually offer.
        </p>
        <div className="fsp__hero-buttons">
          <button className="fsp__btn-primary" onClick={() => navigate('/auth')}>Create free account</button>
          <button className="fsp__btn-outline" onClick={() => navigate('/pricing')}>See pricing</button>
        </div>
      </section>

      <section className="fsp__benefits">
        <h2 className="fsp__section-title">Why list on Business Dekho?</h2>
        <div className="fsp__benefits-grid">
          {[
            ['M21 21-4.35-4.35M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'Be Found', 'Buyers searching your category will see your verified profile first.'],
            ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4', 'Build Trust', 'Verified badges tell buyers exactly what\'s been confirmed about your business.'],
            ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 11l2 2 4-4', 'Free to Start', 'Create your profile and earn Tier 1 contact verification at no cost — ever.'],
            ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM10 6h4M10 10h4M10 14h4M10 18h4', 'Tell Your Story', 'Your profile covers capabilities, location, certifications, and more.'],
          ].map(([path, title, desc]) => (
            <div key={title} className="fsp__benefit-card">
              <span className="fsp__benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path}/>
                </svg>
              </span>
              <p className="fsp__benefit-title">{title}</p>
              <p className="fsp__benefit-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fsp__steps">
        <h2 className="fsp__section-title">How to get listed</h2>
        <div className="fsp__steps-list">
          {[
            ['1', 'Create your account', 'Sign up with email and verify your mobile number to earn your first badge.'],
            ['2', 'Build your profile', 'Add business details, product categories, location, and certifications.'],
            ['3', 'Submit for verification', 'Upload your business documents for verification to reach Tier 2.'],
            ['4', 'Go live', 'Once approved, your profile is discoverable by thousands of buyers.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="fsp__step">
              <div className="fsp__step-num">{num}</div>
              <div>
                <p className="fsp__step-title">{title}</p>
                <p className="fsp__step-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="fsp__btn-primary fsp__steps-cta" onClick={() => navigate('/auth')}>Start for free</button>
      </section>
    </div>
  )
}

export default ForSellers
