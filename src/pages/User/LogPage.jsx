import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import API_URL from "../../services/apiConfig";

// Custom components
import ItemCard from "../../components/Items/ItemCard";
import CollectionCard from "../../components/Collections/CollectionCard";

// MUI components
import { Grid } from "@mui/material";
import SectionHeader from "../../components/UI/SectionHeader";


const LogPage = () => {


    const { user } = useContext(AuthContext);

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        if (user) {
          axios
            .get(`${API_URL}/users/${user.username}`)
            .then((res) => {
              setCurrentUser(res.data);

            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [user]);


      let items;
      let collections;

      if (currentUser) {
        items = currentUser.items.map((item) => {
            return item;
        })
        collections = currentUser.collections.map((collection) => {
            return collection;

        } )
        }




  if(items && collections){return (
		<>
			<section id='main-content' className='bg-slate-100'>
				<div id='main-section' className='p-4'>
					<SectionHeader title='Event Log' />
					<div>
                    <h3 className="text-xl text-slate-600">Items</h3>

						{items && items.length < 1 ? (
							<p>You have not created any items.</p>
						) : (
							<div>
								{items.reverse().map((item) => {
									const createdAtDate = new Date(item.createdAt);
									const formattedDate = createdAtDate.toLocaleDateString('en-DE', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									});

									return (
										<div key={item._id}>
											<p>
												{' '}
												You have created
												<Link to={`/items/${item._id}`}> {item.name} </Link>
												at {formattedDate}
											</p>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</section>
            <section id='main-content' className='bg-slate-100'>
				<div id='main-section' className='px-4'>
					<div>
                    <h3 className="text-xl text-slate-600">Collections</h3>

						{collections && collections.length < 1 ? (
							<p>You have not created any collections.</p>
						) : (
							<div>
								{collections.reverse().map((collection) => {
									const createdAtDate = new Date(collection.createdAt);
									const formattedDate = createdAtDate.toLocaleDateString('en-DE', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									});

									return (
										<div key={collection._id}>
											<p>
												{' '}
												You have created
												<Link to={`/collections/${collection._id}`}> {collection.name} </Link>
												at {formattedDate}
											</p>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</section>

		</>
	);}
}

export default LogPage