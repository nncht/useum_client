import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import getCollection from '../../services/getCollection';
import ImageUploader from '../../components/ImageUploader';
import SelectCategories from '../../components/SelectCategories';

const API_URL = 'http://localhost:5005';

const EditCollection = () => {
	const [collection, setCollection] = useState(null);
	const [imageUrl, setImageUrl] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [categoryArray, setCategoryArray] = useState([]);
	const [uploadingImage, setUploadingImage] = useState(false);

	const { collectionId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		getCollection(collectionId, setCollection);
	}, []);

	console.log(collection);

	useEffect(() => {
		if (collection) {
			setName(collection.name);
			setDescription(collection.description);
			setImageUrl(collection.imageUrl);
			const tags = collection.categories.map((category) => {
				return category.category;
			});
			setCategoryArray(tags);
		}
	}, [collection]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'name') {
			setName(value);
		} else if (name === 'description') {
			setDescription(value);
		} else if (name === 'categoryArray') {
			setCategoryArray(value);
		}
	};

	const handleEditCollectionSubmit = (e) => {
		e.preventDefault();

		if (uploadingImage) {
			return;
		}

		const updatedCollectionBody = {
			name: name,
			description: description,
			imageUrl: imageUrl,
			createdBy: collection.createdBy,
			categories: categoryArray,
		};

		axios
			.put(`${API_URL}/collections/${collectionId}/edit`, updatedCollectionBody)
			.then((res) => {
				console.log('res is: ', res.data);
				setCollection(res.data);

				navigate(`/collections/${collectionId}`);
			})
			.catch((err) => {
				console.log('err is: ', err);
			});
	};

	const deleteCollection = () => {
		axios
			.post(`${API_URL}/collections/${collectionId}`, {
				createdBy: collection.createdBy,
			})
			.then((res) => {
				console.log('res is: ', res.data);
				navigate('/profile');
			})
			.catch((err) => {
				console.log('err is: ', err);
			});
	};

	//   RENDER EDIT COLLECTION FORM
	const fixedInputClass =
		'rounded-md appearance-none relative block w-full p-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm';

	return (
		<div id='main-content' className='px-3 pt-3 pb-20 bg-slate-300'>
			<form onSubmit={handleEditCollectionSubmit} className='flex flex-col w-50 mx-auto gap-y-2'>
				<label htmlFor='name' className='text-xl'>
					Name
				</label>
				<input type='text' name='name' value={name} onChange={handleChange} className={fixedInputClass} />

				<label htmlFor='description' className='text-xl'>
					Description
				</label>
				<textarea
					type='text'
					name='description'
					value={description}
					onChange={handleChange}
					rows='5'
					className={fixedInputClass}
				/>

				<label htmlFor='categoryArray'> Categories </label>

				<SelectCategories categoryArray={categoryArray} setCategoryArray={setCategoryArray} />

				{ uploadingImage === true ? (<p>Uploading image, please wait...</p>) : (<img src={imageUrl} width={250} height={350} alt="" />)}

				<ImageUploader setImageUrl={setImageUrl} setUploadingImage={setUploadingImage} />

				<div className='flex justify-center'>
					<Button variant='contained' type='submit' className='m-3'>
						{' '}
						Update{' '}
					</Button>
					<Button variant='outlined' onClick={deleteCollection} className='m-3'>
						Delete Collection
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditCollection;
