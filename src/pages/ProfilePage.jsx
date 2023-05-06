import { AuthContext } from '../context/auth.context';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const ProfilePage = () => {
	const { user } = useContext(AuthContext);

	const [currentUser, setCurrentUser] = useState(user);

	useEffect(() => {
		if (user && user._id) {
			axios
				.get(`${API_URL}/users/${user._id}`)
				.then((res) => {
					setCurrentUser(res.data);
					console.log(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [user]);

	console.log('the currentUser', currentUser);

	return (
		currentUser && (
			<div>
				<h1>{currentUser.username}'s Profil</h1>
				<img src={currentUser.imageUrl} width={100} height={150} alt='A picture of you!' />

				<p>Email: {currentUser.email}</p>

				<h3>My Collections:</h3>

				{!currentUser.collections ? (
					<p>You have no collections yet!</p>
				) : (
					currentUser.collections.map((collection) => {
						return (
							<div key={collection._id}>
								<Link to={`/my-collections/${collection._id}`}>
									<p>{collection.name}</p>
								</Link>
							</div>
						);
					})
				)}

				<h3>My interests:</h3>

				{!currentUser.categories ? (
					<p>You have no interests yet!</p>
				) : (
					currentUser.categories.map((category) => {
						return (
							<div key={category._id}>
								<p>{category.name}</p>
							</div>
						);
					})
				)}
			</div>
		)
	);
};

export default ProfilePage;
