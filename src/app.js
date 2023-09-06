const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const db = require("./db");
const { generateId, generateOTP, generateToken } = require("./utils");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { phone } = req.body;
  const user = db.find(phone);
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  const id = generateId();
  const otp = generateOTP();

  db.save({
    id,
    phone,
    otp,
    verified: false,
  });

  return res.status(200).json({
    success: true,
    message: "Registered",
    otp,
    phone,
  });
});

app.post("/verify", (req, res) => {
  const { phone, otp } = req.body;
  const user = db.find(phone);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      success: false,
      message: "User already verified",
    });
  }

  if (otp !== user.otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  db.update(user.id, {
    ...user,
    verified: true,
  });

  return res.status(200).json({
    success: true,
    message: "User verified",
    data: user,
  });
});

app.post("/login", (req, res) => {
  const { phone } = req.body;
  const user = db.find(phone);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      success: false,
      message: "User not verified",
    });
  }

  const token = generateToken({
    id: user.id,
    phone: user.phone,
  });

  return res.status(200).json({
    success: true,
    message: "Logged in",
    token,
    phone,
  });
});

app.get("/profile", middlewares.verifyUser, (req, res) => {
  const { decoded, secretData } = res;

  const user = db.find(decoded.data.phone);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: {
      secretData,
      phone: decoded.data.phone,
    },
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
