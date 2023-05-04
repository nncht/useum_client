import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
              <Button variant="text" size="large">
                <AccountCircleIcon />
              </Button>
            </Link>
          </li>

          <li style={{ display: "inline-block" }}>
            <Link to="/settings">
              <Button variant="text" size="large">
                <SettingsIcon />
              </Button>
            </Link>
          </li>

          <li style={{ display: "inline-block" }}>
            <Button variant="text" size="large" onClick={logOutUser}>
              <LogoutIcon />
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
