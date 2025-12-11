import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login"; 
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("SIGNUP FORM DATA:", data);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">

      <div className="w-full max-w-md bg-white dark:bg-slate-800 
                      border border-gray-300 dark:border-gray-700 
                      shadow-lg rounded-lg p-8 relative">

        {/* Close Button → Homepage */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 dark:text-white"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create an Account
        </h3>

        {/* ✅ FORM STARTS HERE */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Email Field */}
          <div className="mt-6">
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email", { required: true })}   // ✅ Hook Form
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none
                         dark:bg-slate-900 dark:text-white
                         border-gray-300 dark:border-gray-600"
            />

            {/* Email Error */}
            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register("password", { required: true })}  // ✅ Hook Form
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none
                         dark:bg-slate-900 dark:text-white
                         border-gray-300 dark:border-gray-600"
            />

            {/* Password Error */}
            {errors.password && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-orange-500 text-white py-2 rounded-md 
                       hover:bg-orange-600 transition duration-200"
          >
            Signup
          </button>
        </form>
        {/* ✅ FORM ENDS */}

        {/* Already registered */}
        <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <button
            className="text-blue-600 dark:text-blue-400 underline hover:opacity-80"
            onClick={() =>
              document.getElementById("my_modal_3").showModal()
            }
          >
            Login
          </button>

          <Login />
        </div>

      </div>
    </div>
  );
}

export default Signup;
