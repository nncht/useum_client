import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API_URL from "../../services/apiConfig";
import { AuthContext } from "../../context/auth.context";
import { setCollectionId } from "../../services/sharedDatastore";
import { getCollectionId } from "../../services/sharedDatastore";

// Custom components
import AddItemToCollection from "../../components/Items/AddItemToCollection";
import BookmarkButton from "../../components/Bookmarks/BookmarkButton";

// MUI imports
import Button from "@mui/material/Button";

// --- End of imports

const MyItem = () => {
  const { itemId } = useParams();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState({});
  const [comments, setComments] = useState("");
  const collectionId = getCollectionId();

  useEffect(() => {
    axios
      .get(`${API_URL}/items/${itemId}`)
      .then((response) => {
        setItem(response.data.item);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);

  console.log(comments);

  return (
    <>
      {/* Displays the item details */}

      {item && (
        <div id="main-content">
          <div id="main-section" className="justify-center p-4">
            <div className="p-4 bg-slate-50 rounded-md">
              <h4 className="text-2xl text-slate-600">{item.name}</h4>

              <div className="py-4">
                <img src={item.imageUrl} width={400} alt="an item" />
              </div>
              {/* Automatic description with OpenAI API */}
              <p>{item.description}</p>

              {item.categories && (
                <div>
                  <h6 className="text-md text-slate-600">Categories</h6>
                  {item.categories.map((tag) => {
                    return <p key={tag._id}>{tag.category}</p>;
                  })}
                </div>
              )}

              {/* If there are comments, displays the comments for the item */}

              {comments && (
                <div>
                  {comments.map((comment) => {
                    return (
                      <div key={comment._id}>
                        <h6>
                          <Link to={`/users/${comment.user.username}`}>
                            {comment.user.username}
                          </Link>{" "}
                          says:
                        </h6>
                        <p>{comment.title}</p>
                        <p>{comment.body}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Like button */}

              <div className="flex flex-row gap-4 py-10">
                <div>
                  <Button
                    variant="outlined"
                    to={`/edit-item/${item._id}`}
                    onClick={() => setCollectionId(collectionId)}
                  >
                    Edit Item
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    to={`/edit-item/${item._id}`}
                    onClick={() => setCollectionId(collectionId)}
                  >
                    Like
                  </Button>
                </div>
                <div>
                  <BookmarkButton id={item._id} />
                </div>
              </div>

              <AddItemToCollection itemId={item._id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyItem;
