import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { setCollectionId } from "../../services/sharedDatastore";
import { AuthContext } from "../../context/auth.context";
import getCollection from "../../services/getCollection";
import CollectionHeader from "../../components/Collections/CollectionHeader";
import ItemCard from "../../components/Items/ItemCard";
import API_URL from "../../services/apiConfig";
import BookmarkButton from "../../components/Bookmarks/BookmarkButton";

// MUI imports
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

// End of imports

const MyCollection = () => {
  const { user } = useContext(AuthContext);

  const [collection, setCollection] = useState(null);
  const { collectionId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCollection(collectionId, setCollection);
  }, [collectionId]);

  // COLLECTION DETAILS RENDER
  if (collection) {
    return (
      <>
        <div id="main-content" className="bg-slate-300">
          <CollectionHeader collection={collection} />
          <section className="px-4 pt-3 pb-20 bg-slate-300">
            {/* Collection name and description */}
            <div className="mb-4">
              <h4 className="text-2xl text-slate-600">{collection.name}</h4>
              <div>
                Created by{" "}
                <Link to={`/users/${collection.createdBy.username}`}>
                  {collection.createdBy.username}
                </Link>
              </div>

              <div>{collection.description}</div>
            </div>
            <div>
              <h4 className="text-2xl text-slate-600">Tags</h4>
              {collection.categories.map((tag) => {
                return <p key={tag._id}>{tag.category}</p>;
              })}
            </div>

            {/* Like button */}

            {user.username === collection.createdBy.username ? (
              <div></div>
            ) : (
              <div>
                <BookmarkButton id={collection._id} />
              </div>
            )}

            {/* Items */}
            <Grid container spacing={3}>
              {collection.items.map((item) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <ItemCard
                        item={item}
                        key={item._id}
                        currentCollection={collection._id}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
            {/* Add new item buttone */}

            {user.username === collection.createdBy.username ? (
              <div className="py-4">
                <Button
                  variant="contained"
                  className="m-2"
                  onClick={() =>
                    navigate(`/add-item?collectionId=${collection._id}`)
                  }
                >
                  Add item
                </Button>

                {/* Edot collection buttone */}
                <Link to={`/edit-collection/${collection._id}`}>
                  <Button>Edit Collection</Button>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </section>
        </div>
      </>
    );
  }
};

export default MyCollection;
