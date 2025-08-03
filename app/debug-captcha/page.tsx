"use client";

import React, { useEffect, useState } from 'react';

export default function DebugCaptcha() {
  const [siteKey, setSiteKey] = useState<string>('');
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [grecaptchaExists, setGrecaptchaExists] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check environment variable
    const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    setSiteKey(key || 'NOT_SET');

    // Load reCAPTCHA script
    if (key && typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${key}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('✅ Script loaded');
        setScriptLoaded(true);
        
        // Check if grecaptcha exists after a short delay
        setTimeout(() => {
          if (window.grecaptcha) {
            setGrecaptchaExists(true);
            console.log('✅ grecaptcha object available');
          }
        }, 500);
      };
      
      script.onerror = (err) => {
        console.error('❌ Script load error:', err);
        setError('Failed to load reCAPTCHA script');
      };
      
      document.head.appendChild(script);
    }
  }, []);

  const testRecaptcha = async () => {
    if (!window.grecaptcha) {
      setError('grecaptcha not loaded');
      return;
    }

    try {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { 
          action: 'appointment_booking' 
        })
        .then((token: string) => {
          console.log('✅ Token generated:', token);
          setToken(token);
          setError('');
        })
        .catch((err: any) => {
          console.error('❌ Token generation failed:', err);
          setError(`Token generation failed: ${err.message || err}`);
        });
      });
    } catch (err: any) {
      setError(`Execution error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">reCAPTCHA V3 Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
            <div className="space-y-2">
              <p><strong>Site Key:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{siteKey}</code></p>
              <p><strong>Script Loaded:</strong> <span className={scriptLoaded ? 'text-green-600' : 'text-red-600'}>{scriptLoaded ? '✅ Yes' : '❌ No'}</span></p>
              <p><strong>grecaptcha Exists:</strong> <span className={grecaptchaExists ? 'text-green-600' : 'text-red-600'}>{grecaptchaExists ? '✅ Yes' : '❌ No'}</span></p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Token Test</h2>
            <button 
              onClick={testRecaptcha}
              disabled={!grecaptchaExists}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Generate Token
            </button>
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {token && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <strong>Token Generated:</strong>
                <br />
                <code className="text-xs break-all">{token}</code>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Console Log</h2>
            <p className="text-sm text-gray-600">Check browser console (F12) for detailed logs</p>
          </div>
        </div>
      </div>
    </div>
  );
}