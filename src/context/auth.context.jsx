import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../services/apiConfig";




const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const navigate = useNavigate();

  const verifyUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        axios
          .get(`${API_URL}/verify`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((res) => {
            const authenticatedUser = res.data;
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(authenticatedUser);
          })
          .catch((err) => {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
          });
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = async () => {
    removeToken();
    // and update the state variables
    await verifyUser();
    navigate("/");
  };

  useEffect(() => {
    //  <==  ADD
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        verifyUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
