// Custom components

// MUI components
import { Box, Link, Typography } from "@mui/material/";

// --- End of imports

const CollectionInfo = ({ user, collection }) => {
  return (
    <Box className="grid grid-auto-rows bg-slate-800 px-4 h-30 py-2">
      <Typography variant="h4" className="text-light text-2xl mt-2">
        {collection.name}
      </Typography>
      <Typography variant="overline" className="text-light">
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
      </Typography>

      <Typography variant="body" className="text-light my-2">
        {collection.description}{" "}
      </Typography>

      {/* CATEGORIES */}
      <div className="my-2">
        {collection.categories.map((tag) => {
          return (
            <Typography
              key={tag._id}
              variant="caption"
              className="inline-block bg-slate-500 text-white text-xs px-2 py-1 rounded"
            >
              {tag.category}
            </Typography>
          );
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
