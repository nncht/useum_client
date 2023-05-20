import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";

// Custom components

import SectionHeader from "../components/UI/SectionHeader";
import API_URL from "../services/apiConfig";

// MUI imports
import { Button, Typography } from "@mui/material";
import PopularCollections from "../components/Collections/PopularCollections";
import RecommendedCollections from "../components/Collections/RecommendedCollections";
import TrendingItems from "../components/Items/TrendingItems";
import RecommendedItems from "../components/Items/RecommendedItems";

// --- End of imports

const Home = () => {

  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {/* Popular Collections */}
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Popular Collections" />
          <PopularCollections />
        </div>
      </section>
      {/* Popular Items - still need to change content here @Lukas */}
      <section id="main-content" className="bg-slate-200">
        <div id="main-section" className="p-4">
          <SectionHeader title="Recommended Collections" />
          <RecommendedCollections />
        </div>
      </section>
      {/* Trending Items - still need to change content here @Lukas */}
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Trending Items" />
          <TrendingItems />
        </div>
      </section>
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Recommended Items" />
          <RecommendedItems />
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
