import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// Custom components
import { AuthContext } from "../../context/auth.context";
import getCollection from "../../services/getCollection";
import CollectionHeader from "../../components/Collections/CollectionHeader";
import ItemCard from "../../components/Items/ItemCard";
import BookmarkButton from "../../components/Bookmarks/BookmarkButton";
import LikeButton from "../../components/Likes/LikeButton";
import CollectionInfo from "../../components/Collections/CollectionInfo";
import CollectionFooter from "../../components/Collections/CollectionFooter";

// MUI imports
import { Button, Grid } from "@mui/material";

// ---End of imports

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [collection, setCollection] = useState(null);
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [loadingInProgress, setLoading] = useState(true);

  useEffect(() => {
    getCollection(collectionId, setCollection);
  }, [collectionId]);

  // COLLECTION DETAILS RENDER
  if (collection) {
    return (
      <>
        <div id="main-content" className="justify-center">
          <div id="main-section" className="my-4 shadow-md bg-slate-100">
            {/* --- COLLECTION HEADER ---------------------- */}
            <div className="relative">
              <CollectionHeader collection={collection} />
              {/* --------------------------------------------- */}
              <div className="absolute mt-[-76px] w-100 pr-6">
                {/* --- BOOKMARK/LIKE BUTTONS ----------------- */}
                <div className="text-right my-3">
                  {user.username === collection.createdBy.username ? (
                    <Button
                      variant="contained"
                      href={`/edit-collection/${collection._id}`}
                    >
                      Edit Collection
                    </Button>
                  ) : (
                    <div className="flex flex-row gap-3 justify-end">
                      <LikeButton id={collection._id} isItem={false} />
                      <BookmarkButton id={collection._id} />
                    </div>
                  )}
                </div>
                {/* --------------------------------------------- */}
              </div>
            </div>
            {/* --------------------------------------------- */}

            {/* --- ITEMS ----------------------------------- */}
            <CollectionInfo user={user} collection={collection} />
            <section className="px-4 pt-10">
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
              {/* --------------------------------------------- */}

              {/* --- ADD NEW ITEM BUTTON --------------------- */}
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
                </div>
              ) : (
                <div></div>
              )}
              {/* --------------------------------------------- */}
            </section>
            <CollectionFooter collection={collection} />
          </div>
        </div>
      </>
    );
  }
};

export default MyCollection;
