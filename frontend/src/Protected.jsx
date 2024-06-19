import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("username");

      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);

          if (parsedUserData.success === true) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            navigate("/signin");
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsAuthenticated(false);
          navigate("/signin");
        }
      } else {
        setIsAuthenticated(false);
        navigate("/signin");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
