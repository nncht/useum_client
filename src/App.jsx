import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateItemPage from "./pages/CreateItemPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="p-0">
        <div id="main-content" className="px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/create-item" element={<CreateItemPage />} />

            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
