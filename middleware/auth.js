const jwt = require("jsonwebtoken");

//require dotenv
require("dotenv").config();

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized: No token provided",
    });
  }

  // Extract the token without the "Bearer " prefix
  const tokenWithoutBearer = token.replace("Bearer ", "");

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Invalid token",
      });
    }

    if (!decoded.admin) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden: Admin privileges required",
      });
    }

    req.user = decoded; // Attach user details to the request object

    next();
  });
};

module.exports = authenticateAdmin;
