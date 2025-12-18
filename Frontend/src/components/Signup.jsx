import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login"; 
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Signup() {
  const location=useLocation();
  const from=location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const API = "https://bookstoreapp-backend-ynkn.onrender.com";
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,   
      email: data.email,
      password: data.password,
      role: data.role,
    };
    //To call the backend API for signup, we use axios here.
    await axios.post("${API}/user/signup", userInfo).then((response) => {
      console.log(response.data);
      if (response.status === 201) {
        toast.success('Signup successful!');
        navigate(from,{replace:true});
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("Users", JSON.stringify({
        ...response.data.user,
        role: response.data.user.role
      }));
      navigate("/"); // Redirect to home or login page after successful signup
    }).catch((error) => {
      if(error.response){
        console.log(error);
        toast.error("Signup failed! " + error.response.data.message);
        return;
      }
      console.error("There was an error during signup!", error);
      alert("Signup failed! Please try again."+error.message);
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">

      <div className="w-full max-w-md bg-white dark:bg-slate-800 
                      border border-gray-300 dark:border-gray-700 
                      shadow-lg rounded-lg p-8 relative">

        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 dark:text-white"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create an Account
        </h3>

        {/* ✅ FORM STARTS */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* ⭐ Username Field (Added) */}
          <div className="mt-6">
            <label
              htmlFor="username"
              className="text-gray-700 dark:text-gray-300"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter a username"
              autoComplete="username"
              {...register("fullname", { required: true })}
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none
                         dark:bg-slate-900 dark:text-white
                         border-gray-300 dark:border-gray-600"
            />

            {errors.fullname && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address"
                }
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none
                        dark:bg-slate-900 dark:text-white
                        border-gray-300 dark:border-gray-600"
            />

            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
            </div>

          {/* Password Field */}
          <div className="mt-4">
            <label htmlFor="password" className="text-gray-700 dark:text-gray-300">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message: "Password must contain at least one letter and one number"
                }
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none
                        dark:bg-slate-900 dark:text-white
                        border-gray-300 dark:border-gray-600"
            />

            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
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
        {/* FORM ENDS */}

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
