// src/pages/LoaderPage.jsx
import React from "react";

const LoaderPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="relative">
        {/* Logo */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl px-4 py-3 rounded-md mb-8 mx-auto">
          CareerAI
        </div>

        {/* Loading animation */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-16 h-16">
            {/* Spinner */}
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

            {/* Pulsing inner circle */}
            <div className="absolute inset-3 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Loading message */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading your career journey...
          </h2>
          <p className="text-gray-500 max-w-sm">
            We're preparing personalized career insights just for you
          </p>
        </div>

        {/* Loading progress bar */}
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-6 mx-auto">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

// CSS Animation keyframes - Add this in your index.css
/*
@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}
*/

export default LoaderPage;
