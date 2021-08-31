const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      console.log("coucou");

      const user = await User.findOne({
        token: req.headers.authorization.replace("Bearer ", ""),
      });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = user;
        return next();
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = isAuthenticated;
