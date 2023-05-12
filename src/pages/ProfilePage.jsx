import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBio from "../components/Profile/ProfileBio";
import ProfilePicture from "../components/Profile/ProfilePicture";
import CollectionCard from "../components/Collections/CollectionCard";

const API_URL = "http://localhost:5005";

// DETERMINE CURRENT USER
const ProfilePage = ({ currentUser }) => {
  const { username } = useParams(); // get the user ID from the URL parameter
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/users/${username}`);
      setUserData(response.data);
    };

    if (username) {
      fetchData();
    } else {
      setUserData(currentUser);
    }
  }, [username, currentUser]);

  // USER PROFILE RENDER

  return (
    <div id="main-content">
      {/* Header and profile picture block */}
      <div className="relative">
        <ProfileHeader currentUser={userData} />
        <div className="absolute mt-[-80px] mx-4">
          <ProfilePicture currentUser={userData} />
        </div>
      </div>

      {/* User bio, needs to be added to User model */}
      <div>
        <ProfileBio currentUser={userData} />
      </div>

      <section className="px-4 pt-3 pb-20 bg-slate-300">
        <h4 className="text-2xl text-slate-600">Collections</h4>
        <Grid container spacing={3}>
          {/* Available collections of this user will be rendered as cards here */}
          {userData.collections.length < 1 ? (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <p>No collections available</p>
            </Grid>
          ) : (
            userData.collections.map((collection) => {
              return (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                    <CollectionCard
                      key={collection._id}
                      collection={collection}
                    />
                  </Grid>
                </>
              );
            })
          )}
        </Grid>

        {/* Add new collection button */}

        <nav className="my-4">
          <Link to="/create-collection" className="m-2">
            <Button variant="contained">New collection</Button>
          </Link>
        </nav>
      </section>
    </div>
  );
};

export default ProfilePage;
