import React from "react";

const ProfileBio = ({ currentUser }) => {
  //   const { username, imageUrl } = currentUser;

  console.log({ currentUser });
  return (
    <div>
      <div className="bg-slate-600 px-3 py-2">
        <h2 className="text-3xl text-white">{currentUser.username}</h2>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <img
        src={currentUser.imageUrl}
        width={100}
        height={150}
        alt="A picture of you!"
      />

      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default ProfileBio;
