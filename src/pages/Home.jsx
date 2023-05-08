import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const Home = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? (
    <section id="main-content" className="p-3 bg-slate-300">
      <p>Not logged in</p>
    </section>
  ) : (
    <section id="main-content" className="p-3 bg-slate-300">
      <div>
        <p className="text-2xl text-slate-600">Welcome back, {user.username}</p>
      </div>
    </section>
  );
};

export default Home;
