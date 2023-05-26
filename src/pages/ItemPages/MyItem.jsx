import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../services/apiConfig";
import { AuthContext } from "../../context/auth.context";
import { setCollectionId } from "../../services/sharedDatastore";
import getCollection from "../../services/getCollection";

// Custom components
import AddItemToCollection from "../../components/Items/AddItemToCollection";
import BookmarkButton from "../../components/Bookmarks/BookmarkButton";
import LikeButton from "../../components/Likes/LikeButton";

// MUI imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";

// --- End of imports

const storedToken = localStorage.getItem("authToken");

const MyItem = () => {
  const { itemId } = useParams();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState({});
  const [comments, setComments] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const collectionId = getCollection();

  useEffect(() => {
    axios
      .get(`${API_URL}/items/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setItem(response.data.item);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/users/${user.username}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  // const itemCollections = item.collections;

  let itemCollectionIds;

  if (item && item.collections) {
    itemCollectionIds = [...item.collections].map((collection) => {
      return collection._id;
    });
  }

  console.log(itemCollectionIds);

  let userCollectionIds;

  if (currentUser) {
    userCollectionIds = [...currentUser.collections].map((collection) => {
      return collection._id;
    });
  }

  //this collects ALL of the item IDs from ALL of the user's collections
  let userCollectionsItemIdArray;

  if (currentUser) {
    userCollectionsItemIdArray = [...currentUser.collections].map(
      (collection) => {
        return collection.items;
      }
    );
  }

  if (
    currentUser &&
    currentUser._id &&
    itemCollectionIds &&
    userCollectionsItemIdArray
  ) {
    return (
      <>
        {/* Displays the item details */}

        {item && (
          <div id="main-content">
            <div id="main-section" className="justify-center p-4">
              <Box
                sx={{ flexGrow: 1 }}
                className="p-4 bg-slate-50 rounded-md shadow-md"
              >
                <h4 className="text-2xl text-slate-600 mb-4">{item.name}</h4>

                <Grid container spacing={3}>
                  {/* ITEM PICTURE */}
                  <Grid item md={7} xs={12}>
                    <CardMedia
                      image={item.imageUrl}
                      sx={{ height: 480 }}
                      className="rounded shadow-md"
                    />
                  </Grid>

                  {/* ITEM DETAILS */}
                  <Grid item md={5} xs={12}>
                    <Grid xs={12}>
                      {/* BUTTON GROUP */}
                      {/* Edit button */}
                      <div className="flex flex-row gap-4 pb-2 justify-end">
                        {itemCollectionIds.some((id) =>
                          userCollectionIds.includes(id)
                        ) ? (
                          <Button
                            variant="outlined"
                            href={`/edit-item/${item._id}`}
                            onClick={() => setCollectionId(collectionId)}
                          >
                            Edit
                          </Button>
                        ) : null}

                        {/* Like button */}
                        <LikeButton id={itemId} isItem={true} />

                        {/* Bookmark button */}
                        <BookmarkButton id={item._id} />
                      </div>
                    </Grid>

                    <Grid xs={12}>
                      {/* ITEM CATEGORIES */}
                      {item.categories && (
                        <div className="mt-2 mb-4">
                          {item.categories.map((tag) => {
                            return (
                              <div
                                key={tag._id}
                                className="inline-block bg-slate-500 text-white text-xs px-2 pt-1 pb-2 rounded"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {tag.category}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </Grid>
                    {/* ITEM DESCRIPTION */}
                    <Grid xs={12} className="my-3">
                      {item.description}
                    </Grid>

                    {/* If this item is already in EVERY collection, you can't add it to another one */}
                    <Grid xs={12} className="my-3">
                      {userCollectionsItemIdArray.every((item) =>
                        item.includes(itemId)
                      ) ? (
                        <div></div>
                      ) : (
                        <AddItemToCollection itemId={item._id} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {/* If there are comments, displays the comments for the item */}
                {comments && (
                  <Grid container spacing={3} className="my-3">
                    {comments.map((comment) => {
                      return (
                        <>
                          <Grid item xs={12} key={comment._id}>
                            <h6>
                              <Link href={`/users/${comment.user.username}`}>
                                {comment.user.username}
                              </Link>{" "}
                              says:
                            </h6>
                            <p>{comment.title}</p>
                            <p>{comment.body}</p>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                )}
              </Box>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default MyItem;
