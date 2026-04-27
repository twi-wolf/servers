import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/Referrals.css'
import { 
  Users,
  TrendingUp,
  DollarSign,
  Link as LinkIcon,
  Copy,
  Check,
  Share2,
  Gift,
  Star,
  UserPlus,
  Clock,
  ChevronDown,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react'

export default function Referrals() {
  const [copied, setCopied] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const referralCode = 'WOLF-USER-2026'
  const referralLink = `https://server-wolf.com/ref/${referralCode}`

  const stats = [
    { label: 'Total Referrals', value: '12', icon: Users, color: '#00ff00' },
    { label: 'Total Earnings', value: '$23.50', icon: DollarSign, color: '#10b981' },
    { label: 'Pending Earnings', value: '$4.20', icon: Clock, color: '#f59e0b' },
    { label: 'Conversion Rate', value: '24%', icon: TrendingUp, color: '#3b82f6' },
  ]

  const referralData = {
    commission: 10,
    bonus: 'Free 1GB RAM upgrade per 5 referrals',
    tiers: [
      { name: 'Starter', min: 0, max: 5, commission: '10%', color: '#9ca3af' },
      { name: 'Pro', min: 6, max: 15, commission: '15%', color: '#00ff00' },
      { name: 'Elite', min: 16, max: 50, commission: '20%', color: '#f59e0b' },
      { name: 'Legend', min: 51, max: null, commission: '25% + Bonuses', color: '#ef4444' },
    ],
    currentTier: 'Pro'
  }

  const referredUsers = [
    { 
      id: 1, 
      username: 'botmaster99', 
      joined: '2026-04-20', 
      status: 'active',
      spent: 45.00,
      earnings: 4.50,
      servers: 2
    },
    { 
      id: 2, 
      username: 'discord_pro', 
      joined: '2026-04-15', 
      status: 'active',
      spent: 30.00,
      earnings: 3.00,
      servers: 1
    },
    { 
      id: 3, 
      username: 'music_bot_fan', 
      joined: '2026-04-10', 
      status: 'active',
      spent: 80.00,
      earnings: 8.00,
      servers: 3
    },
    { 
      id: 4, 
      username: 'server_admin', 
      joined: '2026-04-05', 
      status: 'inactive',
      spent: 15.00,
      earnings: 1.50,
      servers: 0
    },
    { 
      id: 5, 
      username: 'bot_developer', 
      joined: '2026-03-28', 
      status: 'active',
      spent: 65.00,
      earnings: 6.50,
      servers: 2
    },
    { 
      id: 6, 
      username: 'gaming_server', 
      joined: '2026-03-20', 
      status: 'active',
      spent: 0,
      earnings: 0,
      servers: 1
    },
  ]

  const recentActivity = [
    { id: 1, action: 'New referral signed up', user: 'botmaster99', earnings: '+$4.50', time: '2 days ago' },
    { id: 2, action: 'Referral payment received', user: 'discord_pro', earnings: '+$3.00', time: '5 days ago' },
    { id: 3, action: 'Tier upgrade', user: 'You', earnings: 'Pro Tier', time: '1 week ago' },
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join SERVER-WOLF',
        text: 'Get 10% off your first month of bot hosting with my referral link!',
        url: referralLink,
      })
    }
  }

  const filteredUsers = referredUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout pageTitle="Referrals">
      <div className="referrals-page">
        {/* Referral Header */}
        <div className="referrals-header">
          <div className="referrals-title-section">
            <h1>Referral Program</h1>
            <p>Invite friends and earn commission on their payments</p>
          </div>
          <div className="header-actions">
            <button className="share-btn" onClick={shareReferral}>
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="referral-stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="referral-stat-card">
                <div className="stat-icon" style={{ borderColor: stat.color }}>
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="referrals-content">
          {/* Left Column */}
          <div className="referrals-left">
            {/* Referral Link Card */}
            <div className="referral-card">
              <h3>Your Referral Link</h3>
              <p className="card-desc">
                Share this link with friends to earn {referralData.commission}% commission on their payments
              </p>
              <div className="referral-link-box">
                <code>{referralLink}</code>
                <button 
                  className="copy-link-btn"
                  onClick={() => copyToClipboard(referralLink)}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Commission Tiers */}
            <div className="referral-card">
              <h3>Commission Tiers</h3>
              <div className="tiers-list">
                {referralData.tiers.map((tier, index) => {
                  const isCurrent = tier.name === referralData.currentTier
                  return (
                    <div key={index} className={`tier-item ${isCurrent ? 'current' : ''}`}>
                      <div className="tier-indicator" style={{ borderColor: tier.color }}>
                        <div className="tier-dot" style={{ background: tier.color }}></div>
                      </div>
                      <div className="tier-info">
                        <span className="tier-name" style={{ color: tier.color }}>
                          {tier.name}
                          {isCurrent && <Star size={12} className="current-badge" />}
                        </span>
                        <span className="tier-range">
                          {tier.min}{tier.max ? ` - ${tier.max}` : '+'} referrals
                        </span>
                      </div>
                      <span className="tier-commission" style={{ color: tier.color }}>
                        {tier.commission}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="tier-progress">
                <div className="progress-info">
                  <span>Progress to Elite</span>
                  <span>12 / 16 referrals</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            {/* Bonus Rewards */}
            <div className="referral-card">
              <h3>Bonus Rewards</h3>
              <div className="bonus-list">
                <div className="bonus-item">
                  <Gift size={18} />
                  <div className="bonus-info">
                    <span className="bonus-title">5 Referrals</span>
                    <span className="bonus-desc">Free 1GB RAM upgrade</span>
                  </div>
                  <span className="bonus-status earned">Earned!</span>
                </div>
                <div className="bonus-item">
                  <Gift size={18} />
                  <div className="bonus-info">
                    <span className="bonus-title">10 Referrals</span>
                    <span className="bonus-desc">1 month free hosting</span>
                  </div>
                  <span className="bonus-status earned">Earned!</span>
                </div>
                <div className="bonus-item locked">
                  <Gift size={18} />
                  <div className="bonus-info">
                    <span className="bonus-title">25 Referrals</span>
                    <span className="bonus-desc">Lifetime 5% discount</span>
                  </div>
                  <span className="bonus-status">13 to go</span>
                </div>
                <div className="bonus-item locked">
                  <Gift size={18} />
                  <div className="bonus-info">
                    <span className="bonus-title">50 Referrals</span>
                    <span className="bonus-desc">Free Enterprise plan</span>
                  </div>
                  <span className="bonus-status">38 to go</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="referrals-right">
            {/* Search Bar */}
            <div className="referral-card">
              <div className="search-wrapper">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search referred users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Referred Users Table */}
            <div className="referral-card">
              <div className="table-header">
                <h3>Referred Users</h3>
                <span className="user-count">{filteredUsers.length} users</span>
              </div>
              <div className="referral-table">
                <div className="table-head">
                  <div className="table-cell username-col">Username</div>
                  <div className="table-cell joined-col">Joined</div>
                  <div className="table-cell status-col">Status</div>
                  <div className="table-cell spent-col">Spent</div>
                  <div className="table-cell earnings-col">Earnings</div>
                  <div className="table-cell servers-col">Servers</div>
                </div>
                {filteredUsers.map((user) => (
                  <div key={user.id} className="table-row">
                    <div className="table-cell username-col">
                      <UserPlus size={14} />
                      <span>{user.username}</span>
                    </div>
                    <div className="table-cell joined-col">{user.joined}</div>
                    <div className="table-cell status-col">
                      <span className={`user-status ${user.status}`}>
                        <span className="status-dot"></span>
                        {user.status}
                      </span>
                    </div>
                    <div className="table-cell spent-col">${user.spent.toFixed(2)}</div>
                    <div className="table-cell earnings-col" style={{ color: '#00ff00' }}>
                      +${user.earnings.toFixed(2)}
                    </div>
                    <div className="table-cell servers-col">{user.servers}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="referral-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <p className="activity-meta">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                    <span className="activity-earnings">{activity.earnings}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="referral-card">
              <h3>How It Works</h3>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <span className="step-title">Share your link</span>
                    <p className="step-desc">Share your unique referral link with friends on Discord, social media, or anywhere</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <span className="step-title">They sign up</span>
                    <p className="step-desc">When they create an account using your link, they're tracked as your referral</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <span className="step-title">Earn commission</span>
                    <p className="step-desc">Earn {referralData.commission}% commission on every payment they make, plus unlock bonuses!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}