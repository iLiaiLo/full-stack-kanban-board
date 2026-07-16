import Users from "../../models/authSchema/authSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserColumns from "../../models/userColumnsSchema/userColumnsSchema.js";
import UserTasks from "../../models/userTasksSchema/userTasksSchema.js";
import AppError from "../../errorHandlers/AppError.js";
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = res.locals.signupInput;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      const error = new AppError(
        `username with Email:${email} already exists`,
        409,
      );
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    await UserColumns.create({ userId: newUser._id, userColumns: [] });

    await UserTasks.create({ userId: newUser._id, userTasks: [] });

    const { JWT_SECRET_KEY, NODE_ENV } = process.env;

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "user signed up successfully" });
  } catch (error) {
    next(error);
  }
};

export default signup;
