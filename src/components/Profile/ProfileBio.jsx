import Button from "@mui/material/Button";

const ProfileBio = ({ currentUser }) => {
  return (
    <div className="grid grid-rows-2 bg-slate-600 px-4 h-30 min-h-200 py-2">
      <div className="text-right pt-2">
        <Button variant="contained">Edit Profile</Button>
      </div>
      <div>
        <h2 className="text-3xl text-white">{currentUser.username}</h2>
        <p className="text-white text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default ProfileBio;
