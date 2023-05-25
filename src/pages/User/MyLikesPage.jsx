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

const MyLikesPage = () => {
  const { userId } = useParams();
  const [collectionLikes, setCollectionLikes] = useState([]);
  const [itemLikes, setItemLikes] = useState([]);

  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  console.log(userId);

  useEffect(() => {
    axios
      .get(`${API_URL}/likes/${userId}`,
      {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
      .then((res) => {
        console.log(res.data.itemLikes);
        setItemLikes(res.data.itemLikes);
        setCollectionLikes(res.data.collectionLikes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="My Likes" />
          <div>
            <h3 className="text-xl text-slate-600">Items</h3>
            {itemLikes.length < 1 ? (
              <div id="main-section">You have not liked any items.</div>
            ) : (
              <Grid container spacing={3}>
                {itemLikes.map((item) => {
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
          {collectionLikes.length < 1 ? (
            <div id="main-section">You haven't liked any collections.</div>
          ) : (
            <Grid container spacing={3}>
              {collectionLikes.map((collection) => {
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

export default MyLikesPage;
