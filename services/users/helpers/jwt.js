const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// create token
const generateToken = (payload) => {
  console.log(payload, "payLoad yang diterima");
  return jwt.sign(payload, JWT_SECRET);
};

// authentification

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
