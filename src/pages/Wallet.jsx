import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/Wallet.css'
import { 
  Wallet as WalletIcon,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react'

export default function Wallet() {
  // Removed unused activeTab state
  const [addAmount, setAddAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe')
  const [showAddFundsModal, setShowAddFundsModal] = useState(false)

  // Mock data
  const walletData = {
    balance: 45.50,
    pendingBalance: 2.30,
    lifetimeDeposits: 125.00,
    lifetimeSpent: 79.50,
    recentTransactions: [
      { id: 1, type: 'deposit', amount: 20.00, status: 'completed', date: '2026-04-22', time: '14:30', method: 'Stripe', description: 'Added funds via Stripe' },
      { id: 2, type: 'payment', amount: -15.00, status: 'completed', date: '2026-04-20', time: '09:15', method: 'Wallet', description: 'Server: Discord Music Bot - Monthly' },
      { id: 3, type: 'deposit', amount: 10.00, status: 'completed', date: '2026-04-18', time: '16:45', method: 'PayPal', description: 'Added funds via PayPal' },
      { id: 4, type: 'refund', amount: 5.00, status: 'completed', date: '2026-04-15', time: '11:20', method: 'Wallet', description: 'Refund for overcharge' },
      { id: 5, type: 'payment', amount: -12.50, status: 'pending', date: '2026-04-14', time: '13:00', method: 'Wallet', description: 'Server: Moderation Bot - Monthly' },
      { id: 6, type: 'deposit', amount: 50.00, status: 'completed', date: '2026-04-10', time: '10:00', method: 'Stripe', description: 'Added funds via Stripe' },
      { id: 7, type: 'withdrawal', amount: -25.00, status: 'completed', date: '2026-04-05', time: '15:30', method: 'Bank Transfer', description: 'Withdrawal to bank account' },
    ],
    paymentMethods: [
      { id: 1, type: 'stripe', name: 'Stripe', icon: CreditCard, last4: '4242', expiry: '12/28' },
      { id: 2, type: 'paypal', name: 'PayPal', icon: DollarSign, email: 'user@example.com' },
    ],
    quickAddAmounts: [10, 20, 50, 100]
  }

  const stats = [
    { label: 'Available Balance', value: `$${walletData.balance.toFixed(2)}`, icon: WalletIcon, color: '#00ff00' },
    { label: 'Pending', value: `$${walletData.pendingBalance.toFixed(2)}`, icon: Clock, color: '#f59e0b' },
    { label: 'Total Deposits', value: `$${walletData.lifetimeDeposits.toFixed(2)}`, icon: TrendingUp, color: '#10b981' },
    { label: 'Total Spent', value: `$${walletData.lifetimeSpent.toFixed(2)}`, icon: ArrowUpRight, color: '#ef4444' },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} className="status-icon success" />
      case 'pending': return <Clock size={14} className="status-icon pending" />
      case 'failed': return <XCircle size={14} className="status-icon failed" />
      default: return null
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft size={14} className="type-icon deposit" />
      case 'payment': return <ArrowUpRight size={14} className="type-icon payment" />
      case 'refund': return <RefreshCw size={14} className="type-icon refund" />
      case 'withdrawal': return <Minus size={14} className="type-icon withdrawal" />
      default: return null
    }
  }

  // Removed unused copyToClipboard function

  return (
    <Layout pageTitle="Wallet">
      <div className="wallet-page">
        {/* Wallet Header */}
        <div className="wallet-header">
          <div className="wallet-title-section">
            <h1>Wallet</h1>
            <p>Manage your funds, view transactions, and add credits</p>
          </div>
          <button 
            className="add-funds-btn"
            onClick={() => setShowAddFundsModal(true)}
          >
            <Plus size={18} />
            Add Funds
          </button>
        </div>

        {/* Stats Cards */}
        <div className="wallet-stats">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="wallet-stat-card">
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

        {/* Main Content */}
        <div className="wallet-content">
          {/* Left Column - Quick Actions & Payment Methods */}
          <div className="wallet-left">
            {/* Quick Add */}
            <div className="wallet-card">
              <h3>Quick Add Funds</h3>
              <div className="quick-add-grid">
                {walletData.quickAddAmounts.map((amount) => (
                  <button 
                    key={amount} 
                    className="quick-add-btn"
                    onClick={() => setAddAmount(amount.toString())}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="custom-amount">
                <input 
                  type="number" 
                  placeholder="Custom amount"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="amount-input"
                  min="5"
                  step="5"
                />
                <button className="add-now-btn">Add Now</button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="wallet-card">
              <div className="card-header-with-action">
                <h3>Payment Methods</h3>
                <button className="add-method-btn">
                  <Plus size={16} />
                  Add
                </button>
              </div>
              <div className="payment-methods-list">
                {walletData.paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div key={method.id} className="payment-method-item">
                      <div className="method-icon">
                        <Icon size={18} />
                      </div>
                      <div className="method-info">
                        <span className="method-name">{method.name}</span>
                        <span className="method-detail">
                          {method.last4 ? `**** ${method.last4}` : method.email}
                        </span>
                      </div>
                      {method.expiry && (
                        <span className="method-expiry">{method.expiry}</span>
                      )}
                      <button className="method-default">Default</button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Referral Earnings */}
            <div className="wallet-card">
              <h3>Referral Earnings</h3>
              <div className="referral-earnings">
                <div className="earnings-stat">
                  <span className="earnings-label">Total Earned</span>
                  <span className="earnings-value">$23.50</span>
                </div>
                <div className="earnings-stat">
                  <span className="earnings-label">Pending</span>
                  <span className="earnings-value">$4.20</span>
                </div>
                <div className="earnings-stat">
                  <span className="earnings-label">This Month</span>
                  <span className="earnings-value">$8.30</span>
                </div>
              </div>
              <Link to="/referrals" className="view-referrals-link">
                View Referral Dashboard
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column - Transaction History */}
          <div className="wallet-right">
            <div className="wallet-card full-height">
              <div className="transactions-header">
                <h3>Transaction History</h3>
                <div className="transactions-actions">
                  <button className="filter-btn">
                    <Filter size={14} />
                    Filter
                  </button>
                  <button className="export-btn">
                    <Download size={14} />
                    Export
                  </button>
                </div>
              </div>

              {/* Transaction Filters */}
              <div className="transaction-filters">
                <button className="filter-chip active">All</button>
                <button className="filter-chip">Deposits</button>
                <button className="filter-chip">Payments</button>
                <button className="filter-chip">Refunds</button>
                <button className="filter-chip">Withdrawals</button>
              </div>

              {/* Transactions List */}
              <div className="transactions-list">
                {walletData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-icon-wrapper">
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-main">
                        <span className="transaction-description">{transaction.description}</span>
                        <span className={`transaction-amount ${transaction.type}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="transaction-meta">
                        <span className="transaction-method">{transaction.method}</span>
                        <span className="transaction-dot">•</span>
                        <span className="transaction-date">{transaction.date}</span>
                        <span className="transaction-time">{transaction.time}</span>
                        <span className="transaction-dot">•</span>
                        {getStatusIcon(transaction.status)}
                        <span className={`transaction-status ${transaction.status}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Funds Modal */}
        {showAddFundsModal && (
          <div className="modal-overlay" onClick={() => setShowAddFundsModal(false)}>
            <div className="add-funds-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add Funds to Wallet</h2>
                <button className="modal-close" onClick={() => setShowAddFundsModal(false)}>
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="amount-selection">
                  <label>Select Amount</label>
                  <div className="amount-options">
                    {walletData.quickAddAmounts.map((amount) => (
                      <button 
                        key={amount}
                        className={`amount-option ${addAmount === amount.toString() ? 'selected' : ''}`}
                        onClick={() => setAddAmount(amount.toString())}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="custom-amount-input">
                    <span className="currency-symbol">$</span>
                    <input 
                      type="number" 
                      placeholder="Enter custom amount"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      min="5"
                    />
                  </div>
                </div>

                <div className="payment-method-selection">
                  <label>Payment Method</label>
                  <div className="method-options">
                    <label className={`method-option ${selectedPaymentMethod === 'stripe' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="stripe"
                        checked={selectedPaymentMethod === 'stripe'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      />
                      <CreditCard size={18} />
                      <span>Credit Card (Stripe)</span>
                    </label>
                    <label className={`method-option ${selectedPaymentMethod === 'paypal' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="paypal"
                        checked={selectedPaymentMethod === 'paypal'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      />
                      <DollarSign size={18} />
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>

                <div className="order-summary">
                  <h4>Order Summary</h4>
                  <div className="summary-row">
                    <span>Amount</span>
                    <span>${addAmount || '0.00'}</span>
                  </div>
                  <div className="summary-row">
                    <span>Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${addAmount || '0.00'}</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowAddFundsModal(false)}>
                  Cancel
                </button>
                <button className="confirm-btn">
                  Proceed to Payment
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}