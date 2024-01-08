const { verify } = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.get("authorization");
        secret = process.env.SECRET_KEY;
        if(token){
            token = token.slice(7);
            
         verify(token, secret, (err, decode) => {

            if(err){
                return res.json({
                    status: 'invalid_token',
                    message: 'Invalid token',
                });
            }else{
                next();
            }
         });

        }else{
            return res.json({
                status: 'access_denied',
                message: "Access denied, unauthorized user",
            });
        }
    }
}