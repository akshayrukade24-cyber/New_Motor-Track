import React, { useState } from 'react'
import { User, Settings, LogOut, HelpCircle, Shield, ChevronDown } from 'lucide-react'

interface ProfileDropdownProps {
  onNavigate?: (view: string) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSecurityModal, setShowSecurityModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)

  const menuItems = [
    {
      icon: User,
      label: 'Profile Settings',
      action: () => setShowProfileModal(true)
    },
    {
      icon: Settings,
      label: 'System Settings',
      action: () => onNavigate?.('settings')
    },
    {
      icon: Shield,
      label: 'Security',
      action: () => setShowSecurityModal(true)
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      action: () => setShowHelpModal(true)
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      action: () => {
        if (confirm('Are you sure you want to sign out?')) {
          // In a real app, this would handle authentication logout
          window.location.reload()
        }
      },
      className: 'text-red-600 hover:text-red-700 hover:bg-red-50'
    }
  ]

  return (
    <>
      <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600" />
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Workshop Admin</p>
          <p className="text-xs text-gray-500">admin@motortrackpro.com</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Workshop Admin</p>
                  <p className="text-sm text-gray-500">admin@motortrackpro.com</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => {
                      item.action()
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      item.className || 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
      </div>

      {/* Profile Settings Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue="Workshop Admin"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@motortrackpro.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1-555-0123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Security Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                <button 
                  onClick={() => setShowSecurityModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-blue-700 mb-3">Add an extra layer of security to your account</p>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Enable 2FA
                  </button>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSecurityModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Help & Support</h2>
                <button 
                  onClick={() => setShowHelpModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    <details className="border border-gray-200 rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                        How do I add a new company?
                      </summary>
                      <div className="p-4 border-t border-gray-200 text-gray-600">
                        Navigate to the Companies section and click the "Add Company" button. Fill in the required information including company name, contact details, and payment terms.
                      </div>
                    </details>
                    <details className="border border-gray-200 rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                        How do I track job progress?
                      </summary>
                      <div className="p-4 border-t border-gray-200 text-gray-600">
                        Go to the Jobs section to view all active jobs. Each job shows its current status, progress percentage, and estimated completion date. You can update job status as work progresses.
                      </div>
                    </details>
                    <details className="border border-gray-200 rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                        How do I generate invoices?
                      </summary>
                      <div className="p-4 border-t border-gray-200 text-gray-600">
                        In the Invoices section, click "Create Invoice" and select a completed job. The system will automatically populate line items based on the job details. You can then send the invoice to the customer.
                      </div>
                    </details>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Support</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-3">Need additional help? Contact our support team:</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> support@motortrackpro.com</p>
                      <p><strong>Phone:</strong> 1-800-MOTOR-PRO</p>
                      <p><strong>Hours:</strong> Monday - Friday, 8 AM - 6 PM EST</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">System Information</h3>
                  <div className="bg-blue-50 p-4 rounded-lg text-sm">
                    <p><strong>Version:</strong> MotorTrack Pro v2.1.0</p>
                    <p><strong>Last Updated:</strong> January 2024</p>
                    <p><strong>Database:</strong> Connected to Supabase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileDropdown