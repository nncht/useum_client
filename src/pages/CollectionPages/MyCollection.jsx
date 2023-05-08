import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import getCollection from '../../services/getCollection';

const API_URL = 'http://localhost:5005';

const MyCollection = () => {
	const [collection, setCollection] = useState(null);
	const { collectionId } = useParams();


	useEffect(() => {
		getCollection(collectionId, setCollection);
	}, []);


	return (
		<>
			<h1>My Collection</h1>

			{collection && (
				<>
					<h2>{collection.name}</h2>
					<p>{collection.description}</p>
					<img src={collection.imageUrl} alt='collection' />

                    <Link to={`/edit-collection/${collection._id}`}>
                        <Button>Edit Collection</Button>
                    </Link>

				</>
			)}
		</>
	);
};

export default MyCollection;
