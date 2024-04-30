const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    let isToken = req.headers.authorization;
    if (isToken) {
      let [bearer, token] = isToken.split(" ");
      let decoded = jwt.verify(token, "NotFound");
      if (decoded) {
        req.body.user = decoded;
        next();
      } else {
        return res.status(401).json({
          status: false,
          message: "Token was expired",
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: "please login first",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = { authentication };
