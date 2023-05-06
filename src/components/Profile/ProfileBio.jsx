const ProfileBio = ({ currentUser }) => {
  return (
    <div className="bg-slate-600 px-3 py-2 h-30 min-h-200">
      <h2 className="text-3xl text-white">{currentUser.username}</h2>
      <p className="text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

export default ProfileBio;
