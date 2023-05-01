const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
    const token = req.headers.authorization

    if (token){
        try {
            const decoded = jwt.verify(token.split(" ")[1], "masai")
            if (decoded){
                req.body.authorID = decoded.authorID
                req.body.author = decoded.author
                next()
            } else {
                res.send({"err": "Please Login"})
            }
        } catch (error) {
            res.send({"error": error.message})
        }
        
    } else{
        res.send({"msg":"Please Login"})
    }
}

module.exports={
    auth
}