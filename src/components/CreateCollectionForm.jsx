import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';
function CreateCollectionForm() {
	const { user } = useContext(AuthContext);

	const [currentUser, setCurrentUser] = useState(user);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const storedToken = localStorage.getItem('authToken');

	const navigate = useNavigate();

	useEffect(() => {
		if (user && user._id) {
			axios
				.get(`${API_URL}/users/${user._id}`)
				.then((res) => {
					setCurrentUser(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [user]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const params = { name: name, description: description, createdBy: user._id };

		axios
			.post(`${API_URL}/collections`, params, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((res) => {
        console.log(res.data);
				setName('');
				setDescription('');
				navigate('/collections');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		currentUser && (
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">
					Name:
					<input type='text' id="name" value={name} onChange={(event) => setName(event.target.value)} />
				</label>

				<input type='hidden' name='' value={currentUser._id} />

				<label htmlFor="description">
					Description:
					<textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />


				</label>


				<button type='submit'>Create</button>
			</form>
		)
	);
}

export default CreateCollectionForm;
