import { Grid } from "@mui/material";
import ItemCard from "./ItemCard";
import { MoonLoader } from "react-spinners";

const AllItems = ({ items, user }) => {
  const isLoading = items.length === 0;

  return (
    <div>
      <Grid container spacing={3}>
        {/* Available items will be rendered as cards here */}
        {isLoading ? (
          <div id="main-section" className="mt-4">
            <MoonLoader color="#1976D2" size={30} />
          </div>
        ) : items.length > 0 ? (
          items.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <ItemCard key={item._id} item={item} />
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

export default AllItems;
