import jwt from 'json-web-token';
import { decode } from 'punycode';


const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No access' })
    }

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).jsn({ message: "Invalid or expired token" })
        }
        req.use = decoded;
        next();
    })

}
export const verifyToken = (req, res, next) => {
    const token = req.cookies?.authToken;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // Attach decoded payload to request
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

