const ProfileHeader = ({ currentUser }) => {
  return (
    <div className="cover">
      <img src={currentUser.headerImageUrl} alt="Header image" />
    </div>
  );
};

export default ProfileHeader;
