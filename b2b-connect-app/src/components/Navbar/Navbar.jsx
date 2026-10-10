import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  // Mock user state from location
  const userState = location.state || {}
  const isLoggedIn = !!userState.userName
  const userName = userState.userName || ''
  const userRole = userState.role || 'buyer'
  const isPremium = userState.isPremium || false

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const getInitials = (name) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleLogout = () => {
    setProfileOpen(false)
    navigate('/')
  }

  const NAV_LINKS = [
    { label: 'Find Suppliers', to: '/find-suppliers' },
    { label: 'For Sellers', to: '/for-sellers' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span>Business Dekho</span>
        </Link>

        <div className="navbar__links">
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} className="navbar__link">
              {link.label}
            </Link>
          ))}
        </div>

        {isLoggedIn ? (
          <div className="navbar__profile" ref={profileRef}>
            <button
              className="navbar__profile-trigger"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="navbar__avatar">
                {getInitials(userName)}
              </div>
              <span className="navbar__profile-name">{userName.split(' ')[0]}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {profileOpen && (
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-header">
                  <div className="navbar__avatar navbar__avatar--lg">
                    {getInitials(userName)}
                  </div>
                  <div>
                    <p className="navbar__dropdown-name">{userName}</p>
                    <p className="navbar__dropdown-since">Active since Oct 2026</p>
                  </div>
                </div>

                <div className="navbar__dropdown-divider" />

                {userRole === 'buyer' && (
                  <button className="navbar__dropdown-item" onClick={() => {
                    setProfileOpen(false)
                    navigate('/onboarding', { state: { ...userState, role: 'seller' } })
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                    </svg>
                    List as Seller
                  </button>
                )}

                {userRole === 'seller' && (
                  <>
                    <button className="navbar__dropdown-item" onClick={() => {
                      setProfileOpen(false)
                      navigate('/onboarding', { state: { ...userState } })
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      Manage Account
                    </button>
                    <button className="navbar__dropdown-item" onClick={() => {
                      setProfileOpen(false)
                      navigate('/catalogue', { state: { ...userState } })
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      Manage Catalogue
                    </button>
                  </>
                )}

                {userRole === 'seller' && !isPremium && (
                  <button className="navbar__dropdown-item navbar__dropdown-item--premium" onClick={() => {
                    setProfileOpen(false)
                    navigate('/pricing')
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2 L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26Z"/>
                    </svg>
                    Upgrade to Premium
                  </button>
                )}

                <button className="navbar__dropdown-item navbar__dropdown-item--logout" onClick={handleLogout}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar__actions">
            <button className="navbar__signin" onClick={() => navigate('/login')}>
              Log in
            </button>
            <button className="navbar__cta" onClick={() => navigate('/auth')}>
              Get Started
            </button>
          </div>
        )}

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar__mobile-actions">
            {isLoggedIn ? (
              <>
                <div className="navbar__mobile-profile">
                  <div className="navbar__avatar">{getInitials(userName)}</div>
                  <span>{userName}</span>
                </div>
                {userRole === 'seller' && (
                  <>
                    <button className="navbar__mobile-cta" onClick={() => { navigate('/onboarding', { state: { ...userState } }); setMenuOpen(false); }}>
                      Manage Account
                    </button>
                    <button className="navbar__mobile-cta" onClick={() => { navigate('/catalogue', { state: { ...userState } }); setMenuOpen(false); }}>
                      Manage Catalogue
                    </button>
                  </>
                )}
                {userRole === 'buyer' && (
                  <button className="navbar__mobile-cta" onClick={() => { navigate('/onboarding', { state: { ...userState, role: 'seller' } }); setMenuOpen(false); }}>
                    List as Seller
                  </button>
                )}
                <button className="navbar__mobile-login" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <button className="navbar__mobile-login" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
                  Log in
                </button>
                <button className="navbar__mobile-cta" onClick={() => { navigate('/auth'); setMenuOpen(false); }}>
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
