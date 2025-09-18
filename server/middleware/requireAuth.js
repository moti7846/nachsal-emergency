/**
 * Middleware to ensure a user is authenticated.
 * Assumes a previous middleware (like decodeUserFromToken) has already tried to populate req.user.
 */
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      ok: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required. Please log in.',
      },
    });
  }
  next();
};
