// src/pages/ResumeLanding.jsx
import React from "react";
import { Link } from "react-router-dom";

const ResumeLanding = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <header className="flex items-center justify-between mb-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Resumave</h1>
          </div>
          <nav>
            <ul className="flex gap-10">
              <li>
                <a
                  href="#features"
                  className="text-slate-700 hover:text-blue-600"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#templates"
                  className="text-slate-700 hover:text-blue-600"
                >
                  Templates
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-700 hover:text-blue-600">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-blue-600">AI-Powered</span> Resume
              <br />
              Building Made Simple
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Create professional resumes without the hassle of login or
              sign-up. Input your details, generate a well-formatted resume, and
              export it in A4 PDF format.
            </p>
            <div className="flex gap-4">
              <Link
                to="/resume/builder/*"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                Create My Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <a
                href="https://github.com/yourusername/resumave"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center"
              >
                View Source
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 ml-2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/resume-sample.png"
              alt="Resume Preview"
              className="w-full shadow-2xl rounded-lg border border-slate-200"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x800?text=Resume+Preview";
              }}
            />
          </div>
        </div>

        <div className="text-center text-slate-600 mt-10">
          <p>Trusted by students from 100+ universities</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeLanding;
