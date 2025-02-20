//

// src/layouts/ProtectedRoutes.jsx
import LoaderPage from "@/pages/LoaderPage";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  // Add a small delay to show the loader
  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoaded]);

  if (!isLoaded && showLoader) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to={"/signin"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
