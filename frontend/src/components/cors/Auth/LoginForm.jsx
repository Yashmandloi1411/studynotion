import React from "react";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

import { useState } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);

  // destructuring kar ka value nikali ha formData ma sa
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handelOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handelOnSubmit}>
      <label className="w-full">
        <p className="mt-4 mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
          Email Address <sup className="text-[#EF476F]">*</sup>
        </p>

        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="font-medium w-full rounded-[0.5rem] bg-[#161D29]  p-[12px] text-[#F1F2FF]"
        />
      </label>

      <label className="relative ">
        <p className="mt-4 mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
          Password <sup className="text-[#EF476F]">*</sup>
        </p>

        <input
          required
          type={showPassword ? "text" : "Password"}
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={handleOnChange}
          className=" font-medium w-full rounded-[0.5rem] bg-[#161D29]  p-[12px] text-[#F1F2FF]"
        />

        <span
          onClick={() => setshowPassword((prev) => !prev)}
          className="absolute  right-3 top-[90px] z-[10] cursor-pointer text-white "
        >
          {showPassword ? (
            <IoEyeSharp fontSize={24} />
          ) : (
            <FaEyeSlash fontSize={24} />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="w-full mt-6 rounded-[8px] bg-[#FFD60A] py-[8px] px-[12px] font-medium text-[#000814] "
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
