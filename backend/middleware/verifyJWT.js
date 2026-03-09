import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        if(!authHeader) return res.sendStatus(401)
        
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                return res.sendStatus(403)
            }

            req.user = decoded.userId
            next()
        })
    }
    catch(err) {
        res.status(401).json(err.message)
    }
}

export default verifyJWT