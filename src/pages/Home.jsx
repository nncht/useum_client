import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? (
    <h1>Not logged in</h1>
  ) : (
    <div>
      <h3>Welcome back, User</h3>
    </div>
  );
};

export default Home;
