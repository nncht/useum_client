import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/auth.context';
import { setCollectionId } from '../../services/sharedDatastore';
import { getCollectionId } from '../../services/sharedDatastore';
import AddItemToCollection from '../../components/Items/AddItemToCollection';
import BookmarkButton from '../../components/Bookmarks/BookmarkButton';
import API_URL from '../../services/apiConfig';

const MyItem = () => {
	const { itemId } = useParams();

	const { user } = useContext(AuthContext);

	const [item, setItem] = useState({});
	const collectionId = getCollectionId();

	useEffect(() => {
		axios
			.get(`${API_URL}/items/${itemId}`)
			.then((response) => {
				console.log(response.data.item);
				setItem(response.data.item);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [itemId]);

	console.log(item)


		return (
		<>
			{/* Displays the item details */}

			{item && (
				<div id='main-content' className='bg-slate-300'>
					<section className='px-4 pt-3 pb-20 bg-slate-300'>
						<div>
							<img src={item.imageUrl} width={250} height={350} alt='an item' />
							<h4 className='text-2xl text-slate-600'>{item.name}</h4>
							<p>{item.description}</p>

							{item.categories && (
								<div>
									<h4 className='text-2xl text-slate-600'>Tags</h4>
									{item.categories.map((tag) => {
										return <p key={tag._id}>{tag.category}</p>;
									})}
								</div>
							)}

							{/* If there are comments, displays the comments for the item */}

							{item.comments && (
								<div>
									{item.comments.map((comment) => {
										return (
											<div key={comment._id}>
												<p>{comment.title}</p>
												<p>{comment.description}</p>
											</div>
										);
									})}
								</div>
							)}
						</div>

						{/* Like button */}



							<Link to={`/edit-item/${item._id}`} onClick={() => setCollectionId(collectionId)}>
							<Button>Edit Item</Button>
							</Link>


							<div>
								<BookmarkButton id={item._id} />
							</div>



						<AddItemToCollection itemId={item._id} />
					</section>
				</div>
			)}
		</>
	);
};

export default MyItem;
