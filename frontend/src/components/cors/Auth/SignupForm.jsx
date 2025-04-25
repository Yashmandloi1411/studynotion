import React from "react";
import { toast } from "react-hot-toast";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";

import Tab from "../../common/Tab";

function SignupForm({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;
  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];
  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit}>
        <div className="flex gap-x-4">
          <label htmlFor="">
            <p className="mt-4 mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
              First Name <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter First name"
              className="font-medium w-full rounded-[0.5rem] bg-[#161D29]  p-[12px] text-[#F1F2FF]"
            />
          </label>
          <label htmlFor="">
            <p className="mt-4 mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
              Last Name <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter Last name"
              className="font-medium w-full rounded-[0.5rem] bg-[#161D29]  p-[12px] text-[#F1F2FF]"
            />
          </label>
        </div>

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

        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mt-4 mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
              Create password <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="font-medium w-full rounded-[0.5rem] bg-[#161D29]  p-[12px] text-[#F1F2FF]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute  right-3 top-[55px] z-[10] cursor-pointer text-white "
            >
              {showPassword ? (
                <IoEyeSharp fontSize={24} />
              ) : (
                <FaEyeSlash fontSize={24} />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mt-4 mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
              Confirm Password <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="font-medium w-full rounded-[0.5rem] bg-[#161D29]  p-[12px] text-[#F1F2FF]"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute  right-3 top-[55px] z-[10] cursor-pointer text-white "
            >
              {showConfirmPassword ? (
                <IoEyeSharp fontSize={24} />
              ) : (
                <FaEyeSlash fontSize={24} />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-6 rounded-[8px] bg-[#FFD60A] py-[8px] px-[12px] font-medium text-[#000814] "
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
