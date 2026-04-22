import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/Dashboard.css'
import { 
  Server, 
  CreditCard, 
  Users, 
  Activity,
  Plus,
  Play,
  Square,
  RefreshCw,
  Terminal,
  FolderOpen,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Copy,
  Check
} from 'lucide-react'

export default function Dashboard() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'WOLF-REF-2026'

  // Mock data - will be replaced with API calls later
  const stats = [
    { 
      label: 'Active Servers', 
      value: '3', 
      icon: Server, 
      change: '+1', 
      trend: 'up',
      color: '#00ff00'
    },
    { 
      label: 'Account Balance', 
      value: '$45.50', 
      icon: CreditCard, 
      change: '+$10', 
      trend: 'up',
      color: '#00ff00'
    },
    { 
      label: 'Total Referrals', 
      value: '12', 
      icon: Users, 
      change: '+3', 
      trend: 'up',
      color: '#00ff00'
    },
    { 
      label: 'Monthly Usage', 
      value: '67%', 
      icon: Activity, 
      change: '-5%', 
      trend: 'down',
      color: '#f59e0b'
    },
  ]

  const servers = [
    { 
      id: 1, 
      name: 'Discord Bot - Music', 
      status: 'online', 
      cpu: '12%', 
      ram: '256MB / 1GB',
      uptime: '3 days',
      node: 'Node-01'
    },
    { 
      id: 2, 
      name: 'Discord Bot - Moderation', 
      status: 'online', 
      cpu: '8%', 
      ram: '180MB / 512MB',
      uptime: '7 days',
      node: 'Node-02'
    },
    { 
      id: 3, 
      name: 'Telegram Bot', 
      status: 'offline', 
      cpu: '0%', 
      ram: '0MB / 1GB',
      uptime: 'Stopped',
      node: 'Node-01'
    },
  ]

  const recentActivity = [
    { id: 1, action: 'Server started', server: 'Discord Bot - Music', time: '5 minutes ago' },
    { id: 2, action: 'File uploaded', server: 'Discord Bot - Moderation', time: '2 hours ago' },
    { id: 3, action: 'Backup created', server: 'Discord Bot - Music', time: '1 day ago' },
    { id: 4, action: 'Payment received', server: 'Account', time: '2 days ago' },
  ]

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Layout pageTitle="Dashboard">
      <div className="dashboard">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome back, <span>Username</span></h2>
            <p>Here's what's happening with your servers today.</p>
          </div>
          <Link to="/servers/create" className="create-server-btn">
            <Plus size={18} />
            Create Server
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon" style={{ borderColor: stat.color }}>
                    <Icon size={22} style={{ color: stat.color }} />
                  </div>
                  <div className={`stat-trend ${stat.trend}`}>
                    {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Left Column - Servers */}
          <div className="dashboard-card servers-card">
            <div className="card-header">
              <h3>Your Servers</h3>
              <Link to="/servers" className="view-all">View All →</Link>
            </div>
            <div className="servers-list">
              {servers.map((server) => (
                <div key={server.id} className="server-item">
                  <div className="server-info">
                    <div className={`server-status ${server.status}`}>
                      <span className="status-dot"></span>
                    </div>
                    <div className="server-details">
                      <h4>{server.name}</h4>
                      <div className="server-meta">
                        <span>{server.node}</span>
                        <span>•</span>
                        <span>CPU: {server.cpu}</span>
                        <span>•</span>
                        <span>RAM: {server.ram}</span>
                      </div>
                    </div>
                  </div>
                  <div className="server-uptime">
                    {server.uptime}
                  </div>
                  <div className="server-actions">
                    {server.status === 'online' ? (
                      <>
                        <button className="server-action-btn" title="Restart">
                          <RefreshCw size={16} />
                        </button>
                        <button className="server-action-btn" title="Stop">
                          <Square size={16} />
                        </button>
                      </>
                    ) : (
                      <button className="server-action-btn" title="Start">
                        <Play size={16} />
                      </button>
                    )}
                    <button className="server-action-btn" title="Terminal">
                      <Terminal size={16} />
                    </button>
                    <button className="server-action-btn" title="File Manager">
                      <FolderOpen size={16} />
                    </button>
                    <button className="server-action-btn" title="More">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right">
            {/* Referral Card */}
            <div className="dashboard-card referral-card">
              <div className="card-header">
                <h3>Referral Program</h3>
                <Users size={20} className="card-icon" />
              </div>
              <div className="referral-content">
                <p className="referral-desc">
                  Invite friends and earn <span>10% commission</span> on their payments!
                </p>
                <div className="referral-code-box">
                  <code>{referralCode}</code>
                  <button 
                    className="copy-btn"
                    onClick={copyReferralCode}
                    title="Copy referral code"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <div className="referral-stats">
                  <div className="ref-stat">
                    <span className="ref-label">Total Referrals</span>
                    <span className="ref-value">12</span>
                  </div>
                  <div className="ref-stat">
                    <span className="ref-label">Earnings</span>
                    <span className="ref-value">$23.50</span>
                  </div>
                </div>
                <Link to="/referrals" className="referral-link">
                  View Referral Dashboard →
                </Link>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="dashboard-card activity-card">
              <div className="card-header">
                <h3>Recent Activity</h3>
                <Activity size={20} className="card-icon" />
              </div>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <p className="activity-meta">
                        {activity.server} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="dashboard-card quick-actions-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="quick-actions-grid">
                <Link to="/servers/create" className="quick-action">
                  <Plus size={20} />
                  <span>New Server</span>
                </Link>
                <Link to="/billing/add-funds" className="quick-action">
                  <CreditCard size={20} />
                  <span>Add Funds</span>
                </Link>
                <Link to="/docs" className="quick-action">
                  <FolderOpen size={20} />
                  <span>Documentation</span>
                </Link>
                <Link to="/support" className="quick-action">
                  <Terminal size={20} />
                  <span>Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}