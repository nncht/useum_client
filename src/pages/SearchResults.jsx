import SectionHeader from '../components/UI/SectionHeader';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../services/apiConfig';
import { Grid } from '@mui/material';
import ItemCard from '../components/Items/ItemCard';
import CollectionCard from '../components/Collections/CollectionCard';

const SearchResults = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [usersFound, setUsersFound] = useState([]);
	const [itemsFound, setItemsFound] = useState([]);
	const [collectionsFound, setCollectionsFound] = useState([]);

	const searchTerm = searchParams.get('q');

	useEffect(() => {
		if (searchTerm) {
			axios
				.get(`${API_URL}/search?search=${searchTerm}`)
				.then((res) => {
					console.log(res.data);
					setUsersFound(res.data.users);
					setItemsFound(res.data.items);
					setCollectionsFound(res.data.collections);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [searchTerm]);

	return (
		<div id='main-content'>
			<section className='px-4 pt-3 pb-20 bg-slate-300'>
				<SectionHeader title='Search Results' />

				<SectionHeader title='Users' />
				<Grid container spacing={3}>
					{usersFound.length ? (
						usersFound.map((user) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
								<div key={user._id}>
									<img src={user.imageUrl} alt='' />
									<p>{user.username}</p>
								</div>
							</Grid>
						))
					) : (
						<p>No users found</p>
					)}
				</Grid>

				<Grid container spacing={3}>
					<SectionHeader title='Items' />

					{itemsFound.length ? (
						itemsFound.map((item) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
								<ItemCard key={item._id} item={item} />
							</Grid>
						))
					) : (
						<p>No items found</p>
					)}
				</Grid>

				<Grid container spacing={3}>
					<SectionHeader title='Collections' />

					{collectionsFound.length ? (
						collectionsFound.map((collection) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
								<CollectionCard key={collection._id} collection={collection} />
							</Grid>
						))
					) : (
						<p>No collections found</p>
					)}
				</Grid>
			</section>
		</div>
	);
};

export default SearchResults;
