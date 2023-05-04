import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    // Temporary NavBar for easier navigation during the initial development phase. To be improved later.

    <nav className="flex justify-between">
      <Link to="/">
        <h2>USEUM</h2>
      </Link>
      {!isLoggedIn && (
        <ul>
          <Link to="/login">
            <Button variant="text">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="text">Sign Up</Button>
          </Link>
        </ul>
      )}

      {isLoggedIn && (
        <ul>
          <Link to="/">
            <Button variant="text">Browse</Button>
          </Link>
          <Link to="/profile">
            <Button variant="text">Profile</Button>
          </Link>

          <Button variant="text" onClick={logOutUser}>
            Log Out
          </Button>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
