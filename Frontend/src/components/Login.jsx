import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {  
          email: data.email,
          password: data.password
        };
        //To call the backend API for signup, we use axios here.
        await axios.post("http://localhost:4001/user/login", userInfo).then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success('Login successful!');
            document.getElementById("my_modal_3").close();  // Close login modal
            setTimeout(() => {

            window.location.reload();                     // Reload to update navbar
            localStorage.setItem("Users", JSON.stringify(response.data.user));
              },3000);
            
          }
          
          navigate("/"); // Redirect to home or login page after successful signup
        }).catch((error) => {
          if(error.response){
            console.log(error);
            toast.error('Login failed! Please sign up');
            setTimeout(() => {},1000);
            return;
          }
          console.error("There was an error during signup!", error);
          alert("Signup failed! Please try again."+error.message);
        });
  };

  const goToSignup = () => {
    document.getElementById("my_modal_3").close();  // ✅ Close login modal
    navigate("/signup");                            // ✅ Redirect to signup
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative text-left">

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
                {...register("email", { required: true })}
                className="w-full px-3 py-2 mt-1 border rounded-md outline-none"
              />
              {errors.email && <span className="text-sm text-red-500">Email is required</span>}
            </div>

            {/* Password */}
            <div className="mt-4">
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-3 py-2 mt-1 border rounded-md outline-none"
              />
              {errors.password && <span className="text-sm text-red-500">Password is required</span>}
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
                  onClick={goToSignup}        // ✅ FIXED HERE
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
