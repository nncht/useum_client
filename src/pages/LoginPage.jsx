// IMPORTS
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Header from "../components/UserLogin/Header";
import Login from "../components/UserLogin/Login";

// MUI Imports
import Button from "@mui/material/Button";

// USER AUTH
const API_URL = "http://localhost:5005";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, verifyUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const loginBody = { email, password };

    axios
      .post(`${API_URL}/login`, loginBody)
      .then((res) => {
        console.log("JWT token", res.data.authToken);

        storeToken(res.data.authToken);

        verifyUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  // LOGIN PAGE RENDER (FRONTEND)
  return (
    <div className="p-4">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />

      <form onSubmit={handleLoginSubmit}>
        {/* <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        /> */}

        {/* <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        /> */}

        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
