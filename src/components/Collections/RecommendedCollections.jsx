import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import API_URL from "../../services/apiConfig";
import AllCollections from "./AllCollections";
import { UserDataContext } from "../../context/userData.context";

import { AuthContext } from "../../context/auth.context";

const RecommendedCollections = () => {

    const [collections, setCollections] = useState([]);
    const { userData, setUserData } = useContext(UserDataContext);
    const { user, isLoggedIn } = useContext(AuthContext);
    // const username = user.name;






    useEffect(() => {

    if(user){
        const fetchData = async () => {
        const response = await axios.get(`${API_URL}/users/${user.username}`);
        setUserData([...response.data.categories]);
      };
      
      fetchData();
}
    }, [user]);



    useEffect(() => {
        if(userData){
        axios
          .get(`${API_URL}/collections`)
          .then((res) => {
            let filteredCollections = res.data.collections;
            
            console.log(userData);
    
            
         
            const userCategoryIds = userData.map((category) => category.toString()); // Convert ObjectIDs to strings
            console.log(userCategoryIds)
            
            const thisCollections = filteredCollections.filter((collection) =>
              collection.categories.some((category) =>
                userCategoryIds.includes(category._id.toString())
              )
            );

            console.log(thisCollections);
            
            /*
            const sortedCollections = thisCollections
              .sort((a, b) => b.likes.length - a.likes.length)
              .slice(0, 4);
            */

            setCollections(thisCollections);
            
          })
          .catch((err) => {
            console.error(err);
          });}
      }, [userData, user]);



    return (
        <div>
          {/* Render the collections using the AllCollections component */}
          <AllCollections collections={{ collections: collections }} />
        </div>
      );
      
}

export default RecommendedCollections;
