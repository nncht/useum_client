const ProfileHeader = ({ userData }) => {
  return (
    <div className="cover">
      <img src={userData.headerImageUrl} alt="Header image" />
    </div>
  );
};

export default ProfileHeader;
