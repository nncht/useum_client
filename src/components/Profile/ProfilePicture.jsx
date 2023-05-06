const ProfilePicture = ({ currentUser }) => {
  return (
    <div>
      <img
        src={currentUser.imageUrl}
        alt="User Profile Picture"
        className="w-40 h-40 rounded-full object-cover object-center left-0 z-10 border-4 border-slate-600"
      />
    </div>
  );
};

export default ProfilePicture;
