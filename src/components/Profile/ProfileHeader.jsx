const ProfileHeader = ({ currentUser }) => {

  return (
    <div className="cover">
      <img src={currentUser.headerImageUrl} alt="User picture" />
    </div>
  );
};

export default ProfileHeader;
