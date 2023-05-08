// import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
// import { AuthContext } from "./context/auth.context";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateItemPage from "./pages/CreateItemPage";
import ProfilePage from "./pages/ProfilePage";
import CreateCollectionPage from "./pages/CollectionPages/CreateCollectionPage";
import Collections from "./pages/CollectionPages/Collections";
import MyCollection from "./pages/CollectionPages/MyCollection";
import IsPrivate from "./components/RouteProtectors/IsPrivate";
import IsPublic from "./components/RouteProtectors/IsPublic";
import EditCollection from "./pages/CollectionPages/EditCollection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="p-0">
        <div className="px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <IsPublic>
                  {" "}
                  <LoginPage />{" "}
                </IsPublic>
              }
            />
            <Route
              path="/signup"
              element={
                <IsPublic>
                  {" "}
                  <SignupPage />
                </IsPublic>
              }
            />
            <Route
              path="/create-item"
              element={
                <IsPrivate>
                  {" "}
                  <CreateItemPage />{" "}
                </IsPrivate>
              }
            />
            <Route
              path="/create-collection"
              element={
                <IsPrivate>
                  <CreateCollectionPage />
                </IsPrivate>
              }
            />
            <Route
              path="/profile"
              element={
                <IsPrivate>
                  {" "}
                  <ProfilePage />{" "}
                </IsPrivate>
              }
            />
            <Route
              path="/collections"
              element={
                <IsPrivate>
                  <Collections />
                </IsPrivate>
              }
            />
            <Route
              path="/my-collections/:collectionId"
              element={
                <IsPrivate>
                  <MyCollection />
                </IsPrivate>
              }
            />
            <Route
              path="/edit-collection/:collectionId"
              element={
                <IsPrivate>
                  <EditCollection />
                </IsPrivate>
              }
            />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
