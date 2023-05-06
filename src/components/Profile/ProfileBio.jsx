const ProfileBio = ({ currentUser }) => {
  return (
    <div className="bg-slate-600 px-4 h-30 min-h-200 py-4">
      <h2 className="text-3xl text-white pt-20">{currentUser.username}</h2>
      <p className="text-white text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

export default ProfileBio;
