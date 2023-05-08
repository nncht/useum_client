
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const getCollection = (collectionId, setCollection) => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.get(`${API_URL}/collections/${collectionId}`, {
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setCollection(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

    export default getCollection;