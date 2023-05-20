// Custom components
import BookmarkButton from "../Bookmarks/BookmarkButton";

// MUI components
import { Box, Link, Button } from "@mui/material/";

// --- End of imports

const CollectionInfo = ({ user, collection }) => {
  return (
    <Box className="grid grid-auto-rows bg-slate-700 px-4 h-30 py-2">
      {/* Edit Collection OR Bookmark button */}
      {/* <div className="text-right my-3">
        {user.username === collection.createdBy.username ? (
          <Button
            variant="contained"
            href={`/edit-collection/${collection._id}`}
          >
            Edit Collection
          </Button>
        ) : (
          <div>
            <BookmarkButton id={collection._id} />
          </div>
        )}
      </div> */}
      {/* ------------------------------------------- */}

      <div>
        <div className="flex mt-2">
          <div className="text-light">
            by{" "}
            <Link
              href={`/users/${collection.createdBy.username}`}
              sx={{
                color: "white",
                "&:hover": {
                  color: "#ccc",
                },
              }}
            >
              {collection.createdBy.username}
            </Link>
          </div>
        </div>

        {/* Statistics (Followers, Collections, Items) */}
        {/* <div className="my-2">{userData && <UserStatistics />}</div> */}

        {/* UserBio */}
        {/* <p className="text-white text-lg">{userData.userbio}</p> */}

        {/* Display user's category/interests tags */}
        <div className="flex">
          {/* <div className="mr-3">{userData && <CategoryTags />}</div> */}
        </div>
      </div>
    </Box>
  );
};

export default CollectionInfo;
