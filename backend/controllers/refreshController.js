import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../models/UserModel.js'

dotenv.config()

const refreshController = async (req, res) => {
    try {
        const cookies = req.cookies
        
        if(!cookies?.jwt) return res.sendStatus(401)
       
        const refreshToken = cookies.jwt
        
        const user = await UserModel.findOne({refreshToken})

        if(!user) return res.sendStatus(403)
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                return res.sendStatus(403)
            }

            const accessToken = jwt.sign({"username": decoded.username, "userId": decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
            res.json({accessToken})
        })

        
    }
    catch(err) {
        res.status(401).json(err.message)
    }
}

export default refreshController