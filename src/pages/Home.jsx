import { AuthContext } from '../context/auth.context';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AllCollections from '../components/Collections/AllCollections';

const Home = () => {
	const [collections, setCollections] = useState({ collections: [] });
	const API_URL = 'http://localhost:5005';
	const { user, isLoggedIn } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get(`${API_URL}/collections`)
			.then((res) => {
				const sortedCollections = res.data.collections.sort((a, b) => b.likes.length - a.likes.length);
				setCollections({ collections: sortedCollections });
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<section id='main-content'>

    {/* This isLoggedIn serves the purpose of showing just all collections in the regular home screen, and to show additional content based on the user's settings on logged in screen*/}
			{!isLoggedIn ? (
				<div className='px-4 py-2 bg-slate-300'>
					<p className='text-2xl text-slate-600'>(You need to log in still!)</p>
				</div>
			) : (
				<div className='px-4 py-2 bg-slate-300'>
					<p className='text-2xl text-slate-600'>Welcome back, {user.username}</p>
          <p>Based on what you selected in your settings, you could see a bunch of stuff here!</p>
          <p>Examples include:</p>
          <ul>
            <li>Recommended collections based on your interests</li>
            <li>Recommended collections based on your friends' interests</li>
            <li>The newest items</li>
            <li>The most popular items</li>
            <li>Lukas' favorite Ravelist</li>
          </ul>
				</div>
			)}

			<div className='px-4 pb-20 bg-slate-300'>
				<AllCollections collections={collections} />
			</div>
		</section>
	);
};

export default Home;
