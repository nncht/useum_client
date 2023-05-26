import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../services/apiConfig";
import AllCollections from "./AllCollections";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

const PopularCollections = () => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchCollections();
  }, [currentPage]);

  const fetchCollections = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    setLoading(true);

    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        const sortedCollections = res.data.collections
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(startIndex, startIndex + itemsPerPage);
        setCollections(sortedCollections);
        setAmountOfPages(Math.ceil(res.data.collections.length / itemsPerPage));
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

  return (
    <div>
      {/* Render the collections using the AllCollections component or Skeleton */}
      {loading ? (
        // Skeleton component while loading

        <Grid container spacing={3}>
          {collections.map((collection) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
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
        // Render the actual collections
        <AllCollections collections={{ collections: collections }} />
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

export default PopularCollections;
