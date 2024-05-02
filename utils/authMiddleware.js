const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
    console.log('Token:', token);

    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token payload:', decoded);
        req.user = decoded;
        // console.log(req.user);
        next();
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        if (e.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token, authorization denied' });
        }
        // Handle other JWT verification errors
        console.error('JWT verification error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = auth;
