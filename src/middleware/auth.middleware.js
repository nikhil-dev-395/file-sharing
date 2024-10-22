// auth.middleware.js
const jwt = require("jsonwebtoken");
const authUser = (req, res, next) => {
  let token = req.headers["authorization"];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  // Remove "Bearer " prefix if present
  token = token.replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "invalid token" });
  }
};

module.exports = authUser;
