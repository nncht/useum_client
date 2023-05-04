import React from "react";

function NavBar() {
  return (
    // Temporary NavBar for easier navigation during the initial development phase. To be improved later.
    <div>
      <button variant="contained">
        <a href="/">Browse</a>
      </button>
      <button variant="contained">
        <a href="/profile">Profile</a>
      </button>
      <button variant="contained">
        <a href="/login">Log In</a>
      </button>
      <button variant="contained">
        <a href="/register">Sign Up</a>
      </button>
    </div>
  );
}

export default NavBar;
