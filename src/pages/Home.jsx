import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const Home = () => {

  const {user, isLoggedIn} = useContext(AuthContext);

  return (

    !isLoggedIn ? <h1>Not logged in</h1> :
    <div>
      <h1>Welcome to the Landing Page!</h1>

      <br />
      <br />

      <h3>
        You can already see ALMOST everything there is to see here, except for:
      </h3>

      <br />

      <ol>
        <li>the user dashboard</li>
        <li>personalized recommendations</li>
        <li>the last item you liked</li>
        <li>the create collection form</li>
        <li>the create item form</li>
        <li>and so on</li>
        <a href="#">test link</a>
      </ol>
      <br />

      <h3>
        What you CAN see here already is the Navbar up there that will permit
        you to log in or sign up!
      </h3>
    </div>
  );
};

export default Home;
