import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import getCollection from '../../services/getCollection';
import ImageUploader from '../../components/ImageUploader';

const API_URL = 'http://localhost:5005';

const EditCollection = () => {
	const [collection, setCollection] = useState(null);
	const [imageUrl, setImageUrl] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const { collectionId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		getCollection(collectionId, setCollection);
	}, []);

	useEffect(() => {
		if (collection) {
			setName(collection.name);
			setDescription(collection.description);
			setImageUrl(collection.imageUrl);
		}
	}, [collection]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'name') {
			setName(value);
		} else if (name === 'description') {
			setDescription(value);
		}
	};

	const handleEditCollectionSubmit = (e) => {
		e.preventDefault();

		const updatedCollectionBody = {
			name: name,
			description: description,
			imageUrl: imageUrl,
		};

		axios
			.put(`${API_URL}/collections/${collectionId}/edit`, updatedCollectionBody)
			.then((res) => {
				console.log('res is: ', res.data);
				setCollection(res.data);

				navigate(`/my-collections/${collectionId}`);
			})
			.catch((err) => {
				console.log('err is: ', err);
			});
	};

	return (
		<>
			<form onSubmit={handleEditCollectionSubmit}>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' value={name} placeholder={collection?.name} onChange={handleChange} />

				<label htmlFor='description'>Description</label>
				<input
					type='text'
					name='description'
					value={description}
					placeholder={collection?.description}
					onChange={handleChange}
				/>

				<ImageUploader setImageUrl={setImageUrl} />

				<Button type='submit'> Update </Button>
			</form>
		</>
	);
};

export default EditCollection;
