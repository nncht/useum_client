
import { AuthContext } from '../context/auth.context'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'




const ProfilePage = () => {

    const { user } = useContext(AuthContext)


  return (

    user && (


        <div>
            <h1>{user.username}'s Spielecke</h1>
            <img src={user.imageUrl} alt="A picture of you!" />

            <p>Email: {user.email}</p>

            <h3>My Collections:</h3>

            { !user.collections ? <p>You have no collections yet!</p> : user.collections.map((collection) => {
                return (
                    <div key={collection._id}>
                        <p>{collection.name}</p>
                    </div>
                )
            })}

            <h3>My interests:</h3>

            { !user.categories ? <p>You have no interests yet!</p> : user.categories.map((category) => {
                return (
                    <div key={category._id}>
                        <p>{category.name}</p>
                    </div>
                )
            })}


        </div>


    )


  )
}

export default ProfilePage