const authorization = (role) => {
  return (req, res, next) => {
    try {
      let userRole = req.body.user.role;
      if (userRole) {
        if (role.includes(userRole)) {
          next();
        } else {
          return res.status(401).json({
            status: false,
            message: "user not authorized.",
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
};
module.exports = { authorization };
