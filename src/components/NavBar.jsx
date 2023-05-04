import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		// Temporary NavBar for easier navigation during the initial development phase. To be improved later.
		<div>
			<Link to="/"><Button variant='text'>Browse</Button></Link>
			<Link to="/profile">
        <Button variant='text'>
          Profile
        </Button>
      </Link>
			<Link to="/login">
        <Button variant='text'>
          Log In
        </Button>
      </Link>
			<Link to="/register">
        <Button variant='text'>
          Register
        </Button>
      </Link>
		</div>
	);
}

export default NavBar;
