import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";
import { Link } from "react-router-dom";

const UserStatistics = () => {
  const { userData } = useContext(UserDataContext);


  // Don't ask me why that line below makes it work magically...

  if(userData.followers || userData.following || userData.collections || userData.items) {
    return (
    <div className="text-white flex">

        <>
          <div className="mr-4">
            <span className="font-bold">{userData.followers.length}</span>{" "}
            <Link to={"/followers"}>Followers</Link>
          </div>
          {/* <div className="mr-4">
            <span className="font-bold">{userData.following.length}</span>{" "}
            <Link to={"/following"}>Following</Link>
          </div> */}
          <div className="mr-4">
            <span className="font-bold">{userData.collections.length}</span>{" "}
            Collections
          </div>
          <div>
            {/* This doesn't work yet and the code might need to be altered, but I'll wait until Lukas is done updating the models. */}
            <span className="font-bold">{userData.items.length}</span> Items
          </div>
        </>

    </div>
  );}
};

export default UserStatistics;
