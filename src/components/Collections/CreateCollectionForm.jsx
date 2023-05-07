import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import ImageUploader from '../../components/ImageUploader';
import Button from '@mui/material/Button';

const API_URL = 'http://localhost:5005';
function CreateCollectionForm() {
	const { user } = useContext(AuthContext);

	const [currentUser, setCurrentUser] = useState(user);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);
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

		const params = { name: name, description: description, createdBy: user._id, imageUrl: imageUrl };

		axios
			.post(`${API_URL}/collections`, params, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((res) => {
				console.log(res.data);
				setName('');
				setDescription('');
				setImageUrl('');
				navigate(`/my-collections/${res.data.collection._id}`);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 my-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";


	return (
		currentUser && (
			<div className='my-3'>
				<form onSubmit={handleSubmit}>
					<label htmlFor='name'>
						Name:
						<input type='text' id='name' className={fixedInputClass} value={name} onChange={(event) => setName(event.target.value)} />
					</label>

					<input type='hidden' name='' value={currentUser._id} />

					<label htmlFor='description'>
						Description:
						<textarea id='description' className={fixedInputClass} value={description} onChange={(event) => setDescription(event.target.value)} />
					</label>

					<ImageUploader setImageUrl={setImageUrl} message={'Upload a collection picture'} />

					<Button variant='contained' type='submit'>
						Create
					</Button>
				</form>

				{/* Error message */}
				<div className="my-2">
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
			</div>
		)
	);
}

export default CreateCollectionForm;
