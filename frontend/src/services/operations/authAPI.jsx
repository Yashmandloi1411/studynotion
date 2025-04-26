import axios from "axios";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { resetCart } from "../../slices/cartSlice";
import { setLoading, setToken } from "../../slices/authSlice";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
// API Endpoints
// const SEND_OTP_API = "/auth/sendotp";
// const SIGNUP_API = "/auth/signup";
const {
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  SENDOTP_API,
  SIGNUP_API,
} = endpoints;

// SEND OTP FUNCTION

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// SIGNUP FUNCTION

export function signup(
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
    //const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));

    // 🧠 Debug payload
    console.log("SIGNUP PAYLOAD:", {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    });

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

      if (typeof navigate === "function") {
        navigate("/login");
      }
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      // 👇 Add more detailed error logging
      if (error.response) {
        console.log("SIGNUP ERROR DATA:", error.response.data);
        console.log("SIGNUP ERROR STATUS:", error.response.status);
      }

      toast.error(error?.response?.data?.message || "Signup Failed");
    }

    dispatch(setLoading(false));
  };
}

//LOGIN FUNCTION

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      // ✅ SAFELY ACCESS USER
      const user = response.data?.userexist;
      if (!user) {
        throw new Error("User data is missing");
      }

      dispatch(setToken(response.data.token));

      const userImage = user.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

      dispatch(setUser({ ...user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

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
