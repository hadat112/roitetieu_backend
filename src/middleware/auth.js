import jwt from 'jsonwebtoken';

const verifyToken =  (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, 'secret');
        req.username = decoded.user_name;
        next();
    }
    catch(err) {
        console.log(err);
        res.sendStatus(401);
    }
}

export default verifyToken;