import React from "react";

const UserStatistics = ({ currentUser }) => {
  return (
    <div className="text-white flex">
      <div className="mr-4">
        <span className="font-bold">{currentUser.followers.length}</span>{" "}
        Followers
      </div>
      <div className="mr-4">
        <span className="font-bold">{currentUser.collections.length}</span>{" "}
        Collections
      </div>
      <div>
        {/* This doesn't work yet and the code might need to be altered, but I'll wait until Lukas is done updating the models. */}
        <span className="font-bold">{currentUser.items.length}</span> Items
      </div>
    </div>
  );
};

export default UserStatistics;
