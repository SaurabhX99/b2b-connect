import './ProfileSidebar.css'

function ProfileSidebar({ steps, currentStep }) {
  return (
    <aside className="profile-sidebar">
      <div className="profile-sidebar__badge">YOUR BUSINESS PROFILE</div>

      <h2 className="profile-sidebar__title">
        Make your business easier to discover.
      </h2>
      <p className="profile-sidebar__desc">
        The details you add now become the foundation of a clear, credible profile.
      </p>

      <div className="profile-sidebar__steps">
        {steps.map((step, index) => (
          <div key={step.id} className="profile-sidebar__step-item">
            <div className={`profile-sidebar__step-dot ${
              step.id < currentStep ? 'profile-sidebar__step-dot--completed' :
              step.id === currentStep ? 'profile-sidebar__step-dot--active' : ''
            }`}>
              {step.id < currentStep ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className={`profile-sidebar__step-label ${
              step.id === currentStep ? 'profile-sidebar__step-label--active' : ''
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`profile-sidebar__step-line ${
                step.id < currentStep ? 'profile-sidebar__step-line--completed' : ''
              }`} />
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

export default ProfileSidebar
