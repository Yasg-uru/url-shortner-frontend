import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Function to initiate Google OAuth
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  // Function to check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/user", {
        withCredentials: true,
      });
      if (response.data.loggedIn) {
        navigate("/profile"); // Redirect to profile page if authenticated
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  // Check authentication status on component mount
  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login with Google</h1>
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
