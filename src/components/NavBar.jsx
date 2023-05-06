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
    <nav className="sticky top-0 bg-slate-200">
      <div id="nav-bar" className="flex justify-between px-4">
        <Link href="/" underline="none">
          <h1 className="w-full text-3xl font-bold">USEUM</h1>
        </Link>

        {/* LOGGED OUT NAVBAR */}
        {!isLoggedIn && (
          <div>
            <Link href="/login">
              <Button variant="outlined" size="medium">
                Log In
              </Button>
            </Link>

            <Link href="/signup">
              <Button variant="contained" size="medium">
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        {/* LOGGED IN NAVBAR */}
        {isLoggedIn && (
          <div>
            <Link href="/profile">
              <IconButton color="primary" variant="text">
                <AccountCircleIcon />
              </IconButton>
            </Link>

            <Link href="/settings">
              <IconButton color="primary" variant="text">
                <SettingsIcon />
              </IconButton>
            </Link>

            <IconButton color="primary" variant="text" onClick={logOutUser}>
              <LogoutIcon />
            </IconButton>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
