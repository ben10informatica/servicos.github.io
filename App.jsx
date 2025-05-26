import React from 'react';
import ServiceOrder from './components/ServiceOrder';
import './index.css'; // Import your global styles




export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 flex flex-col items-center justify-center py-12 px-4 font-sans">
      <div className="w-full max-w-5xl bg-white bg-opacity-90 shadow-2x1 rounded-xl p-8 border-t-4">
        <ServiceOrder />
      </div>
    </div>
  );
}
