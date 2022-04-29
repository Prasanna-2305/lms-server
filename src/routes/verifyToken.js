import jwt from 'jsonwebtoken'

function auth (req, res, next){
    const token = req.headers.authorization;
    console.log(token)
    if(!token) return res.status(401).send('Assess Denied !');
    try {
        const tokenKey = process.env.JWT_TOKEN_SECRET

        const verified = jwt.verify(token,tokenKey );
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}

export default auth;