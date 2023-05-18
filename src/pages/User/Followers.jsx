import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../context/auth.context'
import { UserDataContext } from "../../context/userData.context";
import { Link } from "react-router-dom";

import axios from 'axios'
import API_URL from '../../services/apiConfig'
import { Grid } from '@mui/material'



const Followers = () => {

    const { user } = useContext(AuthContext);
    const { userData } = useContext(UserDataContext);

    //"otherUser" is the user whose profile we are viewing
    const [otherUser, setOtherUser] = useState(null);


        useEffect(() => {
        if (userData) {
            axios
            .get(`${API_URL}/users/${userData.username}`)
            .then((res) => {
                setOtherUser(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        }
        }, [userData]);



    if(otherUser) {

  return (

    <>
        <h2>These are {otherUser.username}s followers:</h2>
                <Grid container spacing={2}>
        {otherUser.followers.map((follower) => {
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={follower._id}>
                <div key={follower._id}>
                    <img src={follower.imageUrl} alt={follower.username} />
                    <Link to={`/users/${follower.username}`}>
                    <p>{follower.username}</p>
                    </Link>
                </div>
                </Grid>

            )
        })}
        </Grid>

    </>

    )
    }
}

export default Followers