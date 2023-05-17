import { useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { AuthContext } from '../../context/auth.context';
import API_URL from "../../services/apiConfig";



const ChangePasswordPage = () => {
	const { userId } = useParams();

	const { user } = useContext(AuthContext);

	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'password') {
			setPassword(value);
		} else if (name === 'new-password') {
			setNewPassword(value);
		} else if (name === 'confirm-password') {
			setConfirmPassword(value);
		}
	};

	const submitPasswordChange = (e) => {
		e.preventDefault();

        const storedToken = localStorage.getItem('authToken');

		axios
			.put(
				`${API_URL}/users/${userId}/change-password`,
				{ password, newPassword, confirmPassword },
				{ headers: { Authorization: `Bearer ${storedToken}` } }
			)
			.then((res) => {
				console.log(res.data);
				setSuccessMessage(res.data.message);
				if (res.data.confirm) {
					setTimeout(() => {
						navigate(`/users/${user.username}`);
					}, 2000);
				}
			})
			.catch((err) => {
				setErrorMessage(err.response.data.errorMessage);
			});
	};

	const fixedInputClass =
		'rounded-md appearance-none relative block w-full p-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm';

	if (userId) {
		return (
			<div id='main-content' className='px-3 pt-3 pb-20 bg-slate-300'>
				<h1>Change Password?</h1>

				<FormControl className='flex flex-col w-50 mx-auto gap-y-2'>
					<label htmlFor='password'>Current Password</label>
					<input
						onChange={handleChange}
						value={password}
						className={fixedInputClass}
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						required
					/>

					<label htmlFor='new-password'>New Password</label>
					<input
						onChange={handleChange}
						value={newPassword}
						className={fixedInputClass}
						type='password'
						name='new-password'
						id='new-password'
						placeholder='New Password'
						required
					/>

					<label htmlFor='confirm-password'>Confirm New Password</label>
					<input
						onChange={handleChange}
						value={confirmPassword}
						className={fixedInputClass}
						type='password'
						name='confirm-password'
						id='confirm-password'
						placeholder='Confirm Password'
						required
					/>

					<Button type='submit' onClick={submitPasswordChange}>
						Change Password
					</Button>
				</FormControl>

				{errorMessage ? (
					<p className='error-message'>{errorMessage}</p>
				) : (
					<p className='success-message'>{successMessage}</p>
				)}
			</div>
		);
	}
};

export default ChangePasswordPage;
