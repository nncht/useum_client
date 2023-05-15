import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../services/apiConfig';
import ItemCard from '../../components/Items/ItemCard';
import CollectionCard from '../../components/Collections/CollectionCard';
import { Grid } from '@mui/material';

const BookmarksPage = () => {
	const { userId } = useParams();
	const [collectionBookmarks, setCollectionBookmarks] = useState([]);
	const [itemBookmarks, setItemBookmarks] = useState([]);

	const navigate = useNavigate();

	console.log(userId);

	useEffect(() => {
		axios
			.get(`${API_URL}/bookmarks/${userId}`)
			.then((res) => {
				console.log(res.data.itemBookmarks);
				setItemBookmarks(res.data.itemBookmarks);
				setCollectionBookmarks(res.data.collectionBookmarks);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div id="main-content">
			<section className="px-4 pt-3 pb-20 bg-slate-300">
                <h4 className="text-2xl text-slate-600">Bookmarks</h4>
                <div>
                    <Grid container spacing={3}>
                        <h5>Items</h5>
                        {itemBookmarks.map((item) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                                    <ItemCard key={item._id} item={item} />
                                </Grid>
                            );
                        })}
                        <h5>Collections</h5>
                        {collectionBookmarks.map((collection) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                                    <CollectionCard key={collection._id} collection={collection} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </section>
		</div>
	);
};

export default BookmarksPage;
