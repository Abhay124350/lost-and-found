import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // remove "Bearer "
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded; // attach user data to request

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;