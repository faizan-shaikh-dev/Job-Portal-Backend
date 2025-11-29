import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//RegisterUser

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(409).json({ message: "Email is already register" });

    const salt = await bcrypt.genSalt(10);
    const hased = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hased,
      role: req.body.role || "user",
    });

    const token = signToken(newUser);

    return res.status(201).json({ message: "User register successfully" });
  } catch (error) {
    res.status(500).json({ message: "inetrnal server error" });
    console.error(error);
  }
};

//loginUser

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "user not found" });

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass)
      return res.status(401).json({ message: "Inavalid password" });

    const token = signToken(user);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ message: "Inetrnal server error" });
  }
};


export {registerUser, loginUser};