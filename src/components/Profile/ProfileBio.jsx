import Button from '@mui/material/Button';
import UserStatistics from './UserStatistics';
import CategoryTags from './CategoryTags';
import { Link } from 'react-router-dom';

const ProfileBio = ({ currentUser }) => {
	if (currentUser._id) {
		return (
			<div className='grid grid-auto-rows bg-slate-600 px-4 h-30 py-2'>
				<div className='text-right pt-3 pb-4'>
					<Link to={`/edit/${currentUser._id}`} className='m-2'>
						<Button variant='contained'>Edit Profile</Button>
					</Link>
				</div>
				<div>
					<div className='flex'>
						{/* Username */}
						<h2 className='mr-4 self-end text-3xl text-white m-0'>{currentUser.username}</h2>

						{/* Pronouns */}
						<i className='text-md text-white self-end p-1 ml-2'>
							{/* Should be ({currentUser.pronouns}), but waiting for updated User model and Edit profile function. Leaving placeholder for now.*/}
							({currentUser.pronouns})
						</i>
					</div>

					{/* Statistics (Followers, Collections, Items) */}
					<div className='my-2'>
						<UserStatistics currentUser={currentUser} />
					</div>

					{/* UserBio */}
					<p className='text-white text-lg'>
						{/* Needs to be replaced with {currentUser.userBio} once the Edit Profile function is ready.
          Leaving Lorem ipsum for testing purposes for now. */}
						{currentUser.userbio}
					</p>

					{/* Display user's category/interests tags */}
					<div className='flex'>
						<div className='mr-3'>
							<CategoryTags currentUser={currentUser} />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default ProfileBio;
