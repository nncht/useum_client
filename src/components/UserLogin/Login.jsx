import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Button from "@mui/material/Button";
import FormExtra from "./FormExtra";

const API_URL = "http://localhost:5005";

export default function Login() {
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

  // Store all UI classes into a reusable class variable
  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 my-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

  return (
    <div className="my-3">
      <form onSubmit={handleLoginSubmit}>
        {/* Email input */}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className={fixedInputClass}
          placeholder="Email address"
        />

        {/* Password input */}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className={fixedInputClass}
          placeholder="Password"
        />

        {/* Remember me and forgot password component. Not functional yet. */}
        <FormExtra />

        {/* Login button */}
        <div className="mx-auto">
          <Button variant="contained" type="submit" className="my-3">
            Login
          </Button>
        </div>
      </form>

      {/* Error message */}
      <div className="my-2">
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
}
