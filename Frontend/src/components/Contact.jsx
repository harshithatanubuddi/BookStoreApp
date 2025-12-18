import React from "react";
import { useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("CONTACT FORM:", data);
    alert("Message sent");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 
                      shadow-lg rounded-lg p-8 border 
                      border-gray-300 dark:border-gray-700">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Feel free to send us a message
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

          {/* Name */}
          <div>
            <label className="text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none 
                         dark:bg-slate-900 dark:text-white 
                         border-gray-300 dark:border-gray-600"
            />
            {errors.name && (
              <span className="text-sm text-red-500">Name is required</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none 
                         dark:bg-slate-900 dark:text-white 
                         border-gray-300 dark:border-gray-600"
            />
            {errors.email && (
              <span className="text-sm text-red-500">Email is required</span>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              placeholder="Write your message"
              rows="4"
              {...register("message", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none resize-none
                         dark:bg-slate-900 dark:text-white 
                         border-gray-300 dark:border-gray-600"
            />
            {errors.message && (
              <span className="text-sm text-red-500">Message is required</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md 
                       hover:bg-orange-600 transition duration-200"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
}

export default Contact;
