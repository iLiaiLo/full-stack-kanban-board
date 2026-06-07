import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ message: "no token for authentication" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Token has expired, please log in again" });
        }
        return res.status(403).json({ message: "Token is invalid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
