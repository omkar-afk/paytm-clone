const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const auth =  req.headers['authorization'];
    const token = auth.split(' ')[1];
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch(e){
        console.log(e);
        res.status(403).json({
            mssg:"Auth verification failed"
        })
    } 
}
 
module.exports = authMiddleware;
