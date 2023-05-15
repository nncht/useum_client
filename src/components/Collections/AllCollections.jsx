import { Grid } from "@mui/material";
import CollectionCard from "./CollectionCard";

const AllCollections = ({ collections }) => {
  return (
    <div className="bg-slate-300">
      <h4 className="text-2xl text-slate-600">All Collections</h4>
      <Grid container spacing={3}>
        {/* Available collections of all users will be rendered as cards here */}
        {collections.collections.length < 1 ? (
          <p>No collections available</p>
        ) : (
          collections.collections.map((collection) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                <CollectionCard key={collection._id} collection={collection} />
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default AllCollections;
