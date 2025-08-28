import React from 'react';
import { 
  Building2, 
  Settings, 
  Wrench, 
  DollarSign, 
  TrendingUp, 
  Clock,
  AlertCircle,
  CheckCircle,
  Plus
} from 'lucide-react';
import { useCompanies, useJobs, useInvoices, useWarranties } from '../hooks/useSupabase';

const Dashboard = () => {
  const { companies } = useCompanies();
  const { jobs } = useJobs();
  const { invoices } = useInvoices();
  const { warranties } = useWarranties();

  // Calculate real metrics from database
  const activeCompanies = companies.filter(c => c.status === 'active').length;
  const totalMotors = companies.reduce((sum, c) => sum + c.motor_count, 0);
  const jobsThisMonth = jobs.filter(j => {
    const jobDate = new Date(j.created_at);
    const now = new Date();
    return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear();
  }).length;
  const monthlyRevenue = invoices
    .filter(inv => {
      if (inv.status !== 'paid' || !inv.paid_date) return false;
      const paidDate = new Date(inv.paid_date);
      const now = new Date();
      return paidDate.getMonth() === now.getMonth() && paidDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, inv) => sum + inv.total_amount, 0);

  const metrics = [
    {
      title: 'Active Companies',
      value: activeCompanies.toString(),
      change: '+12%',
      trend: 'up',
      icon: Building2,
      color: 'blue'
    },
    {
      title: 'Motors in Database',
      value: totalMotors.toString(),
      change: '+8%',
      trend: 'up',
      icon: Settings,
      color: 'purple'
    },
    {
      title: 'Jobs This Month',
      value: jobsThisMonth.toString(),
      change: '+18%',
      trend: 'up',
      icon: Wrench,
      color: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: `$${monthlyRevenue.toLocaleString()}`,
      change: '+24%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald'
    }
  ];

  // Get recent jobs from database
  const recentActivity = jobs
    .slice(0, 5)
    .map(job => ({
      id: job.job_number,
      company: companies.find(c => c.id === job.company_id)?.name || 'Unknown Company',
      status: job.status,
      date: new Date(job.updated_at).toLocaleDateString(),
      description: job.description.substring(0, 50) + '...'
    }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-24 lg:pb-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome back!</h1>
            <p className="text-blue-100 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'jobs' }))}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Company</span>
            </button>
          </div>
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'companies' }))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {metric.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Jobs
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-gray-900">{activity.id}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.company}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {activity.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create New Job</span>
            </button>
            <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Add Company</span>
            </button>
            <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'motors' }))}
              <Settings className="h-5 w-5" />
              <span>Add Motor</span>
            </button>
            
            {/* Alerts Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Alerts & Reminders</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">3 jobs due this week</p>
                    <p className="text-xs text-orange-600">Review upcoming deadlines</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">2 invoices overdue</p>
                    <p className="text-xs text-red-600">Follow up on payments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">5 warranties expiring soon</p>
                    <p className="text-xs text-blue-600">Consider renewals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;