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
import CreateCollectionPage from "./pages/CollectionPages/CreateCollectionPage";
import Collections from "./pages/CollectionPages/Collections";
import MyCollection from "./pages/CollectionPages/MyCollection";

function App() {



  return (
    <div className="App">
      <main>
        <section className="bg-gray-50 min-h-screen p-0">
          <NavBar />
          <div id="main-content" className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/create-item" element={<CreateItemPage/>} />






              <Route path="/create-collection" element={<CreateCollectionPage/>} />







              <Route path="/profile" element={<ProfilePage />} />





              <Route path="/collections" element={<Collections/>} />



              <Route path="/my-collections/:collectionId" element={<MyCollection/>} />



            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
