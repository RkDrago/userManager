import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req, res, next) => {

    //first check if the header contains the token
    const authorization = req.header('Authorization')
    if (!authorization) return res.status(401).json({ error: "Unauthorized! Token not Found." })


    //extract the token from the header

    const token = req.header('Authorization').split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {  
        console.log(error)   
        return res.status(401).json({ error: "Invalid Token!" })
    }
}

//function to generate token
const generateToken = (userData) => {
    //gererate a new token using the user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export { jwtAuthMiddleware, generateToken }