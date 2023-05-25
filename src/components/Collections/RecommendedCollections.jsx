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

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const response = await axios.get(`${API_URL}/users/${user.username}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        console.log("*");
        console.log(response.data.categories);
        setUserData([...response.data.categories]);
      };

      fetchData();
    }
  }, [user]);

  const checkEmptyObj = (obj) => {
    console.log(Object.keys(obj).length === 0);
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    // change later useState of object to null instead of {}
    if (!checkEmptyObj(userData)) {
      axios
        .get(`${API_URL}/collections`)
        .then((res) => {
          let filteredCollections = res.data.collections;

          const userCategoryIds = userData.map((category) => {
            console.log(category);
            return category._id;
          }); // Convert ObjectIDs to strings

          const thisCollections = filteredCollections.filter((collection) => {
            for (let i = 0; i < collection.categories.length; i++) {
              const categoryCollection = collection.categories[i];
              for (let j = 0; j < userCategoryIds.length; j++) {
                if (userCategoryIds[j] === categoryCollection) return true;
              }
            }
          });

          const sortedCollections = thisCollections
            .sort((a, b) => b.likes.length - a.likes.length)
            .slice(0, 4);

          setCollections(sortedCollections);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userData]);

  return (
    <div>
      {/* Render the collections using the AllCollections component */}
      <AllCollections
        collections={{ collections: collections }}
        user={{ user }}
      />
    </div>
  );
};

export default RecommendedCollections;
