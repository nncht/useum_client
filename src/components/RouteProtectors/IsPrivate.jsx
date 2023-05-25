// src/components/IsPrivate.js

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { MoonLoader } from "react-spinners";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading)
    return (
      <section id="main-content">
        <div id="main-section" className="p-4 my-4 flex justify-center w-100">
          <MoonLoader color="#1976D2" size={30} />
        </div>
      </section>
    );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default IsPrivate;
