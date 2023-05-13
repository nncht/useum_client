import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import UserStatistics from "./UserStatistics";
import CategoryTags from "./CategoryTags";
import { AuthContext } from "../../context/auth.context";
import { UserDataContext } from "../../context/userData.context";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

const ProfileBio = () => {
  // This profile's user object
  const { userData } = useContext(UserDataContext);
  // Logged in user payload
  const { user } = useContext(AuthContext);
  // Necessary to get the logged in user's data object
  const [currentUser, setCurrentUser] = useState(null);

  // Necessary to reliably check the following status and render the corresponding buttons
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Request user object of currentUser (logged in user)
  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/users/${user.username}`)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, refresh]);

  // Check if the user is already being followed
  useEffect(() => {
    if (currentUser && currentUser.following.includes(userData._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [currentUser, userData]);

  // Follow user action
  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/${currentUser._id}/follow/${userData._id}`
      );
      setIsFollowing(true);
      setFollowingList([...followingList, userData._id]);
      console.log(response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  // Unfollow user action
  const handleUnfollow = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/${currentUser._id}/unfollow/${userData._id}`
      );
      setIsFollowing(false);
      setFollowingList(followingList.filter((id) => id !== userData._id));
      console.log(response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  if (currentUser) {
    return (
      <div className="grid grid-auto-rows bg-slate-600 px-4 h-30 py-2">
        {/* Follow, Unfollow, Edit Profile buttons */}
        <div className="text-right my-3">
          {currentUser.username === userData.username ? (
            <Link to={`/edit/${userData.username}`}>
              <Button variant="contained">Edit Profile</Button>
            </Link>
          ) : (
            <div>
              {isFollowing ? (
                <Button
                  key={Date.now()} // This magically forces the component to refresh
                  variant="contained"
                  className="unfollow-btn"
                  onMouseOver={() => {
                    document.querySelector(".unfollow-btn").textContent =
                      "Unfollow";
                  }}
                  onMouseOut={() => {
                    document.querySelector(".unfollow-btn").textContent =
                      "Following";
                  }}
                  onClick={handleUnfollow}
                >
                  Following
                </Button>
              ) : (
                <Button
                  key={Date.now()} // This magically forces the component to refresh
                  variant="contained"
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex mt-2">
            {/* Username */}
            <h2 className="mr-4 self-end text-3xl text-white m-0">
              {userData.username}
            </h2>

            {/* Pronouns */}
            <i className="text-md text-white self-end p-1 ml-2">
              {!userData.pronouns || userData.pronouns === "" ? (
                ""
              ) : (
                <div>({userData.pronouns})</div>
              )}
            </i>
          </div>

          {/* Statistics (Followers, Collections, Items) */}
          <div className="my-2">{userData && <UserStatistics />}</div>

          {/* UserBio */}
          <p className="text-white text-lg">{userData.userbio}</p>

          {/* Display user's category/interests tags */}
          <div className="flex">
            <div className="mr-3">{userData && <CategoryTags />}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileBio;
