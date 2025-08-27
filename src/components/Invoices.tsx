import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  Eye,
  Download,
  Building2
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  companyName: string;
  jobId: string;
  jobNumber: string;
  totalAmount: number;
  taxAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  lastUpdate: string;
}

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('this_month');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      companyName: 'Manufacturing Solutions Ltd',
      jobId: 'J001',
      jobNumber: 'JOB-2024-089',
      totalAmount: 825,
      taxAmount: 66,
      status: 'paid',
      issueDate: '2024-01-20',
      dueDate: '2024-02-19',
      paidDate: '2024-01-25',
      paymentMethod: 'bank_transfer',
      lastUpdate: '5 days ago'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      companyName: 'Industrial Power Corp',
      jobId: 'J002',
      jobNumber: 'JOB-2024-088',
      totalAmount: 450,
      taxAmount: 36,
      status: 'sent',
      issueDate: '2024-01-22',
      dueDate: '2024-02-21',
      lastUpdate: '2 days ago'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      companyName: 'Precision Motors Inc',
      jobId: 'J003',
      jobNumber: 'JOB-2024-086',
      totalAmount: 1150,
      taxAmount: 92,
      status: 'overdue',
      issueDate: '2024-01-18',
      dueDate: '2024-02-17',
      lastUpdate: '1 week ago'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      companyName: 'Metro Manufacturing',
      jobId: 'J004',
      jobNumber: 'JOB-2024-087',
      totalAmount: 200,
      taxAmount: 16,
      status: 'draft',
      issueDate: '2024-01-23',
      dueDate: '2024-02-22',
      lastUpdate: '1 day ago'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      companyName: 'Power Systems Ltd',
      jobId: 'J005',
      jobNumber: 'JOB-2024-085',
      totalAmount: 980,
      taxAmount: 78.4,
      status: 'sent',
      issueDate: '2024-01-21',
      dueDate: '2024-02-20',
      lastUpdate: '3 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="h-4 w-4" />;
      case 'sent':
        return <Send className="h-4 w-4" />;
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'cancelled':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate summary metrics
  const totalOutstanding = invoices
    .filter(inv => ['sent', 'overdue'].includes(inv.status))
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const thisMonthRevenue = invoices
    .filter(inv => inv.status === 'paid' && new Date(inv.paidDate!).getMonth() === new Date().getMonth())
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const avgPaymentTime = 15; // Placeholder calculation

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-24 lg:pb-6">
      {/* Header Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600 mt-1">Track payments and manage customer billing</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-red-100">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">${totalOutstanding.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Total Outstanding</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">${thisMonthRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">This Month's Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-orange-100">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">${overdueAmount.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Overdue Amount</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{avgPaymentTime} days</p>
            <p className="text-sm text-gray-600 mt-1">Avg Payment Time</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice number, company, or job..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_quarter">This Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => {
                const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                const isOverdue = daysUntilDue < 0 && invoice.status !== 'paid';
                
                return (
                  <tr key={invoice.id} className={`hover:bg-gray-50 ${isOverdue ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-gray-500">{new Date(invoice.issueDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{invoice.companyName}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{invoice.jobNumber}</span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">${invoice.totalAmount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Tax: ${invoice.taxAmount.toLocaleString()}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span className="ml-1">{invoice.status.replace('_', ' ').toUpperCase()}</span>
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </div>
                        {isOverdue && (
                          <div className="text-xs text-red-600">
                            {Math.abs(daysUntilDue)} days overdue
                          </div>
                        )}
                        {!isOverdue && invoice.status !== 'paid' && daysUntilDue <= 7 && (
                          <div className="text-xs text-orange-600">
                            Due in {daysUntilDue} days
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {invoice.status === 'draft' && (
                        <button className="text-blue-600 hover:text-blue-900 inline-flex items-center space-x-1">
                          <Send className="h-4 w-4" />
                          <span>Send</span>
                        </button>
                      )}
                      {invoice.status === 'sent' && (
                        <button className="text-green-600 hover:text-green-900 inline-flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Mark Paid</span>
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Invoice</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Job *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select completed job</option>
                      <option value="1">JOB-2024-089 - Manufacturing Solutions Ltd</option>
                      <option value="2">JOB-2024-088 - Industrial Power Corp</option>
                      <option value="3">JOB-2024-086 - Precision Motors Inc</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Date *
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Terms
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="30">Net 30 days</option>
                      <option value="15">Net 15 days</option>
                      <option value="45">Net 45 days</option>
                      <option value="60">Net 60 days</option>
                    </select>
                  </div>
                </div>

                {/* Line Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Line Items
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-3 border-t">
                            <input
                              type="text"
                              placeholder="Labor - Motor Rewind"
                              className="w-full border-0 focus:ring-0 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 border-t">
                            <input
                              type="number"
                              placeholder="12"
                              className="w-full border-0 focus:ring-0 text-sm text-center"
                            />
                          </td>
                          <td className="px-4 py-3 border-t">
                            <input
                              type="number"
                              placeholder="85.00"
                              className="w-full border-0 focus:ring-0 text-sm text-center"
                            />
                          </td>
                          <td className="px-4 py-3 border-t text-center text-sm font-medium">
                            $1,020.00
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-t">
                            <input
                              type="text"
                              placeholder="Parts & Materials"
                              className="w-full border-0 focus:ring-0 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 border-t">
                            <input
                              type="number"
                              placeholder="1"
                              className="w-full border-0 focus:ring-0 text-sm text-center"
                            />
                          </td>
                          <td className="px-4 py-3 border-t">
                            <input
                              type="number"
                              placeholder="150.00"
                              className="w-full border-0 focus:ring-0 text-sm text-center"
                            />
                          </td>
                          <td className="px-4 py-3 border-t text-center text-sm font-medium">
                            $150.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="bg-gray-50 px-4 py-3 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="font-medium">$1,170.00</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Tax (8%):</span>
                        <span className="font-medium">$93.60</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="font-medium text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-blue-600">$1,263.60</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes for the customer..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Invoice</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <Receipt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first invoice to start managing billing.'}
          </p>
          {(!searchTerm && statusFilter === 'all') && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Invoice</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Invoices;