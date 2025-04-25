import axios from "axios";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
//import { resetCart } from "../../slices/cartSlice";
// import { setUser } from "../../slices/profileSlice";
import { endpoints } from "../apis";
// API Endpoints
const SEND_OTP_API = "/auth/sendotp";
const SIGNUP_API = "/auth/signup";
const { LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API } = endpoints;

// SEND OTP FUNCTION
export const sendOtp = async (email) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: SEND_OTP_API,
      bodyData: {
        email: email,
      },
    });
    console.log("SEND OTP RESPONSE", response.data);
    return response.data;
  } catch (error) {
    console.log("SENDOTP API ERROR............", error);
    throw error;
  }
};

// SIGNUP FUNCTION
// export const signup = async (signupData) => {
//   try {
//     const response = await apiConnector({
//       method: "POST",
//       url: SIGNUP_API,
//       bodyData: signupData,
//     });
//     console.log("SIGNUP RESPONSE", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("SIGNUP API ERROR............", error);
//     throw error;
//   }
// };
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// LOGIN FUNCTION

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      LOGIN_API,
      { email, password },
      { withCredentials: true }
    );

    console.log("LOGIN RESPONSE", response.data);
    return response.data;
  } catch (error) {
    console.log("LOGIN API ERROR............", error);

    return null;
  }
};

const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      if (typeof setEmailSent === "function") {
        setEmailSent(true);
      }
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  };
};

export { getPasswordResetToken };

export function resetPassword(token, password, confirmPassword) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      // yha hamna email isliya likha ha bcoz hamana controller ma email hi send kiya ha
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        token,
        password,
        confirmPassword,
      });

      console.log("RESET PASSWORD RESPONSE....", response);
      if (!response.data.message) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been Reset Successfully ");
    } catch (err) {
      console.log("ERR in Reset password .", err);
      toast.error("Unable  to reset password");
    }
    dispatch(setLoading(false));
  };
}
