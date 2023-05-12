import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

// MUI components
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// MUI icons
import Link from "@mui/material/Link";

import IconButton from "@mui/material/IconButton";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// -- End of Imports

// type Anchor = "right";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const drawerWidth = 240;

  return (
    <nav className="sticky shadow top-0 bg-slate-700" style={{ zIndex: 10 }}>
      {/* BRAND LOGO */}
      <div id="nav-bar" className="flex items-center justify-between px-4">
        <Link href="/" underline="none" className="flex items-center">
          <h1 className="w-full text-3xl tracking-widest font-bold my-2 text-slate-50">
            /USEUM
          </h1>
        </Link>

        {/* LOGGED OUT NAVBAR */}
        {!isLoggedIn && (
          <div className="flex items-center">
            <Link href="/login" className="mx-2">
              <Button sx={{ color: "white" }} variant="text" size="small">
                Log In
              </Button>
            </Link>

            <Link href="/signup">
              <Button variant="contained" size="small">
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
                <AccountCircleIcon className="text-slate-50" />
              </IconButton>
            </Link>

            <Link href="/profile">
              <IconButton color="primary" variant="text">
                <AccountCircleIcon className="text-slate-50" />
              </IconButton>
            </Link>

            {/* <IconButton color="primary" variant="text" onClick={logOutUser}>
              <LogoutIcon className="text-slate-50" />
            </IconButton> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
