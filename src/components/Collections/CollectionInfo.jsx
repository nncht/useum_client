import Button from "@mui/material/Button";
import BookmarkButton from "../Bookmarks/BookmarkButton";

const CollectionInfo = ({ user, collection }) => {
  return (
    <div className="grid grid-auto-rows bg-slate-700 px-4 h-30 py-2">
      {/* Follow, Unfollow, Edit Profile buttons */}
      <div className="text-right my-3">
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
      </div>

      <div>
        <div className="flex mt-2">
          <h2 className="mr-4 self-end text-3xl text-white m-0">
            {user.username}
          </h2>
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
    </div>
  );
};

export default CollectionInfo;
