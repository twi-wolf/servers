import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext'
import {
  Server,
  Users,
  Activity,
  Plus,
  Play,
  Square,
  RefreshCw,
  Terminal,
  FolderOpen,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  Zap,
  Code2
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()

  const stats = [
    {
      label: 'Active Bots',
      value: '3',
      icon: MessageCircle,
      change: '+1',
      trend: 'up',
      color: '#00ff00'
    },
    {
      label: 'Total Users',
      value: '5',
      icon: Users,
      change: '+2',
      trend: 'up',
      color: '#3b82f6'
    },
    {
      label: 'API Requests Today',
      value: '1,482',
      icon: Zap,
      change: '+18%',
      trend: 'up',
      color: '#00ff00'
    },
    {
      label: 'CPU Usage',
      value: '24%',
      icon: Activity,
      change: '-5%',
      trend: 'down',
      color: '#f59e0b'
    },
  ]

  const servers = [
    {
      id: 1,
      name: 'WA Sales Bot',
      status: 'online',
      cpu: '12%',
      ram: '256MB / 1GB',
      uptime: '3 days',
      node: 'Node-01'
    },
    {
      id: 2,
      name: 'WA Support Bot',
      status: 'online',
      cpu: '8%',
      ram: '180MB / 512MB',
      uptime: '7 days',
      node: 'Node-02'
    },
    {
      id: 3,
      name: 'WA Broadcast Bot',
      status: 'offline',
      cpu: '0%',
      ram: '0MB / 1GB',
      uptime: 'Stopped',
      node: 'Node-01'
    },
  ]

  const recentActivity = [
    { id: 1, action: 'Bot started', server: 'WA Sales Bot', time: '5 minutes ago' },
    { id: 2, action: 'File uploaded', server: 'WA Support Bot', time: '2 hours ago' },
    { id: 3, action: 'API key created', server: 'Application API', time: '5 hours ago' },
    { id: 4, action: 'New user registered', server: 'Users', time: '1 day ago' },
  ]

  return (
    <Layout pageTitle="Dashboard">
      <div className="dashboard">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome back, <span>{user?.username || 'User'}</span></h2>
            <p>Here's what's happening with your WhatsApp bots today.</p>
          </div>
          <Link to="/servers" className="create-server-btn">
            <Plus size={18} />
            New Bot Server
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
              <h3>Your Bot Servers</h3>
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
                  <div className="server-uptime">{server.uptime}</div>
                  <div className="server-actions">
                    {server.status === 'online' ? (
                      <>
                        <button className="server-action-btn" title="Restart"><RefreshCw size={16} /></button>
                        <button className="server-action-btn" title="Stop"><Square size={16} /></button>
                      </>
                    ) : (
                      <button className="server-action-btn" title="Start"><Play size={16} /></button>
                    )}
                    <button className="server-action-btn" title="Terminal"><Terminal size={16} /></button>
                    <button className="server-action-btn" title="File Manager"><FolderOpen size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right">
            {/* Quick Links Card */}
            <div className="dashboard-card quick-actions-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="quick-actions-grid">
                <Link to="/servers" className="quick-action">
                  <Server size={20} />
                  <span>Bot Servers</span>
                </Link>
                <Link to="/users" className="quick-action">
                  <Users size={20} />
                  <span>Manage Users</span>
                </Link>
                <Link to="/api" className="quick-action">
                  <Code2 size={20} />
                  <span>API Keys</span>
                </Link>
                <Link to="/settings" className="quick-action">
                  <Terminal size={20} />
                  <span>Settings</span>
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
          </div>
        </div>
      </div>
    </Layout>
  )
}
