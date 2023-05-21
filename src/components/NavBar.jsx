import * as React from "react";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import SearchBar from "./DynamicSearch/SearchBar";

// MUI components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

// MUI icons
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";



import TerminalIcon from '@mui/icons-material/Terminal';

// -- End of Imports

export default function NavBar() {
  // Auth functions from AuthContext
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // Drawer navigation
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ width: 250, paddingTop: 0 }}>
        {/* Profile */}

        <ListItem key="Profile" disablePadding>
          <ListItemButton href={`/users/${user.username}`}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={user.username} />
          </ListItemButton>
        </ListItem>

        {/* My Collections */}

        <ListItem key="Collections" disablePadding>
          {/* In the future, this should show the user's collections but without the profile headers, etc.
          A page still needs to be created, for now it opens this user's profile  */}
          <ListItemButton href={`/users/${user.username}`}>
            <ListItemIcon>
              <CreateNewFolderIcon />
            </ListItemIcon>
            <ListItemText primary="Collections" />
          </ListItemButton>
        </ListItem>

        {/* My Bookmarks */}

        <ListItem key="Bookmarks" disablePadding>
          <ListItemButton href={`/bookmarks/${user._id}`}>
            <ListItemIcon>
              <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItemButton>
        </ListItem>

        {/* Following */}

        <ListItem key="Following" disablePadding>
          <ListItemButton href="#">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Following" />
          </ListItemButton>
        </ListItem>

        {/* Notifications */}

        <ListItem key="Notifications" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </ListItem>

        {/* Events */}

        <ListItem key="Event Log" disablePadding>
          <ListItemButton href={`/eventlog/${user._id}`}>
            <ListItemIcon>
              <TerminalIcon />
            </ListItemIcon>
            <ListItemText primary="Event Log" />
          </ListItemButton>
        </ListItem>

        {/* Messages */}

        <ListItem key="Messages" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>

        {/* Settings */}

        <ListItem key="Settings" disablePadding>
          <ListItemButton href="/profile">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>

        <Divider />

        {/* Logout */}
        <ListItem key="Log Out" disablePadding>
          <ListItemButton onClick={logOutUser}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav
      id="back-to-top-anchor"
      className="sticky shadow top-0 bg-slate-700"
      style={{ zIndex: 10 }}
    >
      {/* BRAND LOGO */}
      <div id="nav-bar" className="flex items-center justify-between px-6">
        <Link href="/" underline="none" className="flex items-center">
          <h1 className="w-full text-3xl tracking-widest font-bold my-2 text-slate-50">
            /USEUM
          </h1>
          {/* <SearchBar /> */}
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
            {/* Burger menu */}
            <React.Fragment key="left">
              <Button onClick={toggleDrawer("left", true)}>
                <MenuIcon className="text-slate-50" />
              </Button>
              <Drawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </React.Fragment>
          </div>
        )}
      </div>
    </nav>
  );
}
