import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBio from "../components/Profile/ProfileBio";
import ProfilePicture from "../components/Profile/ProfilePicture";

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

  console.log("the currentUser", currentUser);

  // USER PROFILE RENDER
  return (
    currentUser && (
      <div>
        {/* Header and profile picture */}
        <div className="relative">
          <ProfileHeader />
          <div className="absolute mt-[-80px] mx-4">
            <ProfilePicture currentUser={currentUser} />
          </div>
        </div>

        {/* User bio */}
        <div>
          <ProfileBio currentUser={currentUser} />
        </div>

        {/* TO BE MOVED TO OWN COMPONENTS */}
        <section className="p-3 bg-slate-300">
          {/* Temporary navigation for collections/items development. WILL BE REMOVED AFTER DEV */}
          <nav className="mb-4">
            <Link to="/collections" className="m-2">
              <Button variant="contained">Collections (redundant)</Button>
            </Link>
            <Link to="/create-item" className="m-2">
              <Button variant="contained">Add new item</Button>
            </Link>
            <p className="text-danger m-2">
              Temporary buttons, will be removed later
            </p>
          </nav>

          {/* Available collections of this user will be rendered as cards here */}

          <h4 className="text-2xl text-slate-600">Collections</h4>

          {!currentUser.collections ? (
            <p>No collections available</p>
          ) : (
            currentUser.collections.map((collection) => {
              return (
                <div key={collection._id}>
                  <Link to={`/my-collections/${collection._id}`}>
                    <p>{collection.name}</p>
                  </Link>
                </div>
              );
            })
          )}
          <Link to="/create-collection" className="m-2">
            <Button variant="contained">Add new collection</Button>
          </Link>
          {/* Uncommented this for now, because categories should be shown as labels/tags within the user bio */}

          {/* <h4 className="text-2xl text-slate-600">Interests</h4>

          {!currentUser.categories ? (
            <p>You've not specified any interests yet.</p>
          ) : (
            currentUser.categories.map((category) => {
              return (
                <div key={category._id}>
                  <p>{category.name}</p>
                </div>
              );
            })
          )} */}
        </section>
      </div>
    )
  );
};

export default ProfilePage;
