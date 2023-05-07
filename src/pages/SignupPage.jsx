// src/pages/SignupPage.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ImageUploader from "../components/ImageUploader";

const API_URL = "http://localhost:5005";

function SignupPage() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const signupBody = {
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
      imageUrl: imageUrl,
    };

    console.log("signupBody is: ", signupBody);
    axios
      .post(`${API_URL}/signup`, signupBody)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  //   SIGN UP FORM (FRONTEND)

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          id="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          id="password"
        />

        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          id="name"
        />

        <ImageUploader
          setImageUrl={setImageUrl}
          message={"Upload profile picture"}
        />

        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignupPage;
