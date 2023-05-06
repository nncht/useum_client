import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:5005';

const MyCollection = () => {

    const [collection, setCollection] = useState(null);
    const {collectionId} = useParams();


    const getCollection = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${API_URL}/collections/${collectionId}`, {
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

    useEffect(() => {
        getCollection();
    }, []);


  return (
    <>

        <h1>My Collection</h1>

        {collection && (
            <>
                <h2>{collection.name}</h2>
                <p>{collection.description}</p>
                <img src={collection.image} alt="collection" />
            </>

        )}


    </>
  )
}

export default MyCollection