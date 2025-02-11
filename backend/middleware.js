const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = ((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader && !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Invalid Token'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next()
        }
    }
    catch (error) {
        return res.status(403).json({
            message: 'Invalid Token'
        });
    }

})

module.exports = authMiddleware