import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_URL from "../../services/apiConfig";
import axios from "axios";

import Button from '@mui/material/Button';

const BookmarkButton = ({id}) => {

    const { user } = useContext(AuthContext);



    console.log(id)



    const [currentUser, setCurrentUser] = useState(null);

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkList, setBookmarkList] = useState([]);

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

      //Check if User has already bookmarked this item/collection

        useEffect(() => {
            if (currentUser && currentUser.bookmarks.includes(id)) {
                setIsBookmarked(true);
            } else {
                setIsBookmarked(false);
            }
        }, [currentUser, id]);

        //Bookmark action

        const handleBookmark = async () => {
            try {
                const response = await axios.post(
                    `${API_URL}/${currentUser._id}/bookmark/${id}`
                );
                setIsBookmarked(true);
                setBookmarkList([...bookmarkList, id]);
                console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        //Unbookmark action

        const handleUnbookmark = async () => {
            try {
                const response = await axios.post(
                    `${API_URL}/${currentUser._id}/unbookmark/${id}`
                );
                setIsBookmarked(false);
                setBookmarkList(bookmarkList.filter((bookmark) => bookmark !== id));
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };



  return (
    <div>
              {isBookmarked ? (
                <Button
                  key={Date.now()} // This magically forces the component to refresh
                  variant="contained"
                  className="unbookmark-btn"
                  onMouseOver={() => {
                    document.querySelector(".unbookmark-btn").textContent =
                      "Unbookmark";
                  }}
                  onMouseOut={() => {
                    document.querySelector(".unbookmark-btn").textContent =
                      "Bookmarked";
                  }}
                  onClick={handleUnbookmark}
                >
                  Bookmarked
                </Button>
              ) : (
                <Button
                  key={Date.now()} // This magically forces the component to refresh
                  variant="contained"
                  onClick={handleBookmark}
                >
                  Bookmark
                </Button>
              )}
            </div>
  )
}

export default BookmarkButton