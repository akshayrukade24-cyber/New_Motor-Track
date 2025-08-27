import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Settings,
  Wrench,
  Receipt,
  Shield,
  Building2,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Sample data for charts and metrics
  const revenueData = [
    { month: 'Jul', revenue: 12500, jobs: 18 },
    { month: 'Aug', revenue: 15200, jobs: 22 },
    { month: 'Sep', revenue: 18900, jobs: 28 },
    { month: 'Oct', revenue: 16800, jobs: 24 },
    { month: 'Nov', revenue: 21200, jobs: 31 },
    { month: 'Dec', revenue: 19800, jobs: 29 }
  ];

  const motorTypeDistribution = [
    { type: 'AC Motor', count: 45, percentage: 48, color: 'bg-blue-500' },
    { type: 'DC Motor', count: 22, percentage: 23, color: 'bg-purple-500' },
    { type: 'Servo Motor', count: 15, percentage: 16, color: 'bg-teal-500' },
    { type: 'Generator', count: 8, percentage: 9, color: 'bg-green-500' },
    { type: 'Turbine', count: 4, percentage: 4, color: 'bg-orange-500' }
  ];

  const topCustomers = [
    { name: 'Manufacturing Solutions Ltd', revenue: 8500, jobs: 12 },
    { name: 'Industrial Power Corp', revenue: 6200, jobs: 9 },
    { name: 'Metro Manufacturing', revenue: 5800, jobs: 8 },
    { name: 'Power Systems Ltd', revenue: 4100, jobs: 6 },
    { name: 'Precision Motors Inc', revenue: 3900, jobs: 5 }
  ];

  const technicianPerformance = [
    { name: 'John Smith', jobsCompleted: 28, avgTime: 4.2, efficiency: 95 },
    { name: 'Mike Johnson', jobsCompleted: 24, avgTime: 4.8, efficiency: 89 },
    { name: 'Sarah Wilson', jobsCompleted: 22, avgTime: 5.1, efficiency: 87 }
  ];

  const getMaxRevenue = () => Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-24 lg:pb-6">
      {/* Header Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Business Reports</h1>
            <p className="text-gray-600 mt-1">Comprehensive analytics and business insights</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Custom Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_quarter">This Quarter</option>
              <option value="this_year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="overview">Business Overview</option>
              <option value="financial">Financial Report</option>
              <option value="operational">Operational Report</option>
              <option value="customer">Customer Report</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              +18%
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">$19,800</p>
            <p className="text-sm text-gray-600 mt-1">This Month Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12%
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">29</p>
            <p className="text-sm text-gray-600 mt-1">Jobs Completed</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-100">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">4.7 days</p>
            <p className="text-sm text-gray-600 mt-1">Avg Completion Time</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-teal-100">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8%
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">94%</p>
            <p className="text-sm text-gray-600 mt-1">Customer Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Revenue Trends (6 Months)</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Jobs</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {revenueData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900">${data.revenue.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">{data.jobs} jobs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(data.revenue / getMaxRevenue()) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motor Type Distribution & Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Motor Type Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Motor Type Distribution</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {motorTypeDistribution.map((motor, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-4 h-4 ${motor.color} rounded`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{motor.type}</span>
                    <span className="text-sm text-gray-600">{motor.count} ({motor.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${motor.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${motor.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Customers</h2>
            <Building2 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.jobs} jobs completed</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${customer.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technician Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Technician Performance</h2>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Technician</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Jobs Completed</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Avg Completion Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {technicianPerformance.map((tech, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {tech.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{tech.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{tech.jobsCompleted}</td>
                  <td className="py-3 px-4 text-gray-900">{tech.avgTime} days</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${tech.efficiency >= 90 ? 'bg-green-500' : tech.efficiency >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${tech.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{tech.efficiency}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Financial Reports</h3>
          <p className="text-sm text-gray-600 mb-4">Revenue, profit margins, payment tracking</p>
          <button className="w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors">
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Operational Reports</h3>
          <p className="text-sm text-gray-600 mb-4">Job completion times, efficiency metrics</p>
          <button className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Customer Reports</h3>
          <p className="text-sm text-gray-600 mb-4">Top customers, service frequency</p>
          <button className="w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors">
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-100">
              <Settings className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Inventory Reports</h3>
          <p className="text-sm text-gray-600 mb-4">Parts usage, stock levels</p>
          <button className="w-full bg-orange-50 text-orange-700 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;