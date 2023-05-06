import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateItemPage from "./pages/CreateItemPage"
import ProfilePage from "./pages/ProfilePage";
import IsPrivate from "./components/IsPrivate";
import IsPublic from "./components/IsPublic";

function App() {



  return (
    <div className="App">
      <main>
        <section className="bg-gray-50 min-h-screen p-0">
          <NavBar />
          <div id="main-content" className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<IsPublic> <LoginPage /> </IsPublic>} />
              <Route path="/signup" element={<IsPublic> <SignupPage /></IsPublic> } />
              <Route path="/create-item" element={<IsPrivate> <CreateItemPage/> </IsPrivate>} />



              <Route path="/profile" element={<IsPrivate> <ProfilePage /> </IsPrivate>} />




            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
