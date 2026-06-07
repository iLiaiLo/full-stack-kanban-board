const logout = (_, res, next) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .status(200)
      .json({ message: "user logged out" });
  } catch (error) {
    next(error);
  }
};

export default logout;
