import jwt from 'jsonwebtoken';

const authToken = (req, res, next) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({message: "Unauthorized: No token provided"});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

export default authToken;