const jwt = require("jsonwebtoken");
var jwtSecret = "mysecrettoken";

module.exports = function(req,res,next){
    // Get Token from header

    const token = req.header("x-auth-token");

    // Check if there is no token in the header

    if(!token)
    {
        return res.status(401).json({ errors: [{msg: "No token, authorization denied"}]});
    }

    //Verify the token

    try
    {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    }
    catch(err)
    {
        return res.status(401).json({ msg: "Token is not valid" });
    }
}