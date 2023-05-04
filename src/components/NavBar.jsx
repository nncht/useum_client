import React from "react";
import Button from "@mui/material/Button";

function NavBar() {
  return (
    // Temporary NavBar for easier navigation during the initial development phase. To be improved later.
    <div>
      <Button variant="text">
        <a href="/">Browse</a>
      </Button>
      <Button variant="text">
        <a href="/profile">Profile</a>
      </Button>
      <Button variant="text">
        <a href="/login">Log In</a>
      </Button>
      <Button variant="text">
        <a href="/register">Sign Up</a>
      </Button>
    </div>
  );
}

export default NavBar;
