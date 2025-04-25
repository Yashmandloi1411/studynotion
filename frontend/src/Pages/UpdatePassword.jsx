import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
//import { resetPassword } from "../../../backend/controllers/ResetPassword";

import { resetPassword } from "../services/operations/authAPI";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

function UpdatePassword() {
  const dispatch = useDispatch();

  // token nikalan ka liya use location ka use kiya ha
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPasssword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // loading ko import karalo
  const { loading } = useSelector((state) => state.auth);

  // pass andd confirmPass nikalo form ka data ma sa
  const { password, confirmPassword } = formData;

  const handelOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handelOnSubmit = (e) => {
    e.preventDefault();
    // sara action dispatch yhi horha ha

    // token jo mail pa link ja rhi ha uska last part usko nikana padega
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };
  return (
    <div className="text-white">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>

          <p>Almost done.Enter your new password and youre all set.</p>
          <form onSubmit={handelOnSubmit}>
            <label>
              <p>
                New Password<span>*</span>
              </p>
              <input
                className="text-black"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new Password"
                name="password"
                value={password}
                onChange={handelOnChange}
              />
              <span onClick={() => setShowPasssword((prev) => !prev)}>
                {showPassword ? (
                  <IoEyeSharp fontSize={24} />
                ) : (
                  <FaEyeSlash fontSize={24} />
                )}
              </span>
            </label>
            <label>
              <p>
                Confirm new Password<span>*</span>
              </p>
              <input
                className="text-black"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter new Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handelOnChange}
              />

              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (
                  <IoEyeSharp fontSize={24} />
                ) : (
                  <FaEyeSlash fontSize={24} />
                )}
              </span>
            </label>

            <button type="submit">Reset Password</button>
          </form>
          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
