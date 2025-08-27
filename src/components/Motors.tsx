import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Building2,
  Zap,
  Gauge,
  Info,
  Edit,
  Wrench,
  Eye
} from 'lucide-react';

interface Motor {
  id: string;
  companyId: string;
  companyName: string;
  motorId: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  type: 'AC' | 'DC' | 'Servo' | 'Generator' | 'Turbine';
  voltage: string;
  amperage: string;
  power: string;
  rpm: string;
  phase: 'single' | 'three';
  frequency: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  location: string;
  lastService: string;
  createdAt: string;
}

const Motors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const motors: Motor[] = [
    {
      id: 'M001',
      companyId: 'C001',
      companyName: 'Manufacturing Solutions Ltd',
      motorId: 'MT-2024-001',
      manufacturer: 'Siemens',
      model: '1LA7 130-4AA60',
      serialNumber: 'SN2024001',
      type: 'AC',
      voltage: '460V',
      amperage: '14.2A',
      power: '7.5 HP',
      rpm: '1750',
      phase: 'three',
      frequency: '60Hz',
      condition: 'good',
      location: 'Production Line A',
      lastService: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: 'M002',
      companyId: 'C002',
      companyName: 'Industrial Power Corp',
      motorId: 'DC-2024-002',
      manufacturer: 'Baldor',
      model: 'CDP3455',
      serialNumber: 'BL2024002',
      type: 'DC',
      voltage: '240V',
      amperage: '18.5A',
      power: '5 HP',
      rpm: '1800',
      phase: 'single',
      frequency: 'DC',
      condition: 'fair',
      location: 'Conveyor System',
      lastService: '2023-11-20',
      createdAt: '2023-11-15'
    },
    {
      id: 'M003',
      companyId: 'C001',
      companyName: 'Manufacturing Solutions Ltd',
      motorId: 'SV-2024-003',
      manufacturer: 'Allen-Bradley',
      model: 'MPL-B330P-SJ24AA',
      serialNumber: 'AB2024003',
      type: 'Servo',
      voltage: '460V',
      amperage: '8.1A',
      power: '3 HP',
      rpm: '3000',
      phase: 'three',
      frequency: '60Hz',
      condition: 'excellent',
      location: 'CNC Machine 3',
      lastService: '2024-02-01',
      createdAt: '2024-01-25'
    },
    {
      id: 'M004',
      companyId: 'C003',
      companyName: 'Metro Manufacturing',
      motorId: 'GN-2024-004',
      manufacturer: 'Caterpillar',
      model: 'C15 ACERT',
      serialNumber: 'CAT2024004',
      type: 'Generator',
      voltage: '480V',
      amperage: '156A',
      power: '125 kW',
      rpm: '1800',
      phase: 'three',
      frequency: '60Hz',
      condition: 'good',
      location: 'Emergency Power Room',
      lastService: '2024-01-30',
      createdAt: '2024-01-20'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'AC':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DC':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Servo':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Generator':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Turbine':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMotors = motors.filter(motor => {
    const matchesSearch = motor.motorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || motor.type === typeFilter;
    const matchesCompany = companyFilter === 'all' || motor.companyId === companyFilter;
    
    return matchesSearch && matchesType && matchesCompany;
  });

  const companies = Array.from(new Set(motors.map(m => ({ id: m.companyId, name: m.companyName }))))
    .filter((company, index, arr) => arr.findIndex(c => c.id === company.id) === index);

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-24 lg:pb-6">
      {/* Header Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Motor Portfolio</h1>
            <p className="text-gray-600 mt-1">Complete database of all motors with detailed specifications</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Motor</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by motor ID, manufacturer, model, or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="AC">AC Motor</option>
              <option value="DC">DC Motor</option>
              <option value="Servo">Servo Motor</option>
              <option value="Generator">Generator</option>
              <option value="Turbine">Turbine</option>
            </select>
            
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Companies</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Motors Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredMotors.map((motor) => (
          <div key={motor.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Settings className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{motor.motorId}</h3>
                    <p className="text-sm text-gray-600">{motor.companyName}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(motor.type)}`}>
                  {motor.type} Motor
                </span>
              </div>

              {/* Motor Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Manufacturer:</span>
                  <span className="font-medium text-gray-900">{motor.manufacturer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Model:</span>
                  <span className="font-medium text-gray-900">{motor.model}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Serial Number:</span>
                  <span className="font-mono text-sm text-gray-900">{motor.serialNumber}</span>
                </div>
              </div>

              {/* Key Specifications */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-600">Voltage</p>
                  <p className="font-medium text-gray-900">{motor.voltage}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Settings className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Power</p>
                  <p className="font-medium text-gray-900">{motor.power}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Gauge className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">RPM</p>
                  <p className="font-medium text-gray-900">{motor.rpm}</p>
                </div>
              </div>

              {/* Condition and Location */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Condition:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(motor.condition)}`}>
                    {motor.condition}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Last Service</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(motor.lastService).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Info className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{motor.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Full Specs</span>
                </button>
                <button className="px-3 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-1">
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">Create Job</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Motor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Motor</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex space-x-4 mt-6">
                {['Basic Information', 'Electrical Specs', 'Mechanical Specs', 'Condition & Location'].map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === index
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                {/* Tab 1: Basic Information */}
                {activeTab === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Company</option>
                          {companies.map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motor ID *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Customer's motor identification"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Manufacturer
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Siemens, Baldor, ABB"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Model
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Model number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Serial Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Serial number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Type</option>
                          <option value="AC">AC Motor</option>
                          <option value="DC">DC Motor</option>
                          <option value="Servo">Servo Motor</option>
                          <option value="Generator">Generator</option>
                          <option value="Turbine">Turbine</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Electrical Specifications */}
                {activeTab === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Voltage *
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            required
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="460"
                          />
                          <span className="px-3 py-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600">V</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amperage
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            step="0.1"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="14.2"
                          />
                          <span className="px-3 py-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600">A</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Power
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            step="0.1"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="7.5"
                          />
                          <select className="px-3 py-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600">
                            <option value="HP">HP</option>
                            <option value="kW">kW</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phase *
                        </label>
                        <div className="flex space-x-4 pt-3">
                          <label className="flex items-center">
                            <input type="radio" name="phase" value="single" className="mr-2" />
                            Single Phase
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="phase" value="three" className="mr-2" />
                            Three Phase
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frequency
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            defaultValue={60}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <span className="px-3 py-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600">Hz</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Connection Type
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Connection</option>
                          <option value="star">Star (Y)</option>
                          <option value="delta">Delta (Δ)</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Mechanical Specifications */}
                {activeTab === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          RPM
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1750"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frame Size
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 213T, 215T"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mounting Type
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Mounting</option>
                          <option value="foot">Foot Mount</option>
                          <option value="flange">Flange Mount</option>
                          <option value="face">Face Mount</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Insulation Class
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Class</option>
                          <option value="A">Class A</option>
                          <option value="B">Class B</option>
                          <option value="F">Class F</option>
                          <option value="H">Class H</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duty Cycle
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., S1, S2, S3"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Environment
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Environment</option>
                          <option value="indoor">Indoor</option>
                          <option value="outdoor">Outdoor</option>
                          <option value="hazardous">Hazardous</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Condition & Location */}
                {activeTab === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Condition *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Condition</option>
                          <option value="excellent">Excellent - Like new, no issues</option>
                          <option value="good">Good - Minor wear, fully functional</option>
                          <option value="fair">Fair - Some wear, may need minor repairs</option>
                          <option value="poor">Poor - Significant wear, needs major repairs</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Installation Location
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Production Line A, Building 2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Technical Notes
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Additional technical notes, special requirements, maintenance history, etc."
                      />
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-between pt-6 border-t border-gray-200">
                  <div className="flex space-x-2 mb-4 sm:mb-0">
                    {activeTab > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(activeTab - 1)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    {activeTab < 3 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(activeTab + 1)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    {activeTab === 3 && (
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Save Motor
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMotors.length === 0 && (
        <div className="text-center py-12">
          <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No motors found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || typeFilter !== 'all' || companyFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first motor to the database.'}
          </p>
          {(!searchTerm && typeFilter === 'all' && companyFilter === 'all') && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Motor</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Motors;