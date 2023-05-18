import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const ProfilePicture = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div>
      {userData && (
        <img
          src={userData.imageUrl}
          alt="User Profile Picture"
          className="w-40 h-40 rounded-full object-cover object-center left-0 z-5 border-4 border-slate-600"
          style={{ backgroundColor: "rgb(148, 163, 184)" }}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
