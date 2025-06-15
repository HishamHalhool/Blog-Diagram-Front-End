import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login(props) {
  const {handleUserLogin} = props
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      schema.parse(form);
      setErrors({});
      
      const res = await axios.post("http://localhost:3000/login", form);

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      handleUserLogin(res.data.user)
      
      alert("Logged in successfully!");
      navigate("/");
    } catch (error) {
      if (error.errors) {
        const errorObj = {};
        for (const err of error.errors) {
          errorObj[err.path[0]] = err.message;
        }
        setErrors(errorObj);
      } else if (error.response && error.response.data) {
        alert(error.response.data || "Login failed.");
      } else {
        alert("Something went wrong.");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className=" bg-gray-800 flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Welcome Back!
        </h2>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="text-sm font-medium text-black">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="password" className="text-sm font-medium text-black">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Login
        </button>

        <div className="flex justify-center items-center gap-2 mt-4 text-sm">
          <span className="text-gray-600">Don’t have an account?</span>
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
