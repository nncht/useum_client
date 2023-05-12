import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const UserStatistics = () => {
  const { userData } = useContext(UserDataContext);
  console.log(userData);

  return (
    <div className="text-white flex">
      {userData && (
        <>
          <div className="mr-4">
            {/* <span className="font-bold">{userData.followers.length}</span>{" "} */}
            Followers
          </div>
          <div className="mr-4">
            {/* <span className="font-bold">{userData.collections.length}</span>{" "} */}
            Collections
          </div>
          <div>
            {/* This doesn't work yet and the code might need to be altered, but I'll wait until Lukas is done updating the models. */}
            {/* <span className="font-bold">{userData.items.length}</span> Items */}
          </div>
        </>
      )}
    </div>
  );
};

export default UserStatistics;
