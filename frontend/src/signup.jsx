import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        password,
        userType,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white ">
      <div className="bg-grey p-6  rounded w-25">
        <h2 className="text-center animate-bounce text-2xl font-bold mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">Already have an account?</p>
        <Link
          to="/login"
          className="block mt-2 text-center text-blue-500 hover:underline"
        >
          Login
        </Link>

        <div className="mt-6 flex justify-around gap-1">
          <button
            className={`py-2 px-4 rounded-md ${
              userType === "Employee"
                ? "bg-blue-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => setUserType("Employee")}
          >
            I am a Job Seeker
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              userType === "Recruiter"
                ? "bg-purple-600"
                : "bg-purple-500 hover:bg-purple-600"
            }`}
            onClick={() => setUserType("Recruiter")}
          >
            I am a Recruiter
          </button>
        </div>

        {userType && (
          <p className="mt-4 text-center text-sm font-semibold">
            Selected User Type: {userType}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
