// Custom components

// MUI components
import { Box, Link, Typography } from "@mui/material/";

// --- End of imports

const CollectionInfo = ({ user, collection }) => {
  return (
    <Box className="grid grid-auto-rows bg-slate-700 px-4 h-30 py-2">
      <Typography variant="button" className="text-light">
        {collection.name}
      </Typography>
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

      <Typography variant="body" className="text-light">
        {collection.description}{" "}
      </Typography>
      {/* CATEGORIES */}
      <div>
        {collection.categories.map((tag) => {
          return <p key={tag._id}>{tag.category}</p>;
        })}
      </div>
      {/* Statistics (Followers, Collections, Items) */}
      {/* <div className="my-2">{userData && <UserStatistics />}</div> */}

      {/* Display user's category/interests tags */}
      <div className="flex">
        {/* <div className="mr-3">{userData && <CategoryTags />}</div> */}
      </div>
    </Box>
  );
};

export default CollectionInfo;
