import { useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { AuthContext } from '../../context/auth.context';
import API_URL from "../../services/apiConfig";



const DeleteUserPage = () => {
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

    const { userId } = useParams();

    const { logOutUser } = useContext(AuthContext);


	const handleChange = (e) => {
		setPassword(e.target.value);
	};

	const deleteUser = () => {
		const storedToken = localStorage.getItem('authToken');


        axios.post(
            `${API_URL}/users/${userId}/delete`, { password }, { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((res) => {
            console.log(res.data);
            setSuccessMessage(res.data.message);
            if (res.data.confirm) {
                setTimeout(() => {
                    logOutUser();
                }, 2000);
            }
        })
        .catch((err) => {
            setErrorMessage(err.response.data.errorMessage);
        });


	};


	return (
		<div id='main-content' className='px-3 pt-3 pb-20 bg-slate-300'>
			<h1>Delete User?</h1>

			<FormControl className='flex flex-col w-50 mx-auto gap-y-2'>
				<TextField
					id='password'
					label='Password'
					type='password'
					autoComplete='current-password'
					onChange={handleChange}
					value={password}
					required
				/>

				<Button type='submit' onClick={deleteUser}>
					Delete User
				</Button>
			</FormControl>

			{errorMessage ? (
				<p className='error-message'>{errorMessage}</p>
			) : (
				<p className='success-message'>{successMessage}</p>
			)}
		</div>
	);
};

export default DeleteUserPage;
