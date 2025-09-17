import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExists = await userModel.findOne({
      $or: [{ name }, { email }],
    });
    if (isUserExists) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction ? true : false, //prod = true, local = false
      sameSite: "none", //prod = none, local = lax
      path: "/",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Password or email is invalid",
      });
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Password or email is invalid",
      });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction ? true : false, //prod = true, local = false
      sameSite: "none", //prod = none, local = lax
      path: "/",
    });

    res.status(200).json({
      message: "User login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
        message: "User logout successfully",
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

export const me = (req, res) => {
  const token = req.cookies.token;
  

  if(!token){
    return res.status(401).json({
      message: "unauthorized token"
    })
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    

    res.status(200).json({
      message: "me routes",
      user: {
        id: decoded.id
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong while fetching user data. Please try again later.",
    });
  }
}