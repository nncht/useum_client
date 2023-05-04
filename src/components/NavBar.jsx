import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
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
      <Link href="/" underline="none">
        <h2>USEUM</h2>
      </Link>
      {!isLoggedIn && (
        <ul>
          <li style={{ display: "inline-block" }} className="mx-2">
            <Link href="/login">
              <Button variant="outlined" size="medium">
                Log In
              </Button>
            </Link>
          </li>
          <li style={{ display: "inline-block" }}>
            <Link href="/signup">
              <Button variant="contained" size="medium">
                Sign Up
              </Button>
            </Link>
          </li>
        </ul>
      )}

      {isLoggedIn && (
        <ul>
          <li style={{ display: "inline-block" }}>
            <Link href="/profile">
              <IconButton color="primary" variant="text">
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </li>

          <li style={{ display: "inline-block" }}>
            <Link href="/settings">
              <IconButton color="primary" variant="text">
                <SettingsIcon />
              </IconButton>
            </Link>
          </li>

          <li style={{ display: "inline-block" }}>
            <IconButton color="primary" variant="text" onClick={logOutUser}>
              <LogoutIcon />
            </IconButton>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
