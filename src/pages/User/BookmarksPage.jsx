import axios from "axios";
import API_URL from "../../services/apiConfig";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Custom components
import ItemCard from "../../components/Items/ItemCard";
import CollectionCard from "../../components/Collections/CollectionCard";

// MUI components
import { Grid } from "@mui/material";
import SectionHeader from "../../components/UI/SectionHeader";

// --- End of imports

const BookmarksPage = () => {
  const { userId } = useParams();
  const [collectionBookmarks, setCollectionBookmarks] = useState([]);
  const [itemBookmarks, setItemBookmarks] = useState([]);

  const navigate = useNavigate();

  console.log(userId);

  useEffect(() => {
    axios
      .get(`${API_URL}/bookmarks/${userId}`)
      .then((res) => {
        console.log(res.data.itemBookmarks);
        setItemBookmarks(res.data.itemBookmarks);
        setCollectionBookmarks(res.data.collectionBookmarks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Bookmarks" />
          <div>
            <h3 className="text-xl text-slate-600">Items</h3>
            {itemBookmarks.length < 1 ? (
              <div id="main-section">You've not bookmarked any items.</div>
            ) : (
              <Grid container spacing={3}>
                {itemBookmarks.map((item) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                      <ItemCard key={item._id} item={item} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </div>
        </div>
      </section>
      <section id="main-content" className="bg-slate-200">
        <div id="main-section" className="p-4">
          <h3 className="text-xl text-slate-600">Collections</h3>
          {collectionBookmarks.length < 1 ? (
            <div id="main-section">You've not bookmarked any items.</div>
          ) : (
            <Grid container spacing={3}>
              {collectionBookmarks.map((collection) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                    <CollectionCard
                      key={collection._id}
                      collection={collection}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </div>
      </section>
    </>
  );
};

export default BookmarksPage;
