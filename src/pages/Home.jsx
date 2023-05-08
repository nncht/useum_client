// import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CollectionCard from "../components/Collections/CollectionCard";
import axios from "axios";

const Home = () => {
  const [collections, setCollections] = useState({ collections: [] });
  const API_URL = "http://localhost:5005";
  // const { user } = useContext(AuthContext);


  useEffect(() => {
    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        const sortedCollections = res.data.collections.sort((a, b) => b.likes.length - a.likes.length);
        setCollections({ collections: sortedCollections });
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section id="main-content" className="p-3 bg-slate-300">
      <div>
        <p className="text-2xl text-slate-600">Welcome back, my dear Friend {/*user.username*/ /*I broke this, please help me fix it*/}</p>
      </div>
      <div>
        <h4 className="text-2xl text-slate-600">Collections</h4>
        <Grid container spacing={3}>
          {/* Available collections of all users will be rendered as cards here */}
          {collections.collections.length < 3 ? (
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

    </section>

  );
};



export default Home;
