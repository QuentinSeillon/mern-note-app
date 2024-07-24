const User = require("../models/User");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check name
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    //Check password
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and needs to be 6 or more characters",
      });
    }

    // Check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email already exist" });
    }

    const hashedPassword = await hashPassword(password);
    // Create user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json({ user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Check if passwords matches
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({ error: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Logout endpoint
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Déconnexion réussie" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors de la déconnexion" });
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = { test, registerUser, loginUser, logoutUser, getProfile };
