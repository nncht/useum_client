import React, { useState, useEffect } from "react";
import axios from "axios";
import AllItems from "./AllItems";
import API_URL from "../../services/apiConfig";

const TrendingItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/items`)
      .then((res) => {
        const trendingItems = res.data.items
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(0, 4);
        setItems(trendingItems);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <AllItems items={items} />;
};

export default TrendingItems;