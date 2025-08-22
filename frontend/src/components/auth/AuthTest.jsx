import React, { useState } from 'react';

const AuthTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'TestPassword123'
        }),
      });
      
      const data = await response.json();
      setTestResult(`Signup Test: ${response.status} - ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setTestResult(`Signup Test Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'TestPassword123'
        }),
      });
      
      const data = await response.json();
      setTestResult(`Login Test: ${response.status} - ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setTestResult(`Login Test Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Authentication Test Page</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testSignup} disabled={loading} style={{ marginRight: '10px' }}>
          Test Signup
        </button>
        <button onClick={testLogin} disabled={loading}>
          Test Login
        </button>
      </div>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        border: '1px solid #ddd',
        whiteSpace: 'pre-wrap'
      }}>
        {loading ? 'Loading...' : testResult}
      </pre>
    </div>
  );
};

export default AuthTest;
