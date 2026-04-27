import { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/Settings.css'
import { 
  User,
  Lock,
  Palette,
  Bell,
  Shield,
  Key,
  Globe,
  Moon,
  Sun,
  Monitor,
  Eye,
  EyeOff,
  Save,
  Check,
  Copy,
  Trash2,
  Plus,
  RefreshCw,
  Download,
  Upload,
  LogOut,
  AlertTriangle
} from 'lucide-react'

// Clock component (used in security section)
function ClockIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showNewKey, setShowNewKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')

  // Profile Settings
  const [profile, setProfile] = useState({
    username: 'WolfUser',
    email: 'user@server-wolf.com',
    avatar: null,
    bio: 'Bot hosting enthusiast',
    timezone: 'UTC-5 (US Eastern)',
    language: 'en',
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailServerAlerts: true,
    emailPayments: true,
    emailNewsletter: false,
    discordServerAlerts: true,
    discordPayments: false,
  })

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    ipWhitelist: '',
  })

  // Theme Settings
  const [theme, setTheme] = useState({
    mode: 'dark',
    accentColor: '#00ff00',
    fontSize: 'medium',
    sidebarStyle: 'expanded',
    animations: true,
    glassEffect: true,
    gridBackground: true,
  })

  // API Keys - Moved before JSX
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API Key', key: 'sw_key_••••••••••••••••', created: '2026-04-10', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development Key', key: 'sw_key_••••••••••••••••', created: '2026-03-28', lastUsed: '5 days ago' },
  ])

  const accentColors = [
    '#00ff00', '#00ff88', '#39FF14', '#00ccff', '#ff6b35',
    '#ff006e', '#8338ec', '#3a86ff', '#ffbe0b', '#ff0000',
  ]

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Key },
  ]

  const saveSettings = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const generateApiKey = () => {
    if (newKeyName.trim()) {
      const newKey = {
        id: apiKeys.length + 1,
        name: newKeyName,
        key: `sw_key_${Math.random().toString(36).substring(2, 14)}`,
        created: new Date().toISOString().split('T')[0],
        lastUsed: 'Never'
      }
      setApiKeys([...apiKeys, newKey])
      setNewKeyName('')
      setShowNewKey(false)
    }
  }

  return (
    <Layout pageTitle="Settings">
      <div className="settings-page">
        {/* Settings Header */}
        <div className="settings-header">
          <div className="settings-title-section">
            <h1>Settings</h1>
            <p>Manage your account preferences and configuration</p>
          </div>
          <button className="save-settings-btn" onClick={saveSettings}>
            {saved ? <Check size={18} /> : <Save size={18} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Settings Layout */}
        <div className="settings-layout">
          {/* Sidebar Tabs */}
          <div className="settings-sidebar">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h2>Profile Information</h2>
                <p className="section-desc">Update your personal information and how others see you</p>

                <div className="avatar-section">
                  <div className="avatar-preview">
                    <div className="avatar-circle">
                      <span>{profile.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="avatar-actions">
                      <button className="avatar-btn">
                        <Upload size={14} />
                        Upload
                      </button>
                      <button className="avatar-btn danger">
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="avatar-hint">Recommended: 256x256px PNG or JPG</p>
                </div>

                <div className="settings-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Username</label>
                      <input 
                        type="text" 
                        value={profile.username}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Bio</label>
                    <textarea 
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Timezone</label>
                      <select 
                        value={profile.timezone}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                      >
                        <option>UTC-8 (US Pacific)</option>
                        <option>UTC-5 (US Eastern)</option>
                        <option>UTC+0 (London)</option>
                        <option>UTC+1 (Berlin)</option>
                        <option>UTC+3 (Moscow)</option>
                        <option>UTC+5:30 (India)</option>
                        <option>UTC+8 (Singapore)</option>
                        <option>UTC+9 (Tokyo)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Language</label>
                      <select 
                        value={profile.language}
                        onChange={(e) => setProfile({...profile, language: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="pt">Português</option>
                        <option value="ru">Русский</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="settings-section">
                <h2>Security</h2>
                <p className="section-desc">Manage your account security and authentication</p>

                {/* Change Password */}
                <div className="security-card">
                  <div className="security-card-header">
                    <Lock size={20} />
                    <h3>Change Password</h3>
                  </div>
                  <div className="settings-form">
                    <div className="form-group full-width">
                      <label>Current Password</label>
                      <div className="password-input">
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Enter current password"
                        />
                        <button onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <label>New Password</label>
                      <div className="password-input">
                        <input 
                          type={showNewPassword ? 'text' : 'password'} 
                          placeholder="Enter new password"
                        />
                        <button onClick={() => setShowNewPassword(!showNewPassword)}>
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <button className="update-password-btn">Update Password</button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="security-card">
                  <div className="security-card-header">
                    <Shield size={20} />
                    <h3>Two-Factor Authentication</h3>
                  </div>
                  <div className="toggle-row">
                    <div>
                      <span className="toggle-label">Enable 2FA</span>
                      <p className="toggle-desc">Add an extra layer of security to your account</p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={security.twoFactorEnabled}
                        onChange={(e) => setSecurity({...security, twoFactorEnabled: e.target.checked})}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  {security.twoFactorEnabled && (
                    <div className="2fa-setup">
                      <p>Scan this QR code with your authenticator app:</p>
                      <div className="qr-placeholder">QR Code</div>
                      <button className="setup-2fa-btn">Setup 2FA</button>
                    </div>
                  )}
                </div>

                {/* Session Management */}
                <div className="security-card">
                  <div className="security-card-header">
                    <ClockIcon size={20} />
                    <h3>Session Settings</h3>
                  </div>
                  <div className="form-group full-width">
                    <label>Auto Logout (minutes)</label>
                    <select 
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <button className="logout-all-btn">
                    <LogOut size={16} />
                    Logout All Sessions
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="security-card danger-zone">
                  <div className="security-card-header">
                    <AlertTriangle size={20} />
                    <h3>Danger Zone</h3>
                  </div>
                  <p className="danger-desc">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="delete-account-btn">
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Notifications</h2>
                <p className="section-desc">Manage how and when you receive notifications</p>

                <div className="notif-section">
                  <h3>Email Notifications</h3>
                  {[
                    { key: 'emailServerAlerts', label: 'Server Alerts', desc: 'Get notified when your server status changes' },
                    { key: 'emailPayments', label: 'Payment Updates', desc: 'Receive payment confirmations and invoices' },
                    { key: 'emailNewsletter', label: 'Newsletter', desc: 'Weekly updates, tips, and promotions' },
                  ].map((item) => (
                    <div key={item.key} className="toggle-row">
                      <div>
                        <span className="toggle-label">{item.label}</span>
                        <p className="toggle-desc">{item.desc}</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={notifications[item.key]}
                          onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="notif-section">
                  <h3>Discord Notifications</h3>
                  {[
                    { key: 'discordServerAlerts', label: 'Server Alerts', desc: 'Receive alerts via Discord DM' },
                    { key: 'discordPayments', label: 'Payment Updates', desc: 'Payment confirmations via Discord' },
                  ].map((item) => (
                    <div key={item.key} className="toggle-row">
                      <div>
                        <span className="toggle-label">{item.label}</span>
                        <p className="toggle-desc">{item.desc}</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={notifications[item.key]}
                          onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  ))}
                  <button className="connect-discord-btn">
                    Connect Discord Account
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h2>Appearance</h2>
                <p className="section-desc">Customize how SERVER-WOLF looks and feels</p>

                {/* Theme Mode */}
                <div className="appearance-card">
                  <h3>Theme Mode</h3>
                  <div className="theme-mode-grid">
                    {[
                      { mode: 'dark', icon: Moon, label: 'Dark' },
                      { mode: 'light', icon: Sun, label: 'Light' },
                      { mode: 'system', icon: Monitor, label: 'System' },
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.mode}
                          className={`theme-mode-btn ${theme.mode === item.mode ? 'active' : ''}`}
                          onClick={() => setTheme({...theme, mode: item.mode})}
                        >
                          <Icon size={24} />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Accent Color */}
                <div className="appearance-card">
                  <h3>Accent Color</h3>
                  <div className="color-grid">
                    {accentColors.map((color) => (
                      <button
                        key={color}
                        className={`color-swatch ${theme.accentColor === color ? 'active' : ''}`}
                        style={{ background: color }}
                        onClick={() => setTheme({...theme, accentColor: color})}
                      >
                        {theme.accentColor === color && <Check size={14} color="#000" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="appearance-card">
                  <h3>Font Size</h3>
                  <div className="font-size-options">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        className={`font-size-btn ${theme.fontSize === size ? 'active' : ''}`}
                        onClick={() => setTheme({...theme, fontSize: size})}
                      >
                        <span className={`font-preview ${size}`}>Aa</span>
                        <span className="font-label">{size.charAt(0).toUpperCase() + size.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Effects */}
                <div className="appearance-card">
                  <h3>Visual Effects</h3>
                  {[
                    { key: 'animations', label: 'Animations', desc: 'Enable smooth transitions and animations' },
                    { key: 'glassEffect', label: 'Glass Effect', desc: 'Frosted glass panels and cards' },
                    { key: 'gridBackground', label: 'Grid Background', desc: 'Neon grid background pattern' },
                  ].map((item) => (
                    <div key={item.key} className="toggle-row">
                      <div>
                        <span className="toggle-label">{item.label}</span>
                        <p className="toggle-desc">{item.desc}</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={theme[item.key]}
                          onChange={(e) => setTheme({...theme, [item.key]: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="theme-preview">
                  <h3>Preview</h3>
                  <div className={`preview-window ${theme.mode}`} style={{ '--preview-accent': theme.accentColor }}>
                    <div className="preview-sidebar">
                      <div className="preview-logo"></div>
                      <div className="preview-nav">
                        <div className="preview-nav-item active" style={{ background: theme.accentColor }}></div>
                        <div className="preview-nav-item"></div>
                        <div className="preview-nav-item"></div>
                      </div>
                    </div>
                    <div className="preview-main">
                      <div className="preview-header"></div>
                      <div className="preview-cards">
                        <div className="preview-card" style={{ borderColor: theme.accentColor }}></div>
                        <div className="preview-card"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API Keys Settings */}
            {activeTab === 'api' && (
              <div className="settings-section">
                <h2>API Keys</h2>
                <p className="section-desc">Manage API keys for programmatic access</p>

                <div className="api-header">
                  <button className="create-key-btn" onClick={() => setShowNewKey(true)}>
                    <Plus size={16} />
                    Create API Key
                  </button>
                </div>

                <div className="api-keys-list">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="api-key-item">
                      <div className="key-info">
                        <Key size={18} />
                        <div>
                          <span className="key-name">{key.name}</span>
                          <span className="key-meta">Created: {key.created} • Last used: {key.lastUsed}</span>
                        </div>
                      </div>
                      <div className="key-actions">
                        <code className="key-value">{key.key}</code>
                        <button className="key-action-btn" onClick={() => copyToClipboard(key.key)}>
                          <Copy size={14} />
                        </button>
                        <button className="key-action-btn danger">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {showNewKey && (
                  <div className="new-key-form">
                    <h3>Create New API Key</h3>
                    <div className="form-group full-width">
                      <label>Key Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Production API Key" 
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>
                    <div className="form-actions">
                      <button className="cancel-btn" onClick={() => setShowNewKey(false)}>Cancel</button>
                      <button className="generate-btn" onClick={generateApiKey}>
                        <RefreshCw size={14} />
                        Generate Key
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}