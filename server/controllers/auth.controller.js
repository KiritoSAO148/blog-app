import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const generateRandomPassword = () => {
  return (
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
  );
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
};

const handleSignIn = async (email, password, res, next) => {
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password!"));
    }

    const token = generateToken(validUser);
    const { password: pass, ...userInfo } = validUser._doc;

    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "All fields are required!"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("Signup success!");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required!"));
    }

    await handleSignIn(email, password, res, next);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoURL } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      const generatedPassword = generateRandomPassword();
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const username =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4);

      user = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });

      await user.save();
    }

    const token = generateToken(user);
    const { password, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
