import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const UserStatistics = () => {
  const { userData } = useContext(UserDataContext);

  // Don't ask me why that line below makes it work magically...

  if(userData.followers || userData.collections || userData.items) {
    return (
    <div className="text-white flex">

        <>
          <div className="mr-4">
            <span className="font-bold">{userData.followers.length}</span>{" "}
            Followers
          </div>
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
