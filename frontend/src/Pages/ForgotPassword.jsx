import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../services/operations/authAPI";
function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch(); // Yha initialize hona chiya tabi use kar sachata ho

  const handelOnSubmit = (e) => {
    e.preventDefault();

    // call kardena getPasswordResetToken
    // yha setEmailSent isliya pass kar ha bcoz backend sa response ayaga to ya emailsent ko true mark
    // kardega or checkyouremail vala pagae showhoga fir

    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="text-white flex justify-center items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset your password" : "Check Your Email"}</h1>

          <p>{!emailSent ? "" : ""}</p>

          <form onSubmit={handelOnSubmit}>
            {!emailSent && (
              <label>
                <p>Email Address</p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                />
              </label>
            )}

            <button type="submit">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
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

export default ForgotPassword;
