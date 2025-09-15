const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ message: "Unathorized, JWT Token is required!", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({
        message: "Unathorized, JWT Token is wrong or expired!",
        success: false,
      });
  }
};

module.exports = ensureAuthenticated;
