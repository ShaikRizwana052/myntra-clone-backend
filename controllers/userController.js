const USER_MODEL = require("../model/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await USER_MODEL.find({ email });
    if (isUser.length > 0) {
      return res.status(400).json({
        status: false,
        message: "user already signup,please login first",
      });
    }

    const hash = bcrypt.hashSync(password, 4);
    let payload = {
      ...req.body,
      password: hash,
    };
    const createUser = await USER_MODEL.create(payload);
    if (!createUser) {
      return res.status(500).json({
        status: false,
        message: "Error while creating user",
      });
    }

    res.status(200).json({
      status: true,
      message: `${createUser.name} signup successfully`,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({
      status: false,
      message: "user not found",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isLogin = await USER_MODEL.findOne({ email });
    if (!isLogin) {
      return res.status(400).json({
        status: false,
        message: "user not found,please login first",
      });
    }
    const validPassword = bcrypt.compareSync(password, isLogin.password);
    if (!validPassword) {
      return res.status(401).json({
        status: false,
        message: "wrong creadientals",
      });
    }
    let secert = process.env.JWT_LOGIN || "NotFound";
    let data = { id: isLogin._id, name: isLogin.name, role: isLogin.role };
    const Token = jwt.sign(data, secert);
    res.status(200).json({
      status: true,
      message: " user login successfully",
      Token,
    });
  } catch (error) {
    console.log("error", error);
  }
};
