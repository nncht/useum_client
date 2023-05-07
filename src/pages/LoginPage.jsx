// IMPORTS
import Header from "../components/UserLogin/Header";
import Login from "../components/UserLogin/Login";

function LoginPage() {
  // LOGIN PAGE RENDER (FRONTEND)
  return (
    <div className="p-4">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </div>
  );
}

export default LoginPage;
