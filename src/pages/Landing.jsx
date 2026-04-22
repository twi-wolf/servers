import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <div className="neon-bg"></div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            BOT HOSTING PLATFORM
          </div>
          
          <h1 className="hero-title">
            <span className="title-white">GET YOUR SERVER</span><br/>
            <span className="title-green">DEPLOY YOUR BOTS.</span>
          </h1>
          
          <p className="hero-sub">// Deploy in seconds</p>
          
          <p className="hero-description">
            SERVER-WOLF provides powerful, reliable bot hosting with an intuitive panel. 
            Upload, manage, and scale your Discord bots with zero downtime.
          </p>

          <div className="hero-cta">
            <Link to="/register" className="btn-primary-large">
              <div className="btn-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <div className="card-title">Get Started</div>
              <p className="card-desc">Create an account and deploy your first bot in minutes.</p>
              <span className="btn-text">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Start Hosting
              </span>
            </Link>

            <a href="#pricing" className="btn-outline-large">
              <div className="btn-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="card-title">View Pricing</div>
              <p className="card-desc">Choose the perfect plan for your bot hosting needs.</p>
              <span className="btn-text">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                See Plans
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}