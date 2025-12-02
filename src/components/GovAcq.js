import React, { useState } from 'react';
import { Search, Plus, FileText, DollarSign, User, CheckCircle, Clock, AlertCircle, Download, Filter } from 'lucide-react';

export default function GovAcquisitionApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contracts, setContracts] = useState([
    {
      id: 'CNT-2024-001',
      title: 'IT Infrastructure Modernization',
      vendor: 'TechCorp Solutions',
      amount: 2500000,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      category: 'IT Services',
      progress: 45
    },
    {
      id: 'CNT-2024-002',
      title: 'Facility Maintenance Services',
      vendor: 'BuildRight Inc',
      amount: 850000,
      status: 'pending',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      category: 'Facilities',
      progress: 0
    },
    {
      id: 'CNT-2023-045',
      title: 'Consulting Services - HR',
      vendor: 'People Partners LLC',
      amount: 450000,
      status: 'completed',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      category: 'Professional Services',
      progress: 100
    },
    {
      id: 'CNT-2024-003',
      title: 'Office Supplies Procurement',
      vendor: 'Office Depot Federal',
      amount: 125000,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      category: 'Supplies',
      progress: 60
    }
  ]);

  const [vendors, setVendors] = useState([
    {
      id: 'VND-001',
      name: 'TechCorp Solutions',
      type: 'Large Business',
      certifications: ['8(a)', 'ISO 9001'],
      activeContracts: 3,
      rating: 4.5
    },
    {
      id: 'VND-002',
      name: 'BuildRight Inc',
      type: 'Small Business',
      certifications: ['SBA Certified', 'WOSB'],
      activeContracts: 2,
      rating: 4.2
    },
    {
      id: 'VND-003',
      name: 'People Partners LLC',
      type: 'Small Business',
      certifications: ['HUBZone', 'SDVOSB'],
      activeContracts: 1,
      rating: 4.8
    }
  ]);

  const [showNewContractModal, setShowNewContractModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalContractValue = contracts.reduce((sum, c) => sum + c.amount, 0);
  const activeContracts = contracts.filter(c => c.status === 'active').length;

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contracts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{contracts.length}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Contracts</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{activeContracts}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(totalContractValue)}</p>
            </div>
            <DollarSign className="w-10 h-10 text-emerald-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vendors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{vendors.length}</p>
            </div>
            <User className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Contracts</h3>
        <div className="space-y-3">
          {contracts.slice(0, 3).map(contract => (
            <div key={contract.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{contract.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(contract.status)}`}>
                    {getStatusIcon(contract.status)}
                    {contract.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{contract.vendor}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(contract.amount)}</p>
                <p className="text-sm text-gray-600">{contract.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContractsView = () => (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button 
          onClick={() => setShowNewContractModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Contract
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.filter(c => 
              c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.id.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(contract => (
              <tr key={contract.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contract.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(contract.amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(contract.status)}`}>
                    {getStatusIcon(contract.status)}
                    {contract.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${contract.progress}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{contract.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const VendorsView = () => (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search vendors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Vendor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                <p className="text-sm text-gray-600">{vendor.id}</p>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {vendor.type}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Certifications</p>
                <div className="flex flex-wrap gap-1">
                  {vendor.certifications.map(cert => (
                    <span key={cert} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600">Active Contracts</p>
                  <p className="text-lg font-semibold text-gray-900">{vendor.activeContracts}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Rating</p>
                  <p className="text-lg font-semibold text-gray-900">{vendor.rating} ⭐</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Demo</h1>
                <p className="text-blue-200 text-sm">Acquisition Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export
              </button>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'contracts' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Contracts
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'vendors' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Vendors
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'contracts' && <ContractsView />}
        {activeTab === 'vendors' && <VendorsView />}
      </main>

      {/* New Contract Modal */}
      {showNewContractModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">New Contract</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Select vendor...</option>
                    {vendors.map(v => <option key={v.id}>{v.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button 
                  onClick={() => setShowNewContractModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowNewContractModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Mia Dao — Built with React & Tailwind CSS for demo purposes.
        </div>
      </footer>
    </div>
  );
};