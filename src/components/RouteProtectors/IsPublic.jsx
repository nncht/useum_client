
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function IsPublic({ children }) {
        const { isLoggedIn, isLoading } = useContext(AuthContext);

        if (isLoading) return <p>Loading ...</p>;

        if (isLoggedIn) {
                return <Navigate to="/" />;
        }
        return children;
}

export default IsPublic;
