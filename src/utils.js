const jwt = require("jsonwebtoken");

const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return parseInt(OTP, 10);
};

const generateId = () => `id_${Math.random().toString(16).slice(2)}`;

const generateToken = (data) => jwt.sign({ data }, "verysecretkey");

const verifyToken = (token) => jwt.verify(token, "verysecretkey");

module.exports = {
  generateOTP,
  generateId,
  generateToken,
  verifyToken,
};
