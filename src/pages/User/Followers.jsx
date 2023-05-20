import { useState, useEffect, useContext } from 'react';
import { UserDataContext } from '../../context/userData.context'
import { AuthContext } from '../../context/auth.context';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import API_URL from '../../services/apiConfig';
import { Grid } from '@mui/material';
import SectionHeader from '../../components/UI/SectionHeader';

const Followers = () => {
	const { user } = useContext(AuthContext);
	const { username } = useParams();

	const [otherUser, setOtherUser] = useState(null);




	useEffect(() => {
		if (username) {

			axios
				.get(`${API_URL}/users/${username}/follow`)
				.then((res) => {
					setOtherUser(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [username]);

	if (otherUser && user && user._id) {
		return (
			<>
				<div id='main-content' className='justify-center'>
					<div id='main-section' className='my-4 shadow-md'>
						<section className='px-4 pt-3 pb-20 bg-slate-100'>
							{otherUser._id === user._id ? (
								<SectionHeader title='My Followers' />
							) : (
								<SectionHeader title={`${otherUser.username}'s Followers`} />
							)}
							<Grid container spacing={2}>
								{otherUser.followers.length === 0 ? (
									<p>No followers yet</p>
								) : (
									otherUser.followers.map((follower) => {
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
			</>
		);
	}
};

export default Followers;
