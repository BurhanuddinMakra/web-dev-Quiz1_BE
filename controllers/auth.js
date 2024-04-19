const nodemailer = require("nodemailer");
const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.match(/^\S+@\S+\.\S+$/))
      return res
        .status(200)
        .json({ success: true, msg: "Invalid Email format", data: [] }); // Check the email format
    let user = await Users.findOne({ email });

    if (user) {
      return res
        .status(200)
        .json({ success: true, msg: "User already exists", data: [] });
    }
    if (
      password.length < 8 || // Check the length of the password
      !password.match(/[0-9]/) || // Check the presence of a number
      !password.match(/[a-z]/) || // Check the presence of a lowercase letter
      !password.match(/[A-Z]/)
    )
      return res
        .status(200)
        .json({
          success: true,
          msg: "Your password must be at least 8 characters long, contain at least one number, and have a mixture of uppercase and lowercase letters.",
          data: [],
        }); // Check the presence of an uppercase letter

    await Users.create({
      ...req.body,
      password: await bcrypt.hash(password, 5),
    });
    return res
      .status(201)
      .json({ success: true, msg: "User created successfully", data: [] });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        msg: "An error occurred while creating the user",
        data: [],
      });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ success: true, msg: "User not found", data: [] });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res
        .status(200)
        .json({ success: true, msg: "Invalid password", data: [] });

    const token = jwt.sign(
      {
        name: user.firstName + " " + user.lastName,
        id: user._id,
        role: user.role,
        createdAt: new Date(),
      },
      "BURHAN_SECRET",
      { expiresIn: "1d" }
    );
    res.json({
      msg: "LOGGED IN",
      token,
      role: user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        msg: "An error occurred while logging in",
        data: [],
      });
  }
};



module.exports = {
  login,
  signUp,
};
