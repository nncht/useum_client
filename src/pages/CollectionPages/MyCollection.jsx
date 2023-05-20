import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// Custom components
import { AuthContext } from "../../context/auth.context";
import getCollection from "../../services/getCollection";
import CollectionHeader from "../../components/Collections/CollectionHeader";
import ItemCard from "../../components/Items/ItemCard";
import BookmarkButton from "../../components/Bookmarks/BookmarkButton";

// MUI imports
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import SectionHeader from "../../components/UI/SectionHeader";

// ---End of imports

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
        <div id="main-content" className="justify-center">
          <div id="main-section" className="my-4 shadow-md bg-slate-100">
            {/* COLLECTION HEADER */}
            <CollectionHeader collection={collection} />

            <section className="px-4 pt-3">
              {/*  COLLECTION NAME */}
              <SectionHeader title={collection.name} />

              {/* CATEGORIES */}
              <div>
                {collection.categories.map((tag) => {
                  return <p key={tag._id}>{tag.category}</p>;
                })}
              </div>

              {/* COLLECTION DESCRIPTION */}
              <div>
                Created by{" "}
                <Link to={`/users/${collection.createdBy.username}`}>
                  {collection.createdBy.username}
                </Link>
              </div>

              <div className="pt-2 pb-4">{collection.description}</div>

              {/* Like button */}

              {user.username === collection.createdBy.username ? (
                <div></div>
              ) : (
                <div className="py-4">
                  <BookmarkButton id={collection._id} />
                </div>
              )}

              {/* Items */}
              <Grid container spacing={3} className="pb-10">
                {collection.items.map((item) => {
                  return (
                    <>
                      <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
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
        </div>
      </>
    );
  }
};

export default MyCollection;
