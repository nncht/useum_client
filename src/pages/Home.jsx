import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";

// Custom components
import AllCollections from "../components/Collections/AllCollections";
import SectionHeader from "../components/UI/SectionHeader";

// MUI imports
import { Button, Typography } from "@mui/material";

// --- End of imports

const Home = () => {
  const [collections, setCollections] = useState({ collections: [] });
  const API_URL = "http://localhost:5005";
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        const sortedCollections = res.data.collections
          .sort((a, b) => b.likes.length - a.likes.length) // Sort by popular collections
          .slice(0, 4); // limit to 4 collections, for dev phase while Lukas is still working on his home page logic
        setCollections({ collections: sortedCollections });
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {/* Popular Collections */}
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Popular Collections" />
          <AllCollections collections={collections} />
        </div>
      </section>
      {/* Popular Items - still need to change content here @Lukas */}
      <section id="main-content" className="bg-slate-200">
        <div id="main-section" className="p-4">
          <SectionHeader title="Popular Items" />
          <AllCollections collections={collections} />
        </div>
      </section>
      {/* Trending Items - still need to change content here @Lukas */}
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Trending Items" />
          <AllCollections collections={collections} />
        </div>
      </section>
      {!isLoggedIn ? (
        <section id="main-content" className="bg-slate-200">
          <div id="main-section" className="p-4">
            <div className="grid place-content-center gap-3">
              <Typography variant="h6">Showcase your own setups</Typography>
              <Button variant="contained">Sign Up</Button>
              <Button variant="outlined">Log In</Button>
            </div>
          </div>
        </section>
      ) : (
        <section id="main-content" className="bg-slate-100">
          <div id="main-section" className="p-4">
            Stuff that only logged in users should see
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
