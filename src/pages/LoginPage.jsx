// src/pages/LoginPage.js

import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	const { storeToken, verifyUser } = useContext(AuthContext);

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		const loginBody = { email, password };

		axios
			.post(`${API_URL}/login`, loginBody)
			.then((res) => {
				console.log('JWT token', res.data.authToken);

				storeToken(res.data.authToken);

				verifyUser();
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
                setErrorMessage(err.response.data.errorMessage);
			});
	};

	return (
		<div>
			<h1>Login</h1>

			<form onSubmit={handleLoginSubmit}>
				<label htmlFor='email'>Email:</label>
				<input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' />

				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					id='password'
				/>

				<button type='submit'>Login</button>
			</form>
			{errorMessage && <p className='error-message'>{errorMessage}</p>}

			<p>Don't have an account yet?</p>
			<Link to='/signup'> Sign Up</Link>
		</div>
	);
}

export default LoginPage;
