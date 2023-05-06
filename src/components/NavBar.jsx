import * as React from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

// MUI imports
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// -- End of Imports

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-between bg-slate-200 sticky top-0 px-4">
      <Link href="/" underline="none">
        <h3>USEUM</h3>
      </Link>

      {/* LOGGED OUT NAVBAR */}
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

      {/* LOGGED IN NAVBAR */}
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
