import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "❌ Unauthorized: No token provided" });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user data to the request object
    req.user = decoded;
    next();
  } catch (error) {
    // If token verification fails (invalid or expired token)
    return res.status(401).json({ message: "❌ Unauthorized: Invalid token" });
  }
};

export { verifyToken };
