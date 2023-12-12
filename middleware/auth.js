const jwt = require("jsonwebtoken");

//require dotenv
require("dotenv").config();

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  console.log("Received Token:", token);

  if (!token) {
    console.log("No Token Provided");
    return res.status(401).json({
      status: "error",
      message: "Unauthorized: No token provided",
    });
  }

  // Extract the token without the "Bearer " prefix
  const tokenWithoutBearer = token.replace("Bearer ", "");

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token Verification Error:", err);

      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Invalid token",
      });
    }

    console.log("Decoded Token:", decoded);

    if (!decoded.admin) {
      console.log("User does not have admin privileges");

      return res.status(403).json({
        status: "error",
        message: "Forbidden: Admin privileges required",
      });
    }

    req.user = decoded; // Attach user details to the request object
    console.log("User details attached to the request:", req.user);

    next();
  });
};

module.exports = authenticateAdmin;
