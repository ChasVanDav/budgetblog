const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

   
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = user.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


module.exports = authenticateJWT;

