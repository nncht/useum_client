const ProfilePicture = ({ currentUser }) => {
  return (
    <div>
      <img
        src={currentUser.imageUrl}
        alt="User Profile Picture"
        className="w-48 h-48 rounded-full object-cover object-center left-0 z-10"
      />
    </div>
  );
};

export default ProfilePicture;
