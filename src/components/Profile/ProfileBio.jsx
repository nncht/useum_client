import Button from "@mui/material/Button";
import UserStatistics from "./UserStatistics";
import CategoryTag from "./CategoryTag";

const ProfileBio = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="grid grid-auto-rows bg-slate-600 px-4 h-30 py-2">
      <div className="text-right pt-3 pb-4">
        <Button variant="contained">Edit Profile</Button>
      </div>
      <div>
        <div className="flex">
          {/* Username */}
          <h2 className="mr-4 self-end text-3xl text-white m-0">
            {currentUser.username}
          </h2>

          {/* Pronouns */}
          <i className="text-md text-white self-end p-1 ml-2">
            {/* Should be ({currentUser.pronouns}), but waiting for updated User model and Edit profile function. Leaving placeholder for now.*/}
            {/* ({currentUser.pronouns}) */}
            (they/them)
          </i>
        </div>

        {/* Statistics (Followers, Collections, Items) */}
        <div className="my-2">
          <UserStatistics currentUser={currentUser} />
        </div>

        {/* UserBio */}
        <p className="text-white text-lg">
          {/* Needs to be replaced with {currentUser.userBio} once the Edit Profile function is ready.
          Leaving Lorem ipsum for testing purposes for now. */}
          {/* {currentUser.userBio} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Display user's category/interests tags */}
        <div className="flex">
          <div className="mr-3">
            <CategoryTag />
          </div>
        </div>

        {/* Available categories of this user will be rendered as tags here. Disabled until categories Array works */}
        {/* <div className="flex">
            {currentUser.categories.map((category) => {
              return (
                <div key={category} className="mr-3">
                  <CategoryTag />
                </div>
              );
            })}
          </div> */}
      </div>
    </div>
  );
};

export default ProfileBio;
