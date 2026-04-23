import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // remove "Bearer "
    const token = authHeader.split(" ")[1];

    // 🔥 FIX: store decoded value
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;  // now this works

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;