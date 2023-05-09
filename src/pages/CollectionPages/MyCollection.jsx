import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import getCollection from '../../services/getCollection';
import CollectionHeader from '../../components/Collections/CollectionHeader';
import { setCollectionId } from '../../services/sharedDatastore';

const API_URL = 'http://localhost:5005';

const MyCollection = () => {
	const [collection, setCollection] = useState(null);
	const { collectionId } = useParams();

	useEffect(() => {
		getCollection(collectionId, setCollection);
	}, []);

	// COLLECTION DETAILS RENDER
	return (
		<>
			{collection && (
				<div id='main-content' className='bg-slate-300'>
					<CollectionHeader collection={collection} />
					<section className='p-3 pb-10'>
						{/* Collection name and description */}
						<div>
							<h4 className='text-2xl text-slate-600'>{collection.name}</h4>
							<p>{collection.description}</p>
						</div>

						{/* Items */}
						<div>
							{collection.items.map((item) => (
                <div key={item._id} className='flex flex-col'>
                  <Link to={`/my-items/${item._id}`}>
                    <h4 className='text-2xl text-slate-600'>{item.name}</h4>
                  </Link>
                  <p>{item.description}</p>
                </div>
              ))


      }
						</div>

						{/* Add new item buttone */}
						<Link to='/create-item' className='m-2' onClick={() => setCollectionId(collection._id)}>
							<Button variant='contained'>Add new item</Button>
						</Link>
						{/* Edot collection buttone */}
						<Link to={`/edit-collection/${collection._id}`}>
							<Button>Edit Collection</Button>
						</Link>
					</section>
				</div>
			)}
		</>
	);
};

export default MyCollection;
