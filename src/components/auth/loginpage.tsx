// import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/authcontext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left: Illustration / Branding */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-100 rounded-l-2xl p-8">
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/media/7edb74a687ba313656b3d098b1c22119.png"
            alt="Shorten URLs Illustration"
            className="w-64"
          />
          <h2 className="text-xl font-bold text-gray-700 mt-4">
            URL Shortener App
          </h2>
          <p className="text-gray-500 text-center px-6">
            Shorten, manage, and track your links efficiently.
          </p>
        </div>

        {/* Right: Login Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Sign in with Google to continue.
          </p>

          <button
            onClick={login}
            className="flex items-center space-x-3 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaGoogle size={20} />
            <span className="font-semibold">Sign in with Google</span>
          </button>

          <p className="text-sm text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
