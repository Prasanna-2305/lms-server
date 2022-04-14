import jwt from 'jsonwebtoken'

function auth (req, res, next){
    const token = req.header('auth-token');
    console.log(token)
    if(!token) return res.status(401).send('Assess Denied !');
    try {
        const verified = jwt.verify(token, "token");
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}

export default auth;