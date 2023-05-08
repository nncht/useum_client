// src/components/IsPrivate.js

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function IsPrivate({ children }) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) return <p>Loading ...</p>;

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}
	return children;
}

export default IsPrivate;
