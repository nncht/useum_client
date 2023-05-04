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
          <li style={{ display: "inline-block" }}>
            <Link to="/login">
              <Button variant="text">Log In</Button>
            </Link>
          </li>
          <li style={{ display: "inline-block" }}>
            <Link to="/signup">
              <Button variant="text">Sign Up</Button>
            </Link>
          </li>
        </ul>
      )}

      {isLoggedIn && (
        <ul>
          <li style={{ display: "inline-block" }}>
            <Link to="/profile">
              <Button variant="text">Profile</Button>
            </Link>
          </li>

          <li style={{ display: "inline-block" }}>
            <Button variant="text" onClick={logOutUser}>
              Log Out
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
