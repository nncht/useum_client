import React from "react";

const ProfileBio = ({ currentUser }) => {
  return (
    <div>
      <div className="bg-slate-600 px-3 py-2 h-30">
        <h2 className="text-3xl text-white">{currentUser.username}</h2>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default ProfileBio;
