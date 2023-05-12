import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const ProfileHeader = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="cover">
      {userData && <img src={userData.headerImageUrl} alt="Header image" />}
    </div>
  );
};

export default ProfileHeader;
