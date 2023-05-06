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
      {/* BRAND LOGO */}
      <div id="nav-bar" className="flex items-center justify-between px-4">
        <Link href="/" underline="none" className="flex items-center">
          <h1 className="w-full text-3xl font-bold my-2 text-slate-600">
            USEUM
          </h1>
        </Link>

        {/* LOGGED OUT NAVBAR */}
        {!isLoggedIn && (
          <div className="flex items-center">
            <Link href="/login" className="mx-2">
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
                <AccountCircleIcon className="text-slate-600" />
              </IconButton>
            </Link>

            <Link href="/settings">
              <IconButton color="primary" variant="text">
                <SettingsIcon className="text-slate-600" />
              </IconButton>
            </Link>

            <IconButton color="primary" variant="text" onClick={logOutUser}>
              <LogoutIcon className="text-slate-600" />
            </IconButton>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
