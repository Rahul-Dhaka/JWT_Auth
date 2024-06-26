const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error("Invalid user");
    res.status(500).send({ message: "Invalid Token" });
  }
};