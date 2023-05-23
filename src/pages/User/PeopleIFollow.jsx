import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import axios from "axios";
import API_URL from "../../services/apiConfig";
import { Grid } from "@mui/material";
import SectionHeader from "../../components/UI/SectionHeader";
import UserCard from "../../components/Profile/UserCard.jsx";

const Followers = () => {
  const { user } = useContext(AuthContext);

  //"otherUser" is the user whose profile we are viewing
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/users/${user.username}/follow`)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  if (currentUser) {
    return (
      <div id="main-content" className="justify-center">
        <div id="main-section" className="my-4 shadow-md">
          <section className="px-4 pt-3 pb-20 bg-slate-100 rounded-lg">
            <SectionHeader title="Following" />

            <Grid container spacing={3}>
              {currentUser.following.length === 0 ? (
                <p>Looks like you're not following anyone yet</p>
              ) : (
                currentUser.following.map((followed) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={followed._id}>
                      <UserCard key={followed._id} user={followed} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          </section>
        </div>
      </div>
    );
  }
};

export default Followers;
