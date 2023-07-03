const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.Authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).send({ msg: "Please Login again" });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(400).send({ mas: "Please login again" });
      }

      if (decoded) {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({ mas: "Error occured during Authorization" });
  }
};

module.exports = authMiddleware;
