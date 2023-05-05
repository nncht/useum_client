import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? (
    <p>Not logged in</p>
  ) : (
    <div>
      <p>Welcome back, User</p>
    </div>
  );
};

export default Home;
