import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { UserDataContext } from '../../context/userData.context';
import { Link } from 'react-router-dom';

import axios from 'axios';
import API_URL from '../../services/apiConfig';
import { Grid } from '@mui/material';
import SectionHeader from '../../components/UI/SectionHeader';

const Followers = () => {
	const { user } = useContext(AuthContext);

	//"otherUser" is the user whose profile we are viewing
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		if (user) {
			axios
				.get(`${API_URL}/users/${user.username}`)
				.then((res) => {
					setCurrentUser(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [user]);

	if (currentUser){return (
		<div id="main-content" className="justify-center">
      <div id="main-section" className="my-4 shadow-md">
      <section className="px-4 pt-3 pb-20 bg-slate-100">
      <SectionHeader title="My Followers" />


			<Grid container spacing={3}>
				{currentUser.followers.length === 0 ? (
					<p>Looks like you don't have any followers yet!</p>
				) : (

					currentUser.followers.map((follower) => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={3} key={follower._id}>
								<div key={follower._id}>
									<img src={follower.imageUrl} alt={follower.username} />
									<Link to={`/users/${follower.username}`}>
										<p>{follower.username}</p>
									</Link>
								</div>
							</Grid>
						);
					})
				)}
			</Grid>
      </section>
      </div>
              </div>
	);}
};

export default Followers;
