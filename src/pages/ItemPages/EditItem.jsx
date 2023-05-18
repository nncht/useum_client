import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import Button from '@mui/material/Button';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import SelectCategories from '../../components/SelectCategories';
import { getCollectionId } from '../../services/sharedDatastore';
import API_URL from '../../services/apiConfig';

const EditItem = () => {
	const [item, setItem] = useState(null);
	const [imageUrl, setImageUrl] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [categoryArray, setCategoryArray] = useState([]);
	const [comment, setComment] = useState('');
	const [commentTitle, setCommentTitle] = useState('');
	const [uploadingImage, setUploadingImage] = useState(false);

	const collectionId = getCollectionId();

	const { itemId } = useParams();

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`${API_URL}/items/${itemId}`).then((res) => {
			setItem(res.data.item);
		});
	}, []);

	console.log(item);

	useEffect(() => {
		if (item) {
			setName(item.name);
			setDescription(item.description);
			setImageUrl(item.imageUrl);
			const tags = item.categories.map((category) => {
				return category.category;
			});
			setCategoryArray(tags);
			const userComment = item.comments.find((comment) => {
				return comment.user === user._id;
			});
			if (userComment) {
				setComment(userComment.body);
				setCommentTitle(userComment.title);

			}
		}
	}, [item]);

	console.log('Comment Title is: ', commentTitle, 'Comment is: ', comment);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'name') {
			setName(value);
		} else if (name === 'description') {
			setDescription(value);
		} else if (name === 'categoryArray') {
			setCategoryArray(value);
		} else if (name === 'commentTitle') {
			setCommentTitle(value);
		} else if (name === 'comment') {
			setComment(value);
		}
	};

	const handleEditItemSubmit = (e) => {
		e.preventDefault();

		if (uploadingImage) {
			return;
		}


			const updatedItemBody = {
				name: name,
				description: description,
				imageUrl: imageUrl,
				createdBy: item.createdBy,
				categories: categoryArray,
				commentTitle: commentTitle,
				comment: comment,
				currentUserId: user._id,
			};

			console.log(updatedItemBody)

		axios
			.put(`${API_URL}/items/${itemId}/edit`, updatedItemBody)
			.then((res) => {
				console.log('res is: ', res.data);
				setItem(res.data);

				navigate(`/items/${itemId}`);
			})
			.catch((err) => {
				console.log('err is: ', err);
			});
	};

	const deleteItem = () => {
		const requestBody = {
			collection: collectionId,
			createdBy: item.createdBy,
			currentUser: user._id,
		};

		axios
			.post(`${API_URL}/items/${itemId}`, requestBody)
			.then((res) => {
				console.log('res is: ', res.data);
				navigate(`/users/${user.username}`);
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
			<form onSubmit={handleEditItemSubmit} className='flex flex-col w-50 mx-auto gap-y-2'>
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

				<label htmlFor='review' className='text-xl mt-3'>
					Comment
				</label>
				<input
					type='text'
					name=''
					id=''
					placeholder='Comment Title'
					value={commentTitle}
					onChange={(event) => setCommentTitle(event.target.value)}
				/>
				<textarea
					id='review'
					className={fixedInputClass}
					value={comment}
					onChange={(event) => setComment(event.target.value)}
				/>

				{uploadingImage === true ? (
					<p>Uploading image, please wait...</p>
				) : (
					<img src={imageUrl} width={250} height={350} alt='' />
				)}

				<ImageUploader setImageUrl={setImageUrl} setUploadingImage={setUploadingImage} />

				<div className='flex justify-center'>
					<Button variant='contained' type='submit' className='m-3'>
						{' '}
						Update{' '}
					</Button>
					<Button variant='outlined' onClick={deleteItem} className='m-3'>
						Delete Item
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditItem;
