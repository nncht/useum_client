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
    // <div className="footer">
    //   {userData && <img src={userData.headerImageUrl} alt="Header image" />}
    // </div>
  );
};

export default ProfileFooter;
