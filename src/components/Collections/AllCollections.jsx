import { Grid } from "@mui/material";
import CollectionCard from "./CollectionCard";
import { MoonLoader } from "react-spinners";

const AllCollections = ({ collections }) => {
  const isLoading = collections.collections.length === 0;

  return (
    <div>
      <Grid container spacing={3}>
        {/* Available collections of all users will be rendered as cards here */}
        {isLoading ? (
          <div id="main-section" className="mt-4">
            <MoonLoader color="#1976D2" size={30} />
          </div>
        ) : collections.collections.length > 0 ? (
          collections.collections.map((collection) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                <CollectionCard key={collection._id} collection={collection} />
              </Grid>
            );
          })
        ) : (
          <div className="mt-4">
            <p>
              No results? Specify your interests in your user profile to receive
              recommendations.
            </p>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default AllCollections;
