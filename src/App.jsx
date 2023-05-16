// import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserDataProvider } from "./context/userData.context";
// import { AuthContext } from "./context/auth.context";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateItemPage from "./pages/ItemPages/CreateItemPage";
import CreateFreeItemPage from "./pages/ItemPages/CreateFreeItemPage";
import ProfilePage from "./pages/ProfilePage";
import CreateCollectionPage from "./pages/CollectionPages/CreateCollectionPage";
import Collections from "./pages/CollectionPages/Collections";
import MyCollection from "./pages/CollectionPages/MyCollection";
import MyItem from "./pages/ItemPages/MyItem";
import IsPrivate from "./components/RouteProtectors/IsPrivate";
import IsPublic from "./components/RouteProtectors/IsPublic";
import EditCollection from "./pages/CollectionPages/EditCollection";
import EditItem from "./pages/ItemPages/EditItem";
import EditProfilePage from "./pages/User/EditProfilePage";
import ChangePasswordPage from "./pages/User/ChangePasswordPage";
import DeleteUserPage from "./pages/User/DeleteUserPage";
import SearchBar from "./components/DynamicSearch/SearchBar";
import BackToTop from "./components/UI/BackToTop";
import BookmarksPage from "./pages/User/BookmarksPage";
import Footer from "./components/UI/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <main className="p-0">
        <div>
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
              path="/edit/:userId"
              element={
                <IsPrivate>
                  {" "}
                  <EditProfilePage />
                </IsPrivate>
              }
            />

            <Route
              path="/add-item"
              element={
                <IsPrivate>
                  {" "}
                  <CreateItemPage />{" "}
                </IsPrivate>
              }
            />
            <Route
              path="/create-item"
              element={
                <IsPrivate>
                  {" "}
                  <CreateFreeItemPage />{" "}
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
                <UserDataProvider>
                  <ProfilePage />
                </UserDataProvider>
              }
            />

            <Route
              path="/users/:username"
              element={
                <UserDataProvider>
                  <ProfilePage />
                </UserDataProvider>
              }
            />

            <Route
              path="/bookmarks/:userId"
              element={
                <UserDataProvider>
                  <BookmarksPage />
                </UserDataProvider>
              }
            />

            <Route
              path="/delete/:userId"
              element={
                <UserDataProvider>
                  <DeleteUserPage />
                </UserDataProvider>
              }
            />

            <Route
              path="/change-password/:userId"
              element={
                <UserDataProvider>
                  <ChangePasswordPage />
                </UserDataProvider>
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
              path="/collections/:collectionId"
              element={
                <IsPrivate>
                  <MyCollection />
                </IsPrivate>
              }
            />

            <Route
              path="/items/:itemId"
              element={
                <IsPrivate>
                  <MyItem />
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

            <Route
              path="/edit-item/:itemId"
              element={
                <IsPrivate>
                  <EditItem />
                </IsPrivate>
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
