import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      signupSchema.parse(form);
      setErrors({});

    
      await axios.post("http://localhost:3000/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      if (err.name === "ZodError") {
        const fieldErrors = {};
        err.errors.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
      } else if (err.response && err.response.data) {
        alert(err.response.data.message || "Registration failed.");
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="  bg-gray-800 flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Create an Account
        </h2>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name" className="text-sm font-medium text-black">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="text-sm font-medium text-black">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
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
          Sign Up
        </button>

        <div className="flex justify-center items-center gap-2 mt-4 text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <button
            type="button"
            className="text-blue-600 hover:underline font-medium"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
