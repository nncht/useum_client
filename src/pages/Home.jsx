import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllCollections from "../components/Collections/AllCollections";

const Home = () => {
  const [collections, setCollections] = useState({ collections: [] });
  const API_URL = "http://localhost:5005";
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        const sortedCollections = res.data.collections.sort(
          (a, b) => b.likes.length - a.likes.length
        );
        setCollections({ collections: sortedCollections });
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return !isLoggedIn ? (
    <section id="main-content" className="p-4 bg-slate-300">
      <p>Not logged in</p>
      <AllCollections collections={collections} />
    </section>
  ) : (
    <section id="main-content">
      <div className="px-4 py-2 bg-slate-300">
        <p className="text-2xl text-slate-600">Welcome back, {user.username}</p>
      </div>
      <div className="px-4 pb-20 bg-slate-300">
        <AllCollections collections={collections} />
      </div>
    </section>
  );
};

export default Home;
