import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const ProfileHeader = () => {
  const { userData } = useContext(UserDataContext);

  console.log(userData.headerImageUrl);

  return (
    <>
      {userData && (
        <div
          style={{
            backgroundImage: `url(${userData.headerImageUrl})`,
          }}
          className="cover"
        />
      )}
    </>
  );
};

export default ProfileHeader;
