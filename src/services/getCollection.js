
import axios from 'axios';
import API_URL from './apiConfig';



const getCollection = (collectionId, setCollection) => {
		const storedToken = localStorage.getItem('authToken');
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
	};

    export default getCollection;