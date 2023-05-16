import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllCollections from "../components/Collections/AllCollections";
import SectionHeader from "../components/UI/SectionHeader";

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
      <section id="main-content" className="bg-slate-100">
        <div id="main-section" className="p-4">
          {/* Section headers can now be styled with this reusable component. Just pass the text as a string */}
          <SectionHeader title="Popular Collections" />
          <AllCollections collections={collections} />
        </div>
      </section>
      <section id="main-content" className="bg-slate-200">
        <div id="main-section" className="p-4">
          {/* Section headers can now be styled with this reusable component. Just pass the text as a string */}
          <SectionHeader title="Popular Items" />
          <AllCollections collections={collections} />
        </div>
      </section>

      {!isLoggedIn ? (
        <section id="login-cta" className="bg-slate-100">
          <div id="main-section" className="py-4">
            <p className="text-2xl text-slate-600">Please login</p>
          </div>
        </section>
      ) : (
        <section id="login-cta" className="bg-slate-100">
          <div id="main-section" className="py-4">
            <p className="text-xl text-slate-600">
              Welcome back, {user.username}!
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
