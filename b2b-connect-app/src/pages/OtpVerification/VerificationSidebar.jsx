import './VerificationSidebar.css'

function VerificationSidebar() {
  const features = [
    {
      title: 'Protected business identity',
      description: 'Your details are encrypted and never sold.',
    },
    {
      title: 'Credible introductions',
      description: 'Members know they are connecting with real people.',
    },
    {
      title: 'Safer communication',
      description: 'Verification reduces spam and impersonation.',
    },
  ]

  return (
    <div className="verification-sidebar">
      <div className="verification-sidebar__content">
        <span className="verification-sidebar__label">WHY WE VERIFY</span>
        <h2 className="verification-sidebar__title">
          Trust starts with knowing who&apos;s in the room.
        </h2>
        <p className="verification-sidebar__desc">
          A verified contact point helps keep B2B Connect useful, credible
          and safe for everyone.
        </p>

        <div className="verification-sidebar__features">
          {features.map((feature, index) => (
            <div key={index} className="verification-sidebar__feature">
              <div className="verification-sidebar__feature-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="#2D3B2D"/>
                  <path d="M5.5 9L8 11.5L12.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="verification-sidebar__feature-title">{feature.title}</h4>
                <p className="verification-sidebar__feature-desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerificationSidebar
