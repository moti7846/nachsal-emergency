import jwt from "jsonwebtoken";

/**
 * Middleware to decode the JWT from cookies and attach the user payload to req.user.
 * This middleware does NOT block requests. It only provides user context if a valid token exists.
 * It should be followed by `requireAuth` for routes that must be protected.
 */
export const decodeUserFromToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      // Verify the token and attach the decoded payload to the request object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // If the token is invalid, we'll just clear it and proceed without a user.
      // The downstream `requireAuth` middleware will catch this if the route is protected.
      res.clearCookie("token");
    }
  }
  next();
};
