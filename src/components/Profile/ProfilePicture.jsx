const ProfilePicture = ({ currentUser }) => {
  return (
    <div>
      <img
        src={currentUser.imageUrl}
        width={100}
        height={150}
        alt="A picture of you!"
      />
    </div>
  );
};

export default ProfilePicture;
