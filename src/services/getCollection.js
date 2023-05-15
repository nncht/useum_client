
import axios from 'axios';
import API_URL from './apiConfig';



const getCollection = (collectionId, setCollection) => {
		const storedToken = localStorage.getItem('authToken');

		if (collectionId !== undefined) {
		axios
			.get(`${API_URL}/collections/${collectionId}`, {
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			})
			.then((response) => {
				setCollection(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
		} else {
			console.warn('collectionId as ItemCard prop is undefined. That is okay in this instance, it still works.');
		}
	};

    export default getCollection;