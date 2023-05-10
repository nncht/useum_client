import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { setCollectionId } from '../../services/sharedDatastore';
import { getCollectionId } from "../../services/sharedDatastore";


const API_URL = 'http://localhost:5005';
const MyItem = () => {
	const { itemId } = useParams();
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

	console.log(item.categories);

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



							{item.categories && (<div>
								<h4 className='text-2xl text-slate-600'>Tags</h4>
								{item.categories.map((tag) => {
									return <p key={tag._id}>{tag.category}</p>;
								})}
							</div>)}

							{/* If there are reviews, displays the reviews for the item */}

							{item.reviews && (
								<div>
									{item.reviews.map((review) => {
										return (
											<div key={review._id}>
												<p>{review.title}</p>
												<p>{review.description}</p>
												<p>{review.rating}</p>
											</div>
										);
									})}
								</div>
							)}
						</div>
						<Link to={`/edit-item/${item._id}`} onClick={() => setCollectionId(collectionId)}>
							<Button>Edit Item</Button>
						</Link>
					</section>
				</div>
			)}
		</>
	);
};

export default MyItem;
