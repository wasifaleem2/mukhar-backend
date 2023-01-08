const jwt = require("jsonwebtoken");

//creating a middleware
const auth = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res
      .status(406)
      .json({ err: "no authentication token, authorization denied" });
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    return res.status(406).json({ err: "token verification failed" });
    req.user_id = verified.id;
    next();
  }
};

module.export = auth;
