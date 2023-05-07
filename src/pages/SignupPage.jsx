import Header from "../components/UserLogin/Header";
import Signup from "../components/UserLogin/Signup";

function SignupPage() {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 mt-5 rounded-lg mx-auto" id="login-box">
        <Header
          heading="Create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
        />
        <Signup />
      </div>
    </div>
  );
}

export default SignupPage;
