import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

// Custom components
import ItemCard from "../components/Items/ItemCard";
import SectionHeader from "../components/UI/SectionHeader";
import UserCard from "../components/Profile/UserCard";
import CollectionCard from "../components/Collections/CollectionCard";
import API_URL from "../services/apiConfig";

// MUI components
import { Grid } from "@mui/material";

// --- End of imports

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersFound, setUsersFound] = useState([]);
  const [itemsFound, setItemsFound] = useState([]);
  const [collectionsFound, setCollectionsFound] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchTerm = searchParams.get("q");

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true); // Start searching

      axios
        .get(`${API_URL}/search?search=${searchTerm}`)
        .then((res) => {
          console.log(res.data);
          setUsersFound(res.data.users);
          setItemsFound(res.data.items);
          setCollectionsFound(res.data.collections);
          setIsSearching(false); // Stop searching
        })
        .catch((err) => {
          console.log(err);
          setIsSearching(false); // Stop searching
        });
    }
  }, [searchTerm]);

  // -----------------
  // RENDER UI
  // -----------------

  return (
    <>
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Search Results" />

          {/* Users */}
          <SectionHeader title="Users" />
          <Grid container spacing={3}>
            {isSearching ? (
              <div className="p-4 my-4 flex justify-center w-100">
                <MoonLoader color="#1976D2" size={30} />
              </div>
            ) : usersFound.length ? (
              usersFound.map((user) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={user._id}>
                  <UserCard key={user._id} user={user} />
                </Grid>
              ))
            ) : (
              <div className="p-4 my-4 flex justify-center w-100">
                <p>Could not find any matching users</p>
              </div>
            )}
          </Grid>
        </div>
      </section>

      {/* Items */}
      <section id="main-content" className="bg-slate-200">
        <div id="main-section" className="p-4">
          <SectionHeader title="Items" />
          <Grid container spacing={3}>
            {isSearching ? (
              <div className="p-4 my-4 flex justify-center w-100">
                <MoonLoader color="#1976D2" size={30} />
              </div>
            ) : itemsFound.length ? (
              itemsFound.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <ItemCard key={item._id} item={item} />
                </Grid>
              ))
            ) : (
              <div className="p-4 my-4 flex justify-center w-100">
                <p>Could not find any matching items</p>
              </div>
            )}
          </Grid>
        </div>
      </section>

      {/* Collections */}
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          <SectionHeader title="Collections" />
          <Grid container spacing={3}>
            {isSearching ? (
              <div className="p-4 my-4 flex justify-center w-100">
                <MoonLoader color="#1976D2" size={30} />
              </div>
            ) : collectionsFound.length ? (
              collectionsFound.map((collection) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                  <CollectionCard
                    key={collection._id}
                    collection={collection}
                  />
                </Grid>
              ))
            ) : (
              <div className="p-4 my-4 flex justify-center w-100">
                <p>Could not find any matching collections</p>
              </div>
            )}
          </Grid>
        </div>
      </section>
    </>
  );
};

export default SearchResults;
