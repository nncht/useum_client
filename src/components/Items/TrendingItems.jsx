import React, { useState, useEffect } from "react";
import axios from "axios";
import AllItems from "./AllItems";
import API_URL from "../../services/apiConfig";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

const TrendingItems = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const fetchItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    setLoading(true);

    axios
      .get(`${API_URL}/items`)
      .then((res) => {
        const trendingItems = res.data.items
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(startIndex, startIndex + itemsPerPage);
        setItems(trendingItems);
        setAmountOfPages(Math.ceil(res.data.items.length / itemsPerPage));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  console.log(items);

  return (
    <div>
      {loading ? (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Skeleton
                variant="rounded"
                height={280}
                animation="wave"
                sx={{ width: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <AllItems items={items} />
      )}

      <div className="mt-4 pt-3 flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={amountOfPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default TrendingItems;
