// src/pages/SignInPage.jsx
import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto w-full max-w-md p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl px-3 py-2 rounded-md">
            CareerAI
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-600">
            Sign in to continue your career journey
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <SignIn
            path="/signin"
            routing="path"
            signUpUrl="/signup"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "border border-gray-200 text-gray-600",
                socialButtonsBlockButtonText: "font-normal",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-400 text-xs",
                formFieldLabel: "text-gray-700",
                formFieldInput:
                  "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                footerActionLink: "text-blue-600 hover:text-blue-700",
              },
            }}
          />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
