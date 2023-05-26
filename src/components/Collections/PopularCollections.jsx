import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../services/apiConfig";
import AllCollections from "./AllCollections";

const PopularCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        const sortedCollections = res.data.collections
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(0, 8);
        setCollections(sortedCollections);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {/* Render the collections using the AllCollections component */}
      <AllCollections collections={{ collections: collections }} />
    </div>
  );
};

export default PopularCollections;
