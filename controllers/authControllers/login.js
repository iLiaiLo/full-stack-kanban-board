import Users from "../../models/authSchema/authSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../errorHandlers/AppError.js";
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      const error = new AppError("username and password are required", 400);
      return next(error);
    }

    const existingUser = await Users.findOne({ username });
    if (!existingUser) {
      const error = new AppError(
        `user with username ${username} not found`,
        404,
      );
      return next(error);
    }

    const passwordsAreSame = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordsAreSame) {
      const error = new AppError("passwords are not mathched", 400);
      return next(error);
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d", algorithm: "HS256" },
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "user logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export default login;
