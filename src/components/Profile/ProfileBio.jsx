import React from "react";

const ProfileBio = ({ currentUser }) => {
  //   const { username, imageUrl } = currentUser;

  console.log({ currentUser });
  return (
    <div>
      <h1>{currentUser.username}'s Profil</h1>
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
