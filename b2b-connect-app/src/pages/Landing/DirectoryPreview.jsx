import { useState, useEffect } from 'react'
import './DirectoryPreview.css'

const MOCK_ENTRIES = [
  { name: 'Mehta Packworks', industry: 'Packaging & Paper', time: '2 mins ago', color: '#2D7D46' },
  { name: 'Sharma Textiles', industry: 'Textiles & Apparel', time: '8 mins ago', color: '#4A7DDB' },
  { name: 'Krishna Industries', industry: 'Industrial Equipment', time: '15 mins ago', color: '#D94F4F' },
  { name: 'Agarwal Constructs', industry: 'Construction', time: '32 mins ago', color: '#0f766e' },
  { name: 'Green Farms Co', industry: 'Food & Agriculture', time: '1 hr ago', color: '#92400e' },
  { name: 'ChemSpec India', industry: 'Chemicals', time: '2 hrs ago', color: '#7c3aed' },
  { name: 'Ravi Paper Mills', industry: 'Packaging & Paper', time: '3 hrs ago', color: '#1d4ed8' },
  { name: 'Bharat Garments', industry: 'Textiles & Apparel', time: '4 hrs ago', color: '#be185d' },
  { name: 'Northstar Cloud', industry: 'Cloud Infrastructure', time: '5 hrs ago', color: '#0369a1' },
  { name: 'TechBridge Solutions', industry: 'IT Services', time: '6 hrs ago', color: '#4338ca' },
]

function DirectoryPreview() {
  const [visibleEntries, setVisibleEntries] = useState(MOCK_ENTRIES.slice(0, 4))
  const [animatingIndex, setAnimatingIndex] = useState(null)

  useEffect(() => {
    let entryPointer = 4

    const interval = setInterval(() => {
      const nextEntry = MOCK_ENTRIES[entryPointer % MOCK_ENTRIES.length]
      entryPointer++

      setAnimatingIndex(0)
      setTimeout(() => {
        setVisibleEntries(prev => [nextEntry, ...prev.slice(0, 3)])
        setTimeout(() => setAnimatingIndex(null), 50)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="directory-preview">
      <div className="directory-preview__card">
        <div className="directory-preview__header">
          <span className="directory-preview__label">LIVE DIRECTORY</span>
          <h3 className="directory-preview__title">Partners worth meeting</h3>
          <div className="directory-preview__header-row">
            <span className="directory-preview__badge">18,000+ verified</span>
            <span className="directory-preview__live-dot">
              <span className="directory-preview__dot-pulse" />
              Live
            </span>
          </div>
        </div>

        <div className="directory-preview__feed">
          {visibleEntries.map((entry, i) => (
            <div
              key={`${entry.name}-${i}`}
              className={`directory-preview__entry ${
                animatingIndex === i ? 'directory-preview__entry--entering' : ''
              }`}
            >
              <div
                className="directory-preview__entry-avatar"
                style={{ background: entry.color }}
              >
                {entry.name.charAt(0)}
              </div>
              <div className="directory-preview__entry-info">
                <p className="directory-preview__entry-name">{entry.name}</p>
                <p className="directory-preview__entry-industry">{entry.industry}</p>
              </div>
              <span className="directory-preview__entry-time">{entry.time}</span>
            </div>
          ))}
        </div>

        <div className="directory-preview__footer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
          </svg>
          <span>All profiles are verification-tracked</span>
        </div>
      </div>
    </div>
  )
}

export default DirectoryPreview
