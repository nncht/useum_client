import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import getCollection from '../../services/getCollection';
import CollectionHeader from '../../components/Collections/CollectionHeader';
import { setCollectionId } from '../../services/sharedDatastore';
import ItemCard from '../../components/Items/ItemCard';
import { Grid } from '@mui/material';
import { AuthContext } from '../../context/auth.context';

const API_URL = 'http://localhost:5005';

const MyCollection = () => {
	const { user } = useContext(AuthContext);

	const [collection, setCollection] = useState(null);
	const { collectionId } = useParams();

	useEffect(() => {
		getCollection(collectionId, setCollection);
	}, []);


	// COLLECTION DETAILS RENDER
	if (collection) {
		return (
			<>

					<div id='main-content' className='bg-slate-300'>
						<CollectionHeader collection={collection} />
						<section className='px-4 pt-3 pb-20 bg-slate-300'>
							{/* Collection name and description */}
							<div>
								<h4 className='text-2xl text-slate-600'>{collection.name}</h4>
								<p>{collection.description}</p>
							</div>
							<div>
								<h4 className='text-2xl text-slate-600'>Tags</h4>
								{collection.categories.map((tag) => {
									return <p key={tag._id}>{tag.category}</p>;
								})}
							</div>

							{/* Items */}
							<Grid container spacing={3}>
								{collection.items.map((item) => {
									return (
										<>
											<Grid item xs={12} sm={6} md={4} lg={3}>
												<ItemCard item={item} key={item._id} currentCollection={collection._id} />
											</Grid>
										</>
									);
								})}
							</Grid>
							{/* Add new item buttone */}

							{user._id === collection.createdBy ? (
								<div className='py-4'>
									<Link to='/create-item' className='m-2' onClick={() => setCollectionId(collection._id)}>
										<Button variant='contained'>Add new item</Button>
									</Link>
									{/* Edot collection buttone */}
									<Link to={`/edit-collection/${collection._id}`}>
										<Button>Edit Collection</Button>
									</Link>
								</div>
							) : (
								<div></div>
							)}
						</section>
					</div>

			</>
		);
	}
};

export default MyCollection;
