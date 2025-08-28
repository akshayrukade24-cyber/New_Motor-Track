import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DatabaseStatusProps {
  onClose: () => void;
}

const DatabaseStatus: React.FC<DatabaseStatusProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error' | 'setup-needed'>('checking');
  const [error, setError] = useState<string | null>(null);
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      setStatus('checking');
      setError(null);

      // Test basic connection
      const { data: connectionTest, error: connectionError } = await supabase
        .from('companies')
        .select('count')
        .limit(1);

      if (connectionError) {
        if (connectionError.message.includes('relation') && connectionError.message.includes('does not exist')) {
          setStatus('setup-needed');
          setError('Database tables not found. Please run the SQL schema in Supabase SQL Editor.');
        } else {
          setStatus('error');
          setError(connectionError.message);
        }
        return;
      }

      // Check all required tables
      const requiredTables = ['companies', 'motors', 'jobs', 'invoices', 'warranties', 'users'];
      const existingTables: string[] = [];

      for (const table of requiredTables) {
        try {
          await supabase.from(table).select('count').limit(1);
          existingTables.push(table);
        } catch (err) {
          console.warn(`Table ${table} not accessible:`, err);
        }
      }

      setTables(existingTables);
      
      if (existingTables.length === requiredTables.length) {
        setStatus('connected');
      } else {
        setStatus('setup-needed');
        setError(`Missing tables: ${requiredTables.filter(t => !existingTables.includes(t)).join(', ')}`);
      }

    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-6 w-6 animate-spin text-blue-600" />;
      case 'connected':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-600" />;
      case 'setup-needed':
        return <AlertTriangle className="h-6 w-6 text-orange-600" />;
      default:
        return <Database className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'checking':
        return 'Checking database connection...';
      case 'connected':
        return 'Database connected successfully!';
      case 'error':
        return 'Database connection failed';
      case 'setup-needed':
        return 'Database setup required';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Database Status</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            {getStatusIcon()}
            <span className="font-medium text-gray-900">{getStatusMessage()}</span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {status === 'setup-needed' && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-orange-800 mb-2">Setup Instructions:</h3>
              <ol className="text-orange-700 text-sm space-y-1 list-decimal list-inside">
                <li>Go to your Supabase project dashboard</li>
                <li>Navigate to the SQL Editor</li>
                <li>Run the complete SQL schema you provided</li>
                <li>Refresh this page to check the connection</li>
              </ol>
            </div>
          )}

          {tables.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Available Tables:</h3>
              <div className="grid grid-cols-2 gap-2">
                {tables.map(table => (
                  <div key={table} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">{table}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={checkDatabaseStatus}
              disabled={status === 'checking'}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {status === 'checking' && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Recheck Connection</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatus;