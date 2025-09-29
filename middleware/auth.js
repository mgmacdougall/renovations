import jwt from 'json-web-token';


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
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token.split(' ')[1], secretKey);
        req.user = verified;
        next();

    } catch (e) {
        res.status(400).json({ message: "Invalid token" })
    }
}