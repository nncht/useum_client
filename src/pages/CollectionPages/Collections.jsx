import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Collections = () => {
  const [collections, setCollections] = useState([]);

  const refreshCollections = () => {
    axios.get("http://localhost:5005/collections").then((res) => {
      const allCollections = [...res.data.collections];
      setCollections(allCollections);
    });
  };

  useEffect(() => {
    refreshCollections();
  }, []);

  return (
    <>
      <h2>Collections List</h2>
      <h2 className="text-danger">
        This page is redundant, because collections should be shown on the user
        profie.

        <br />
        <br />

        (Johannes) Actually, this pages shows ALL collections regardless of who made them - so it could be a "browse all collections while seeing them" page.
      </h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection._id}>
            <Link to="/">{collection.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Collections;
