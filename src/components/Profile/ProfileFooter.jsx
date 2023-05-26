import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const ProfileFooter = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      {userData && (
        <div
          style={{
            backgroundImage: `url(${userData.headerImageUrl})`,
          }}
          className="footer"
        />
      )}
    </>
  );
};

export default ProfileFooter;
