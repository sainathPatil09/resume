//

// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - branding and images */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-8 flex-col justify-between">
        <div>
          <Link to="/" className="flex items-center">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
              <div className="bg-white text-blue-600 font-bold text-xl px-3 py-2 rounded-md">
                CareerAI
              </div>
            </div>
          </Link>

          <div className="mt-16 max-w-md">
            <h1 className="text-3xl font-bold mb-4">
              Start your career journey with confidence
            </h1>
            <p className="text-blue-100 mb-6">
              Our AI-powered platform helps you discover the perfect career path
              based on your unique skills and interests.
            </p>

            <div className="space-y-6 mt-12">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-100"
                  >
                    <path d="M20 7h-3V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0H7V7h7v7h-3v3H4V4h10v3z" />
                  </svg>
                </div>
                <span>Personalized career recommendations</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-100"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span>AI-powered resume building</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-100"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <span>Interview preparation with AI coaching</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400/30 pt-6 mt-8">
          <p className="text-sm text-blue-200">
            "CareerAI helped me find my true calling and prepared me for job
            interviews better than any career counselor could."
          </p>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 bg-blue-400/30 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-semibold">Sarah Johnson</p>
              <p className="text-xs text-blue-200">
                Software Engineer at Google
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - auth content */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8 md:hidden">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl px-3 py-2 rounded-md">
                CareerAI
              </div>
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
