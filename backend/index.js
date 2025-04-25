const express = require("express");
const app = express();

// mongodb setup
require("./config/database");

// cookie parser
const cookieParser = require("cookie-parser");

// cors
const cors = require("cors");

const { cloudinaryConnect } = require("./config/cloudinary");

// fileuploder package

const fileuploader = require("express-fileupload");

// dotenv
require("dotenv").config();

// middleware
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    // frontend ki bat ho rhi ha
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileuploader({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// port no
const PORT = process.env.PORT || 4000;

// cloudinary connection
cloudinaryConnect();

// reazorpay setup
require("./config/razorpay");

// routes
const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Courses");

// route mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);

// defualt route

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is Up and running...",
  });
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
