import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBio from "../components/Profile/ProfileBio";

const API_URL = "http://localhost:5005";

// DETERMINE CURRENT USER
const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${API_URL}/users/${user._id}`)
        .then((res) => {
          setCurrentUser(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  // console.log("the currentUser", currentUser);

  // USER PROFILE RENDER
  return (
    currentUser && (
      <div>
        <ProfileHeader />
        <ProfileBio currentUser={currentUser} />

        {/* To be moved to collections components */}
        <h3>My Collections:</h3>

        {!user.collections ? (
          <p>You have no collections yet!</p>
        ) : (
          user.collections.map((collection) => {
            return (
              <div key={collection._id}>
                <p>{collection.name}</p>
              </div>
            );
          })
        )}

        <h3>My interests:</h3>

        {!user.categories ? (
          <p>You have no interests yet!</p>
        ) : (
          user.categories.map((category) => {
            return (
              <div key={category._id}>
                <p>{category.name}</p>
              </div>
            );
          })
        )}
      </div>
    )
  );
};

export default ProfilePage;