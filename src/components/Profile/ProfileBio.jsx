import { useContext } from "react";
import Button from "@mui/material/Button";
import UserStatistics from "./UserStatistics";
import CategoryTags from "./CategoryTags";
import { AuthContext } from "../../context/auth.context";
import { UserDataContext } from "../../context/userData.context";
import { Link } from "react-router-dom";

const ProfileBio = () => {
  const { userData } = useContext(UserDataContext);
  const { user } = useContext(AuthContext);

  console.log(user);

  if (user) {
    return (
      <div className="grid grid-auto-rows bg-slate-600 px-4 h-30 py-2">
        {/* Follow, Unfollow, Edit Profile buttons */}
        <div className="text-right pt-34">
          {user.username === userData.username ? (
            <Link to={`/edit/${userData.username}`} className="m-2">
              <Button variant="contained">Edit Profile</Button>
            </Link>
          ) : user.following.includes(userData._id) ? (
            // Link needs to be added after follow/unfollow routes have been written
            <Button variant="outlined" className="m-2">
              Unfollow
            </Button>
          ) : (
            // Link needs to be added after follow/unfollow routes have been written
            <Button variant="contained" className="m-2">
              Follow
            </Button>
          )}
        </div>
        <div>
          <div className="flex">
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
