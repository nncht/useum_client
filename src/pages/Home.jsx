import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllCollections from "../components/Collections/AllCollections";

const Home = () => {
  const [collections, setCollections] = useState({ collections: [] });
  const [userCollections, setUserCollections] = useState({ collections: [] });
  const API_URL = "http://localhost:5005";
  const { user, isLoggedIn } = useContext(AuthContext);
  const [popularCollections, setPopularCollections] = useState ({ collections: [] });


  useEffect(() => {
    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        const fetchedCollections = res.data.collections
        setCollections({ collections: fetchedCollections });
        sortCollectionsByLikes(fetchedCollections);
        const userCollections = fetchedCollections.filter(
          (collection) => collection.createdBy === user._id
        );
        console.log("user ID is:" + user._id);
        console.log("user userCollections are:" + userCollections);
        setUserCollections({ collections: userCollections });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //sort collections based on likes here (popular collections)
  const sortCollectionsByLikes = (collections) => {
    let sortedCollections = [...collections].sort((a, b) => b.likes.length - a.likes.length);
    let splicedCollections = sortedCollections.splice(0,4);
    setPopularCollections({ collections: splicedCollections });
  };

  const filteredCollections = collections.collections.filter((collection) => {
    if (
      userCollections.collections.length &&
      collection.category === userCollections.collections[0].categories[0]
    ) {
      return true;
    }
    return false;
  });

  console.log("FilteredCollections:" + filteredCollections)

  return (
    <section id="main-content">
      {/* This isLoggedIn serves the purpose of showing just all collections in the regular home screen, and to show additional content based on the user's settings on logged in screen*/}
      {!isLoggedIn ? (
        <div className="px-4 py-2 bg-slate-300">
          <p className="text-2xl text-slate-600">(You need to log in still!)</p>
        </div>
      ) : (
        <div className="px-4 py-2 bg-slate-300">
          <p className="text-2xl text-slate-600">
            Welcome back, {user.username}
          </p>
          {/* <p>Based on what you selected in your settings, you could see a bunch of stuff here!</p>
          <p>Examples include:</p>
          <ul>
            <li>Recommended collections based on your interests</li>
            <li>Recommended collections based on your friends' interests</li>
            <li>The newest items</li>
            <li>The most popular items</li>
            <li>Lukas' favorite Ravelist</li>
          </ul> */}
        </div>
      )}

      <div className="px-4 pb-20 bg-slate-300">
        <h1>Most popular Collections</h1>
        <AllCollections collections={popularCollections} />
        <h1>Filtered Collections</h1>
        { // <AllCollections collections={filteredCollections} />
        }
      </div>
    </section>
  );
};

export default Home;
