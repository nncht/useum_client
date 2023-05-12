import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserDataContext } from "../context/userData.context";
import axios from "axios";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBio from "../components/Profile/ProfileBio";
import ProfilePicture from "../components/Profile/ProfilePicture";
import CollectionCard from "../components/Collections/CollectionCard";

const API_URL = "http://localhost:5005";

const ProfilePage = () => {
  const { username } = useParams();
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/users/${username}`);
      setUserData(response.data);
    };

    fetchData();
  }, [username, setUserData]);

  return (
    <div id="main-content">
      <div className="relative">
        <ProfileHeader userData={userData} />
        <div className="absolute mt-[-80px] mx-4">
          <ProfilePicture userData={userData} />
        </div>
      </div>

      {/* <div>
        <ProfileBio userData={userData} />
      </div> */}

      <section className="px-4 pt-3 pb-20 bg-slate-300">
        <h4 className="text-2xl text-slate-600">Collections</h4>
        <Grid container spacing={3}>
          {userData.collections && userData.collections ? (
            userData.collections.map((collection) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                <CollectionCard key={collection._id} collection={collection} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <p>No collections available</p>
            </Grid>
          )}
        </Grid>

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
