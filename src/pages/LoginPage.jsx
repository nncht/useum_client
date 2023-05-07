// IMPORTS
import Header from "../components/UserLogin/Header";
import Login from "../components/UserLogin/Login";

function LoginPage() {
  return (
    <div className="flex justify-center p-4">
      <div className="bg-white p-6 rounded-lg mx-auto" id="login-box">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
