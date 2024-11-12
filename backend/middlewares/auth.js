import jwt from 'jsonwebtoken';

// Middleware function to authenticate JWT token
const authenticateJWT = (req, res, next) => {
    
    // Extract token from the Authorization header (Bearer token)
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // If the token is present, verify it using the JWT_SECRET
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // If the token is invalid or expired, return a 403 Forbidden status
                return res.sendStatus(403);
            }
            // If the token is valid, attach the user ID to the request object
            req.userId = user.userId;
            // Call the next middleware or route handler
            next();
        });
    } else {
        // If no token is provided, return a 401 Unauthorized status
        res.sendStatus(401);
    }
};

// Export the middleware function for use in other files
export default authenticateJWT;


