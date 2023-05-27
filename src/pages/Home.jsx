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

      {!isLoggedIn ? (
        <section id="main-content" className="bg-slate-300">
          <div id="main-section" className="p-4">
            <div className="grid place-content-center gap-3">
              <Typography variant="h6">
                Showcase your own gear, setups, etc.
              </Typography>
              <Button href="/signup" variant="contained">
                Sign Up
              </Button>
              <Button href="/login" variant="outlined">
                Log In
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <div></div>
      )}

      <section id="main-content" className="bg-slate-200">
        <div id="main-section" className="p-4">
          <SectionHeader title="Trending Items" />
          <TrendingItems />
        </div>
      </section>

      {isLoggedIn ? (
        <section id="main-content" className="bg-slate-100">
          <div id="main-section" className="p-4">
            <SectionHeader title="Recommended Collections" />
            <RecommendedCollections />
          </div>
        </section>
      ) : (
        <div></div>
      )}

      {isLoggedIn ? (
        <section id="main-content" className="bg-slate-200">
          <div id="main-section" className="p-4">
            <SectionHeader title="Recommended Items" />
            <RecommendedItems />
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Home;
