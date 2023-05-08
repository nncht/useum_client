import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import getCollection from "../../services/getCollection";
import CollectionHeader from "../../components/Collections/CollectionHeader";

const API_URL = "http://localhost:5005";

const MyCollection = () => {
  const [collection, setCollection] = useState(null);
  const { collectionId } = useParams();

  useEffect(() => {
    getCollection(collectionId, setCollection);
  }, []);

  // COLLECTION DETAILS RENDER
  return (
    <>
      {collection && (
        <div id="main-content" className="bg-slate-300">
          <CollectionHeader collection={collection} />
          <section className="p-3 pb-10">
            {/* Collection name and description */}
            <div>
              <h4 className="text-2xl text-slate-600">{collection.name}</h4>
              <p>{collection.description}</p>
            </div>

            {/* Items */}
            <div>
              {/* Map over items here - I'll style this later so it's okay to only map over item names for now */}
            </div>

            {/* Add new item buttone */}
            <Link to="/create-item" className="m-2">
              <Button variant="contained">Add new item</Button>
            </Link>
            {/* Edot collection buttone */}
            <Link to={`/edit-collection/${collection._id}`}>
              <Button>Edit Collection</Button>
            </Link>
          </section>
        </div>
      )}
    </>
  );
};

export default MyCollection;
