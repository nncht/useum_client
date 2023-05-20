

import { AuthContext } from '../../context/auth.context';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API_URL from '../../services/apiConfig';
import axios from 'axios';

import Button from '@mui/material/Button';

const LikeButton = ({ id }) => {
	//id here either means collection or item id

	const { user } = useContext(AuthContext);

	console.log(id);

	const [currentUser, setCurrentUser] = useState(null);

	const [isLiked, setIsLiked] = useState(false);
	const [likeList, setLikeList] = useState([]);

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

    console.log(currentUser)

	//Check if User has already liked this item/collection

	useEffect(() => {
		if (currentUser && currentUser.likes.includes(id)) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [currentUser, id]);

	//Like action

	const handleLike = async () => {

        console.log("You clicked like")
		try {
			const response = await axios.post(`${API_URL}/${currentUser._id}/like/${id}`);
			setIsLiked(true);
			setLikeList([...likeList, id]);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	//Unlike action

	const handleUnlike = async () => {
		try {
			const response = await axios.post(`${API_URL}/${currentUser._id}/unlike/${id}`);
			setIsLiked(false);
			setLikeList(likeList.filter((like) => like !== id));
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			{isLiked ? (
                <>
				<Button
					key={Date.now()} // This magically forces the component to refresh
					variant='contained'
					className='unlike-btn'
					onMouseOver={() => {
						document.querySelector('.unlike-btn').textContent = 'Unlike';
					}}
					onMouseOut={() => {
						document.querySelector('.unlike-btn').textContent = 'Liked';
					}}
					onClick={handleUnlike}
				>
					Liked
				</Button>
                <p> You and {likeList.length - 1} others like this</p>
                </>
			) : (

					<Button
						key={Date.now()} // This magically forces the component to refresh
						variant='contained'
						onClick={handleLike}
					>
						Like
					</Button>


			)}
		</div>
	);
};

export default LikeButton;
