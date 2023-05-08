/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const API_URL = "http://localhost:5005";

const MyCollection = () => {
  const [collection, setCollection] = useState(null);
  const { collectionId } = useParams();

  const getCollection = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/collections/${collectionId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCollection(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCollection();
  }, []);

  // COLLECTION DETAILS RENDER
  return (
    <>
      {collection && (
        <section className="p-3">
          <h4 className="text-2xl text-slate-600">{collection.name}</h4>
          <p>{collection.description}</p>
          <img src={collection.imageUrl} alt="collection" />
          <Link to="/create-item" className="m-2">
            <Button variant="contained">Add new item</Button>
          </Link>
        </section>
      )}
    </>
  );
};

export default MyCollection;
