import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import API_URL from "../../services/apiConfig";
import AllItems from "./AllItems";
import { UserDataContext } from "../../context/userData.context";
import { AuthContext } from "../../context/auth.context";

const RecommendedItems = () => {

    const [items, setItems] = useState([]);
    const { userData, setUserData } = useContext(UserDataContext);
    const { user, isLoggedIn } = useContext(AuthContext);
    // const username = user.name;


    
    useEffect(() => {

      if(user){
          const fetchData = async () => {
          const response = await axios.get(`${API_URL}/users/${user.username}`);
          console.log("*")
          console.log(response.data.categories)
          setUserData([...response.data.categories]);
        };
        
        fetchData();
      }
    }, [user]);
    
    const checkEmptyObj = (obj) => {
      console.log(Object.keys(obj).length === 0)
      return Object.keys(obj).length === 0
    }

    useEffect(() => {
      
        // change later useState of object to null instead of {}
        if(!checkEmptyObj(userData)){
        axios
          .get(`${API_URL}/items`)
          .then((res) => {
            let filteredItems = res.data.items;
            console.log(filteredItems);
            
            const userCategoryIds = userData.map((category) => {
              console.log(category._id);
              
               return category._id
            }); // Convert ObjectIDs to strings
            
            console.log(userCategoryIds);
            const thisItems = filteredItems.filter((item) => {
            for (let i = 0; i < item.categories.length; i++)
              {
                const categoryItem = item.categories[i];
                console.log(categoryItem);
                for (let j = 0; j < userCategoryIds.length; j++){                
                  if ( userCategoryIds[j] === categoryItem._id) return true
                }
              }
            });
 
            console.log(thisItems);

            const sortedItems = thisItems
              .sort((a, b) => b.likes.length - a.likes.length)
              .slice(0, 4);
            
              console.log(sortedItems);
            setItems(sortedItems);
            
          })
          .catch((err) => {
            console.error(err);
          });}
      }, [userData]);



    return (
        <div>
          {/* Render the Items using the AllItems component */}
          <AllItems items={items} />
        </div>
      );
      
}

export default RecommendedItems;
