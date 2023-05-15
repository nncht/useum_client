import * as React from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext, useState } from 'react';

// MUI components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from '@mui/material/Link';

// MUI icons
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';

// -- End of Imports

export default function NavBar() {
	// Auth functions from AuthContext
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

	// Drawer navigation
	const [state, setState] = useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{/* Home */}
				<Link href='/' underline='none'>
					<ListItem key='Home' disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary='Home' />
						</ListItemButton>
					</ListItem>
				</Link>

				{/* Profile */}
				<Link href={`/users/${user.username}`} underline='none'>
					<ListItem key='Profile' disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText primary='Profile' />
						</ListItemButton>
					</ListItem>
				</Link>

				{/* Notifications */}
				<Link href='#' underline='none'>
					<ListItem key='Notifications' disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<NotificationsIcon />
							</ListItemIcon>
							<ListItemText primary='Notifications' />
						</ListItemButton>
					</ListItem>
				</Link>

				{/* Messages */}
				<Link href='#' underline='none'>
					<ListItem key='Messages' disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<EmailIcon />
							</ListItemIcon>
							<ListItemText primary='Messages' />
						</ListItemButton>
					</ListItem>
				</Link>

				{/* Bookmarks */}
				<Link href={`/bookmarks/${user._id}`} underline='none'>
					<ListItem key='Bookmarks' disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<BookmarksIcon />
							</ListItemIcon>
							<ListItemText primary='Bookmarks' />
						</ListItemButton>
					</ListItem>
				</Link>
			</List>

			{/* Settings */}
			<Link href='/profile' underline='none'>
				<ListItem key='Settings' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Settings' />
					</ListItemButton>
				</ListItem>
			</Link>

			<Divider />

			{/* New Collection */}
			<Link href='     /create-collection' underline='none'>
				<ListItem key='New Collection' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<AddBoxIcon />
						</ListItemIcon>
						<ListItemText primary='New Collection' />
					</ListItemButton>
				</ListItem>
			</Link>

			{/* New Item */}
			<Link href='/create-item' underline='none'>
				<ListItem key='New Item' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<AddBoxIcon />
						</ListItemIcon>
						<ListItemText primary='Create Item' />
					</ListItemButton>
				</ListItem>
			</Link>

			<Divider />

			{/* Logout */}
			<ListItem key='Log Out' disablePadding>
				<ListItemButton onClick={logOutUser}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText primary='Log Out' />
				</ListItemButton>
			</ListItem>
		</Box>
	);

	{
		/* <IconButton color="primary" variant="text" onClick={logOutUser}>
                <LogoutIcon className="text-slate-50" />
              </IconButton> */
	}

	return (
		<nav className='sticky shadow top-0 bg-slate-700' style={{ zIndex: 10 }}>
			{/* BRAND LOGO */}
			<div id='nav-bar' className='flex items-center justify-between pl-6'>
				<Link href='/' underline='none' className='flex items-center'>
					<h1 className='w-full text-3xl tracking-widest font-bold my-2 text-slate-50'>/USEUM</h1>
				</Link>

				{/* LOGGED OUT NAVBAR */}
				{!isLoggedIn && (
					<div className='flex items-center'>
						<Link href='/login' className='mx-2'>
							<Button sx={{ color: 'white' }} variant='text' size='small'>
								Log In
							</Button>
						</Link>

						<Link href='/signup'>
							<Button variant='contained' size='small'>
								Sign Up
							</Button>
						</Link>
					</div>
				)}

				{/* LOGGED IN NAVBAR */}
				{isLoggedIn && (
					<div>
						{/* Burger menu */}
						<React.Fragment key='left'>
							<Button onClick={toggleDrawer('left', true)}>
								<MenuIcon className='text-slate-50' />
							</Button>
							<Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
								{list('left')}
							</Drawer>
						</React.Fragment>
					</div>
				)}
			</div>
		</nav>
	);
}
