import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllCollections from "../components/Collections/AllCollections";
import SectionHeader from "../components/UI/SectionHeader";
import API_URL from "../services/apiConfig";

const Home = () => {
  const [collections, setCollections] = useState({ collections: [] });
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
      <div className="px-4 pt-3">
        {/* Section headers can now be styled with this reusable component. Just pass the text as a string */}
        <SectionHeader title="Popular Collections" />
        <AllCollections collections={collections} />
      </div>

      {/* This isLoggedIn serves the purpose of showing just all collections in the regular home screen, and to show additional content based on the user's settings on logged in screen*/}
      {!isLoggedIn ? (
        <div className="p-4 ">
          <p className="text-2xl text-slate-600">Please login</p>
        </div>
      ) : (
        <div className="px-4 pt-3">
          <p className="text-xl text-slate-600">
            Welcome back, {user.username}!
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;
