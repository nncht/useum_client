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
import { Avatar, Typography } from "@mui/material/";

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
            <div id="main-section" className="justify-center pt-4">
              <Box
                sx={{ flexGrow: 1 }}
                className="p-4 bg-slate-50 rounded-md shadow-md"
              >
                <h4 className="text-2xl text-slate-600 mb-4">{item.name}</h4>
                <Grid item xs={12}>
                  {/* ITEM CATEGORIES */}
                  {item.categories && (
                    <div className="mt-2 mb-4">
                      {item.categories.map((tag) => {
                        return (
                          <div
                            key={tag._id}
                            className="inline-block bg-slate-500 text-white text-xs mr-2 px-2 pt-1 pb-2 rounded"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {tag.category}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Grid>

                <Grid container spacing={3}>
                  {/* ITEM PICTURE */}
                  <Grid item md={7} xs={12}>
                    <CardMedia
                      image={item.imageUrl}
                      sx={{
                        height: "100%",
                        minHeight: 400,
                        objectFit: "cover",
                      }}
                      className="rounded shadow-md"
                    />
                  </Grid>

                  {/* ITEM DETAILS */}
                  <Grid item md={5} xs={12}>
                    <Grid item xs={12}>
                      {/* BUTTON GROUP */}
                      {/* Edit button */}
                      <div className="flex flex-row gap-4 pb-2 justify-center">
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

                    {/* ITEM DESCRIPTION */}
                    <Grid item xs={12} className="my-3">
                      {item.description}
                    </Grid>

                    {/* If this item is already in EVERY collection, you can't add it to another one */}
                    <Grid item xs={12} className="my-3">
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
                  <Grid container spacing={3} className="mt-3 mb-10">
                    {comments.map((comment) => {
                      return (
                        <>
                          <Grid item xs={12} key={comment._id}>
                            <div
                              className="flex flex-row gap-2 mb-2"
                              key={comment._id}
                            >
                              <div>
                                {" "}
                                <Avatar
                                  aria-label="Profile picture"
                                  alt={comment.user.username}
                                  src={comment?.user?.imageUrl}
                                  sx={{ width: 84, height: 84 }}
                                  className="mx-1"
                                />
                              </div>
                              <div>
                                <h6>
                                  <Link
                                    href={`/users/${comment.user.username}`}
                                    underline="none"
                                  >
                                    {comment.user.username}
                                  </Link>{" "}
                                  says
                                </h6>
                                <div className="rounded bg-slate-100 p-3 shadow-md">
                                  {comment.body}
                                </div>
                              </div>
                            </div>
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
