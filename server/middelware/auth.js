import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    const token = req.cookies.token;    
    if (!token) return res.json(null);
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(403).json({ msg: "No permission" });
    }
    next();
}