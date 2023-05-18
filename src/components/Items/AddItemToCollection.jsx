import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import API_URL from "../../services/apiConfig";



const AddItemToCollection = ({ itemId }) => {
	const { user } = useContext(AuthContext);

	const [currentUser, setCurrentUser] = useState(user);
	const [collectionId, setCollectionId] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	useEffect(() => {
		if (user && user.username) {
			axios
				.get(`${API_URL}/users/${user.username}`)
				.then((res) => {
					setCurrentUser(res.data);
					console.log(res.data);
				})
				.catch((err) => {
					console.error(err);

				});
		}
	}, [user]);

	const collectionArray = currentUser.collections;

	const handleSelectChange = (e) => {
		console.log(e.target.value);
		setCollectionId(e.target.value);
	};

	const handleCollectionChoice = (e) => {
		e.preventDefault();

		axios
			.put(`${API_URL}/collections/${collectionId}/add-item`, { item: itemId, user: user._id })
			.then((res) => {
				navigate(`/collections/${collectionId}`);
			})
			.catch((err) => {
				console.error(err);
                setErrorMessage(err.response.data.message);
			});
	};

	if (collectionArray) {
		return (
			<div>
				<h3>To which collection would you like to add this item?</h3>

				<Box sx={{ minWidth: 120 }}>
                    <FormControl onSubmit={handleCollectionChoice}>
                        <InputLabel id='collection-picker'>Collection</InputLabel>
                        <Select
                            labelId='collection-picker'
                            id='demo-simple-select'
                            value={collectionId}
                            label='Collection'
                            onChange={handleSelectChange}
                        >
                            {collectionArray.map((collection) => {
                                return (
                                    <MenuItem key={collection._id} value={collection._id}>
                                        {collection.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <Button type='submit' onClick={handleCollectionChoice}>Add to collection</Button>
                    </FormControl>
                </Box>

                {errorMessage && <p className='error-message'>{errorMessage}</p>}
			</div>
		);
	}
};

export default AddItemToCollection;
