import { Grid } from "@mui/material";
import ItemCard from "./ItemCard";
import { MoonLoader } from "react-spinners";

const AllItems = ({ items, user }) => {
  return (
    <div>
      <Grid container spacing={3}>
        {/* Available items will be rendered as cards here */}
        {items.length < 1 ? (
          <div id="main-section" className="mt-4">
            <MoonLoader color="#1976D2" size={30} />
          </div>
        ) : (
          items.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <ItemCard key={item._id} item={item} />
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default AllItems;
