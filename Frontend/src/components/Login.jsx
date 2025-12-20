import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthProvider";
import axiosInstance from "../utils/axiosInstance";

function Login() {

  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
    "/user/login",
    {
      email: data.email,
      password: data.password,
    }
      );

      const { token, user } = response.data;

      toast.success("Login successful!");

      localStorage.setItem("token", token);
      localStorage.setItem("Users", JSON.stringify(user));

      setAuthUser(user);

      document.getElementById("my_modal_3").close();

      // ROLE-BASED REDIRECT
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error(error);
      toast.error("Login failed! Please check credentials.");
    }
  };

  const goToSignup = () => {
    document.getElementById("my_modal_3").close();  // Close login modal
    navigate("/signup");   // Redirect to signup
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative text-left 
                bg-white text-black 
                dark:bg-slate-900 dark:text-white
                rounded-2xl shadow-2xl max-w-md">

          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>

          <h3 className="font-bold text-xl mb-4">Login</h3>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <div className="mt-3">
              <label>Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  }
                })}
                className="w-full px-4 py-2 mt-1 rounded-lg outline-none
                      bg-gray-50 text-black border border-gray-300
                      focus:ring-2 focus:ring-orange-500
                      dark:bg-slate-800 dark:text-white dark:border-gray-600"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4">
              <label>Password</label>
              <input
                type="password"
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
                className="w-full px-4 py-2 mt-1 rounded-lg outline-none
                      bg-gray-50 text-black border border-gray-300
                      focus:ring-2 focus:ring-orange-500
                      dark:bg-slate-800 dark:text-white dark:border-gray-600"

              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>


            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">

              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Login
              </button>

              <p className="text-sm">
                Not registered?{" "}
                <button
                  onClick={goToSignup}        // FIXED HERE
                  className="underline text-blue-500 hover:text-blue-700"
                >
                  Signup
                </button>
              </p>
            </div>

          </form>

        </div>
      </dialog>
    </div>
  );
}

export default Login;
