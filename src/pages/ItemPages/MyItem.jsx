import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API_URL from "../../services/apiConfig";
import { AuthContext } from "../../context/auth.context";
import { setCollectionId } from "../../services/sharedDatastore";
import getCollection from "../../services/getCollection";

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
  const [currentUser, setCurrentUser] = useState(null);

  const collectionId = getCollection();


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

  useEffect(() => {
	if (user) {
		axios
			.get(`${API_URL}/users/${user.username}`)
			.then((res) => {
				setCurrentUser(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}
}, [user]);

console.log(item)

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


// console.log(item.collections)

// console.log(userCollectionIds.includes(collectionId))

if (currentUser && currentUser._id && itemCollectionIds){return (
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
				{itemCollectionIds.some((id) => userCollectionIds.includes(id)) ? (
                  <Button
                    variant="outlined"
                    href={`/edit-item/${item._id}`}
                    onClick={() => setCollectionId(collectionId)}
                  >
                    Edit Item
                  </Button>) : null}
                </div>

                <div>
                  <Button variant="contained">Like</Button>
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
  );}
};

export default MyItem;
