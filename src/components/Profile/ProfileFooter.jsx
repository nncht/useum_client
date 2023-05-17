import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const ProfileFooter = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="footer">
      {userData && <img src={userData.headerImageUrl} alt="Header image" />}
    </div>
  );
};

export default ProfileFooter;
