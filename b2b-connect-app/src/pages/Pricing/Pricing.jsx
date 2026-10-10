import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './Pricing.css'

function Pricing() {
  const navigate = useNavigate()

  return (
    <div className="pricing-page">
      <Navbar />

      <section className="pricing__content">
        <span className="pricing__tag">Simple, transparent pricing</span>
        <h1 className="pricing__title">Start free. Upgrade when ready.</h1>
        <p className="pricing__subtitle">
          Registration and verification are always free. Premium is optional — no surprise charges.
        </p>

        <div className="pricing__cards">
          <div className="pricing__card">
            <div className="pricing__card-head">
              <p className="pricing__plan-name">Free</p>
              <p className="pricing__price">₹0</p>
              <p className="pricing__price-note">Forever free. No card required.</p>
            </div>
            <div className="pricing__features">
              {[
                'Supplier profile listing',
                'Email & mobile verification',
                'Business document review',
                'Search visibility',
                'Buyer inquiry contact',
              ].map(f => (
                <div key={f} className="pricing__feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button className="pricing__btn pricing__btn--outline" onClick={() => navigate('/auth')}>
              Get started free
            </button>
          </div>

          <div className="pricing__card pricing__card--premium">
            <span className="pricing__popular-tag">Most popular</span>
            <div className="pricing__card-head">
              <p className="pricing__plan-name pricing__plan-name--white">Premium</p>
              <p className="pricing__price pricing__price--white">Contact us</p>
              <p className="pricing__price-note pricing__price-note--dim">Optional upgrade for approved businesses.</p>
            </div>
            <div className="pricing__features">
              {[
                'Everything in Free',
                'Premium badge on profile',
                'Priority placement in search',
                'Featured supplier spotlight',
                'Dedicated support',
                'Advanced profile analytics',
              ].map(f => (
                <div key={f} className="pricing__feature pricing__feature--light">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button className="pricing__btn pricing__btn--primary" onClick={() => navigate('/auth')}>
              Upgrade to Premium
            </button>
          </div>
        </div>

        <p className="pricing__disclaimer">
          Premium is only available after your business is verified. Pricing shown is illustrative.
        </p>
      </section>
    </div>
  )
}

export default Pricing
