import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllCollections from "../components/Collections/AllCollections";
import SearchBar from "../components/DynamicSearch/SearchBar";

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
          .slice(0, 8); // limit to 8 collections, for dev phase while Lukas is still working on his home page logic
        setCollections({ collections: sortedCollections });
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section id="main-section">
      {/* This isLoggedIn serves the purpose of showing just all collections in the regular home screen, and to show additional content based on the user's settings on logged in screen*/}
      {!isLoggedIn ? (
        <div className="p-4 bg-slate-300">
          <p className="text-2xl text-slate-600">Please login</p>
        </div>
      ) : (
        <div className="px-4 pt-3 bg-slate-300">
          <p className="text-xl text-slate-600">
            Welcome back, {user.username}!
          </p>
        </div>
      )}

      <div className="px-4 bg-slate-300">
        <AllCollections collections={collections} />
      </div>
    </section>
  );
};

export default Home;
