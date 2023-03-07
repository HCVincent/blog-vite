import axios from "../axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-teal-600 mb-8">Register</h1>
      <form className="flex flex-col p-4 bg-white w-80 gap-4">
        <input
          required
          type="text"
          placeholder="username"
          onChange={handleChange}
          name="username"
          className="p-4 border-b border-gray-300"
        />
        <input
          required
          type="email"
          placeholder="email"
          onChange={handleChange}
          name="email"
          className="p-4 border-b border-gray-300"
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={handleChange}
          name="password"
          className="p-4 border-b border-gray-300"
        />
        <button
          onClick={handleSubmit}
          className="
        p-4 
        bg-teal-500 
        text-white 
        rounded-md 
        hover:bg-teal-600 
        transition-colors 
        duration-300 
        ease-in-out"
        >
          Register
        </button>
        {err && (
          <p
            className="
          text-xs 
          text-center 
          text-red-500"
          >
            {err}
          </p>
        )}
        <span
          className="
         text-sm 
         text-gray-700"
        >
          Do you have an account?{" "}
          <Link
            to="/login"
            className="
              text-teal-600 
              hover:text-teal-700"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
