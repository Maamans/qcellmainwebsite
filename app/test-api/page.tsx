'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function TestAPI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getHomepage()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API data...</p>
          <p className="text-sm text-gray-500 mt-2">
            API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}
          </p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4">
          <div className="text-red-600 mb-4">
            <h2 className="text-2xl font-bold mb-2">API Connection Error</h2>
            <p className="text-sm">{error}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded mt-4">
            <p className="text-sm text-gray-700 mb-2"><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}</p>
            <p className="text-sm text-gray-600">
              Make sure your backend server is running and accessible at the URL above.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">API Test - Homepage Data</h1>
          <p className="text-sm text-gray-600 mb-4">
            API URL: <code className="bg-gray-100 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}</code>
          </p>
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
            <p className="text-green-800 font-semibold">✓ API Connection Successful!</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Response Data:</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

