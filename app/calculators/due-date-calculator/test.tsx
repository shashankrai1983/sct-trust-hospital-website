'use client';

// Simple Test Component to Debug the Issue
import React from 'react';

export default function TestDueDateCalculator() {
  return (
    <div className="min-h-screen bg-accent-cream py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-green mb-8">
          Test Due Date Calculator
        </h1>
        
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Simple Calculator Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Menstrual Period Date
              </label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            
            <button className="bg-primary-green text-white px-6 py-3 rounded-lg">
              Calculate Due Date
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <p>If you can see this, the basic component is working!</p>
          </div>
        </div>
      </div>
    </div>
  );
}